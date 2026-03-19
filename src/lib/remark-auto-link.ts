import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Text, Link, Parent, RootContent } from "mdast";

import { agents } from "./agents";
import { workflows } from "./workflows";

// Build entity map: display-name -> url
const entities: Record<string, string> = {};
agents.forEach((a) => {
  entities[a.name.toUpperCase()] = `/agents/${a.slug}`;
});
workflows.forEach((w) => {
  entities[w.name] = `/workflows/${w.slug}`;
});

const SKIP_PARENTS = new Set(["heading", "link", "code", "inlineCode"]);

const remarkAutoLink: Plugin = () => {
  return (tree) => {
    const linked = new Set<string>(); // first-occurrence only

    visit(tree, "text", (node: Text, index: number | undefined, parent: Parent | undefined) => {
      if (index === undefined || !parent) return;
      if (SKIP_PARENTS.has(parent.type)) return;

      for (const [name, url] of Object.entries(entities)) {
        if (linked.has(name)) continue;

        const regex = new RegExp(`\\b(${name})\\b`, "i");
        const match = node.value.match(regex);
        if (!match || match.index === undefined) continue;

        const before = node.value.slice(0, match.index);
        const matched = match[0];
        const after = node.value.slice(match.index + matched.length);

        const newNodes: (Text | Link)[] = [];
        if (before) newNodes.push({ type: "text", value: before });
        newNodes.push({
          type: "link",
          url,
          children: [{ type: "text", value: matched }],
        } as Link);
        if (after) newNodes.push({ type: "text", value: after });

        (parent.children as (Text | Link)[]).splice(index, 1, ...newNodes);
        linked.add(name);
        return; // re-visit from updated tree position
      }
    });
  };
};

export { remarkAutoLink };
