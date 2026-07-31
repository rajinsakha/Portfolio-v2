import type { Element, ElementContent } from "hast";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { rehypeA11y } from "@/lib/rehype-a11y";

/** Flattens a heading's children to plain text for the anchor's accessible name. */
function headingText(node: Element): string {
  return node.children
    .map((child: ElementContent) => {
      if (child.type === "text") return child.value;
      if (child.type === "element") return headingText(child);
      return "";
    })
    .join("")
    .trim();
}

/**
 * Renders post markdown to an HTML string at build time.
 *
 * `rehype-pretty-code` is asynchronous — shiki loads grammars and themes on
 * demand — which is why the pipeline is awaited here rather than run through a
 * synchronous renderer.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties(node: Element) {
        return {
          className: ["heading-anchor"],
          "aria-label": `Link to section: ${headingText(node)}`,
        };
      },
      content: { type: "text", value: "#" },
    })
    .use(rehypePrettyCode, {
      theme: { light: "github-light", dark: "github-dark" },
      keepBackground: false,
    })
    .use(rehypeA11y)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
