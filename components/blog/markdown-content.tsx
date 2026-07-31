import { renderMarkdown } from "@/lib/markdown";

/**
 * Renders post markdown. The HTML is produced at build time from content
 * authored in this repository, so there is no untrusted input here.
 */
export default async function MarkdownContent({ content }: { content: string }) {
  const html = await renderMarkdown(content);

  return (
    <div
      className="prose-post prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight
        prose-h2:mt-12 prose-h2:text-3xl prose-h3:text-2xl
        prose-a:text-primary prose-a:underline-offset-4
        prose-strong:text-foreground
        prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5
        prose-code:before:content-none prose-code:after:content-none
        prose-blockquote:border-l-primary
        prose-th:text-left prose-td:align-top"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
