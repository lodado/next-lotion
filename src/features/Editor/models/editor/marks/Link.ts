import { toggleMark } from "prosemirror-commands";
import { InputRule } from "prosemirror-inputrules";
import { DOMOutputSpec } from "prosemirror-model";

import BaseMark from "./BaseMark";
import { sanitizeUrl } from "../utils";

export default class Italic extends BaseMark {
  get name(): string {
    return "link";
  }

  get createSchema() {
    return {
      parseDOM: [
        {
          tag: "a[href]",
          getAttrs: (dom: HTMLElement) => ({
            href: dom.getAttribute("href"),
            title: dom.getAttribute("title"),
          }),
        },
      ],
      toDOM: (node) => [
        "a",
        {
          title: node.attrs.title,
          href: sanitizeUrl(node.attrs.href),
          class: "use-hover-preview",
          rel: "noopener noreferrer nofollow",
        },
        0,
      ],
    };
  }

  /** Bold와 혼용되지 않게 조심 */
  inputRules(): InputRule[] {
    return [
      new InputRule(/(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/, (state, match, start, end) => {
        return this.updateMark(state, match, start, end);
      }),
    ];
  }

  keys() {
    return {
      "Mod-i": toggleMark(this.type),
      "Mod-I": toggleMark(this.type),
    };
  }

  commands() {
    return (attrs: {}) => toggleMark(this.type, attrs);
  }

  toMarkdown() {
    return {
      open: "*",
      close: "*",
      mixable: true,
      expelEnclosingWhitespace: true,
    };
  }
}
