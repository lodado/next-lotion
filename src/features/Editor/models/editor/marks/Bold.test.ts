import { WidgetController } from "@/features/Editor/ui/components";
import { EditorState, TextSelection } from "prosemirror-state";
import { toggleMark } from "prosemirror-commands";
import { Schema, DOMParser } from "prosemirror-model";
import { describe, it, expect, beforeEach } from "vitest";
import Bold from "./Bold";
import { createState } from "../state";
import { createEditorReduxLocalStore } from "../../store";

import { EditorView } from "prosemirror-view";
import { setMark } from "@/shared/libs/vitest/setMark";

// Define schema as before
const bold = new Bold();
const schema = new Schema({
  nodes: {
    doc: {
      content: "block+",
    },
    text: {
      group: "inline",
    },
    paragraph: {
      content: "inline*",
      group: "block",
      parseDOM: [{ tag: "p" }],
      toDOM() {
        return ["p", 0];
      },
    },
  },
  marks: {
    bold: bold.createSchema,
  },
});

let dom: HTMLElement;
let store: any;
let widgetController: any;
let state: EditorState;
let view: EditorView;

beforeEach(() => {
  // Create DOM element for testing
  dom = document.createElement("p");
  dom.textContent = "Hello";

  // Create redux store and widget controller
  store = createEditorReduxLocalStore();
  widgetController = new WidgetController(store);

  // Initialize the editor state
  state = createState({
    widgetController,
    getDoc: (schema) => DOMParser.fromSchema(schema).parse(dom),
  });

  // Initialize EditorView for input rules test
  view = new EditorView(dom, {
    state,
    dispatchTransaction(tr) {
      const newState = view.state.apply(tr);
      view.updateState(newState);
    },
  });
});

describe("Bold Mark", () => {
  // Test applying bold mark using commands
  describe("as is - when applying bold mark using commands", () => {
    it("should apply bold mark when the command is executed", () => {
      // Create a transaction with a text selection
      const finalState = setMark(state, schema.marks.bold);

      // Assert that the bold mark has been applied to the selected range
      expect(finalState.doc.rangeHasMark(1, 4, schema.marks.bold)).toBe(true);
    });
  });

  // Test the schema creation (parseDOM and toDOM)
  describe("as is - schema creation", () => {
    it("should create the correct schema for bold mark", () => {
      const schema = bold.createSchema;
      expect(schema.parseDOM).toEqual([{ tag: "strong" }, { tag: "b", getAttrs: expect.any(Function) }]);

      const domOutput = schema.toDOM();
      expect(domOutput).toEqual(["strong", 0]);
    });
  });

  // Test inputRules for bold mark using simulated typing
  describe("as is - inputRules for bold mark using simulated typing", () => {
    it("should apply bold mark when **text** pattern is typed", () => {
      const textToType = "**bold**";

      /** inputRules를 테스트하기 위한 로직 */
      view.someProp("handleTextInput", (f) => f(view, 1, 1, textToType));

      expect(view.state.doc.toString()).contains(bold.name);
    });
  });

  // Test toMarkdown method
  describe("as is - toMarkdown for bold mark", () => {
    it("should return correct markdown representation", () => {
      const markdown = bold.toMarkdown();
      expect(markdown).toEqual({
        open: "**",
        close: "**",
        mixable: true,
        expelEnclosingWhitespace: true,
      });
    });

    /*

    it("should return correct serialized markdown result", () => {
      const finalState = setMark(state, schema.marks.bold);

      const markdownResult = myMarkdownSerializer.serialize(finalState.doc);

      expect(markdownResult).toBe("**Hel**lo");
    });

    it("should return correct deserialized markdown result", () => {
      const finalState = setMark(state, schema.marks.bold);

      const markdownResult = myMarkdownSerializer.serialize(finalState.doc);

      const doc = parseMarkdown({ string: markdownResult, schema });

      expect(doc.toString()).contain("bold");
    });

    */
  });
});
