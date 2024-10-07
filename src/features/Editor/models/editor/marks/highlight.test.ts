import { WidgetController } from "@/features/Editor/ui/components";
import { EditorState } from "prosemirror-state";

import { Schema, DOMParser } from "prosemirror-model";
import { describe, it, expect, beforeEach } from "vitest";
import { createState } from "../state";
import { createEditorReduxLocalStore } from "../../store";

import { EditorView } from "prosemirror-view";
import Highlight from "./Highlight";

import { setMark } from "@/shared/libs/vitest/setMark";

const highLight = new Highlight();

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
    [highLight.name]: highLight.createSchema,
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

describe("highlight Mark", () => {
  // Test applying highlight mark using commands
  describe("as is - when applying highlight mark using commands", () => {
    it("should apply highlight mark when the command is executed", () => {
      const finalState = setMark(state, schema.marks.highlight);

      // Assert that the highlight mark has been applied to the selected range
      expect(finalState.doc.rangeHasMark(1, 4, schema.marks.highlight)).toBe(true);
    });
  });

  // Test inputRules for highlight mark using simulated typing
  describe("as is - inputRules for highlight mark using simulated typing", () => {
    it("should apply highlight mark when **text** pattern is typed", () => {
      const textToType = "==c==";

      /** inputRules를 테스트하기 위한 로직 */
      view.someProp("handleTextInput", (f) => f(view, 1, 2, textToType));

      expect(view.state.doc.toString()).contains(highLight.name);
    });
  });

  // Test toMarkdown method
  describe("as is - toMarkdown for highlight mark", () => {
    it("should return correct markdown representation", () => {
      const markdown = highLight.toMarkdown();

      expect(markdown).toEqual({
        open: "==",
        close: "==",
        mixable: true,
      });
    });

    /*
    it("should return correct serialized markdown result", () => {
      const finalState = setMark(state, schema.marks.highlight);

      const markdownResult = myMarkdownSerializer.serialize(finalState.doc);

      expect(markdownResult).toBe("==Hel==lo");
    });
    */
  });
});
