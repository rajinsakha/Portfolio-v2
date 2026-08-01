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
 *
 * `remarkRehype` runs with its defaults, so raw inline HTML in the markdown
 * (e.g. `<kbd>Esc</kbd>`) is intentionally stripped rather than rendered —
 * this is what makes the `dangerouslySetInnerHTML` in the post page safe.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      // remark-gfm's footnote label heading (`#footnote-label`) is visually
      // hidden (`sr-only`), so an autolink appended to it would be a
      // keyboard-focusable stop with no visible focus indicator. Skip it.
      test: (node) => node.properties?.id !== "footnote-label",
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
