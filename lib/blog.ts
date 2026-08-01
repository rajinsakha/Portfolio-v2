import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMeta } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function fail(file: string, message: string): never {
  throw new Error(`Invalid blog post "${file}": ${message}`);
}

function readString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    fail(file, `frontmatter field "${field}" must be a non-empty string`);
  }
  return value.trim();
}

function readTags(value: unknown, file: string): string[] {
  if (!Array.isArray(value) || value.length === 0) {
    fail(file, `frontmatter field "tags" must be a non-empty array`);
  }
  return value.map((tag, index) => {
    if (typeof tag !== "string" || tag.trim() === "") {
      fail(file, `tag at index ${index} must be a non-empty string`);
    }
    return tag.trim();
  });
}

/**
 * Accepts either a quoted `YYYY-MM-DD` string or the Date that js-yaml produces
 * from an unquoted one, and normalises both to a `YYYY-MM-DD` string.
 */
function readDate(value: unknown, field: string, file: string): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  const raw = readString(value, field, file);
  if (!DATE_PATTERN.test(raw)) {
    fail(file, `frontmatter field "${field}" must be formatted YYYY-MM-DD`);
  }
  if (Number.isNaN(new Date(`${raw}T00:00:00Z`).getTime())) {
    fail(file, `frontmatter field "${field}" is not a real date`);
  }
  return raw;
}

/**
 * Whole minutes at 200 words per minute. Fenced code blocks are removed first —
 * a long code sample is scanned, not read, and would otherwise inflate the
 * estimate well past what the prose actually takes.
 */
export function getReadingTime(markdown: string): number {
  const prose = markdown.replace(/```[\s\S]*?```/g, " ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function parsePost(fileName: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const date = readDate(data.date, "date", fileName);

  return {
    slug: fileName.replace(/\.md$/, ""),
    title: readString(data.title, "title", fileName),
    description: readString(data.description, "description", fileName),
    date,
    updated: data.updated === undefined ? date : readDate(data.updated, "updated", fileName),
    tags: readTags(data.tags, fileName),
    featured: data.featured === true,
    readingTime: getReadingTime(content),
    content,
  };
}

function readAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(parsePost)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/** Metadata for every post, newest first. Bodies are omitted. */
export function getAllPosts(): BlogPostMeta[] {
  return readAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    updated: post.updated,
    tags: post.tags,
    featured: post.featured,
    readingTime: post.readingTime,
  }));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fileName = `${slug}.md`;
  if (!fs.existsSync(path.join(BLOG_DIR, fileName))) return null;
  return parsePost(fileName);
}
