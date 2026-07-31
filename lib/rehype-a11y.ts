import type { Element, Root } from "hast";
import { SKIP, visit } from "unist-util-visit";

const EXTERNAL_HREF = /^https?:\/\//i;
const OWN_DOMAIN = "rajinsakha.com.np";

function readLanguage(properties: Element["properties"]): string | null {
  const value = properties?.dataLanguage ?? properties?.["data-language"];
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

/**
 * Post-processing that keeps generated markup keyboard-accessible:
 *
 * - `pre` scrolls horizontally, so it becomes a focusable, named region.
 * - `table` is wrapped in its own focusable scroll container so a wide table
 *   never forces the page body to scroll sideways.
 * - External links get `rel="noopener noreferrer"`.
 */
export function rehypeA11y() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName === "pre") {
        const language = readLanguage(node.properties);
        node.properties = {
          ...node.properties,
          tabIndex: 0,
          role: "region",
          "aria-label": language ? `${language} code block` : "Code block",
        };
        return;
      }

      if (node.tagName === "a") {
        const href = node.properties?.href;
        if (typeof href === "string" && EXTERNAL_HREF.test(href) && !href.includes(OWN_DOMAIN)) {
          node.properties = {
            ...node.properties,
            target: "_blank",
            rel: ["noopener", "noreferrer"],
          };
        }
        return;
      }

      if (node.tagName === "table" && parent && typeof index === "number") {
        const wrapper: Element = {
          type: "element",
          tagName: "div",
          properties: {
            className: ["not-prose", "my-6", "overflow-x-auto", "rounded-lg", "border", "border-border"],
            tabIndex: 0,
            role: "region",
            "aria-label": "Table, scrollable horizontally",
          },
          children: [node],
        };
        parent.children[index] = wrapper;
        // Skip the subtree so the table we just wrapped is not wrapped again.
        return SKIP;
      }
    });
  };
}
