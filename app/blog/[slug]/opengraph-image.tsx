import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatPostDate } from "@/lib/format-date";

export const alt = "Blog post by Rajin Sakha";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Rajin Sakha";
  const date = post ? formatPostDate(post.date) : "";
  const readingTime = post ? `${post.readingTime} min read` : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>
          rajinsakha.com.np / blog
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
          <span style={{ color: "#e2503f" }}>Rajin Sakha</span>
          <span style={{ color: "#52525b" }}>·</span>
          <span style={{ color: "#a1a1aa" }}>{date}</span>
          <span style={{ color: "#52525b" }}>·</span>
          <span style={{ color: "#a1a1aa" }}>{readingTime}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
