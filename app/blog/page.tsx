import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import BlogPostCard from "@/components/ui/blog-post-card";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering write-ups by Rajin Sakha on production migrations, web performance, and building React and Next.js applications.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Rajin Sakha",
    description:
      "Engineering write-ups on production migrations, web performance, and building React and Next.js applications.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Rajin Sakha's Blog",
    url: `${SITE_URL}/blog`,
    description:
      "Engineering write-ups on production migrations, web performance, and building React and Next.js applications.",
    inLanguage: "en",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated,
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  };

  return (
    <div className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="container">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" /> Back to Home
            </Link>
          </Button>
        </div>

        <div className="mb-12 max-w-3xl">
          <h1 className="font-display text-5xl md:text-6xl font-normal mb-6">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Write-ups from real production work — what broke, what the numbers
            actually were, and what I would tell myself before starting.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts published yet. Check back soon.</p>
        ) : (
          <>
            <h2 className="sr-only">All posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
