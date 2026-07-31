import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatPostDate } from "@/lib/format-date";
import type { BlogPostMeta } from "@/types";

export default function BlogPostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="h-full flex flex-col transition-[box-shadow,transform] duration-300 group-hover:shadow-md group-hover:-translate-y-1">
        <CardContent className="flex flex-col flex-grow px-5 py-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>

          <h3 className="mt-3 text-xl font-bold text-balance group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="mt-2 mb-4 text-sm text-muted-foreground line-clamp-3 flex-grow">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
