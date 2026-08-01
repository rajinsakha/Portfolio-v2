import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MarkdownContent from "@/components/blog/markdown-content";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatPostDate } from "@/lib/format-date";
import { SITE_URL } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

// Only slugs that exist as files are served; anything else 404s at the route level.
export const dynamicParams = false;

// Pre-render every post at build time for faster crawling and indexing.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.tags, "Rajin Sakha"],
    authors: [{ name: "Rajin Sakha", url: SITE_URL }],
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: ["Rajin Sakha"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#post`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    keywords: post.tags,
    inLanguage: "en",
    url: postUrl,
    image: `${postUrl}/opengraph-image`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <div className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" /> Back to Blog
            </Link>
          </Button>
        </div>

        <article className="max-w-3xl">
          <header className="mb-10">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </div>

            {post.updated !== post.date && (
              <div className="mt-1 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <time dateTime={post.updated}>Updated {formatPostDate(post.updated)}</time>
              </div>
            )}

            <h1 className="mt-4 font-display text-4xl md:text-5xl font-normal tracking-tight text-balance">
              {post.title}
            </h1>

            <p className="mt-4 text-xl text-muted-foreground text-pretty">
              {post.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Post topics">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </header>

          <MarkdownContent content={post.content} />
        </article>

        <div className="mt-16">
          <Button asChild>
            <Link href="/blog">Read more posts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
