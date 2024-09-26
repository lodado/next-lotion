import { defaultMarkdownSerializer, MarkdownParser, MarkdownSerializer } from "prosemirror-markdown";
import { Node as ProsemirrorNode, Schema } from "prosemirror-model";
import { EditorState, Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { NodeController } from "./nodes";
import { MarkController } from "./marks";
import markdownit from "markdown-it";

interface CreateViewParams {
  editor: HTMLElement;
  state: EditorState;
}

export const createView = ({ editor, state }: CreateViewParams): EditorView => {
  const view = new EditorView(editor, {
    state,

    dispatchTransaction(transaction: Transaction): void {
      const newState = view.state.apply(transaction);
      view.updateState(newState);
    },
  });

  return view;
};

// NodeController에서 수집한 markdownSerializer 사용
const myMarkdownSerializer = new MarkdownSerializer(
  NodeController.getMarkdownSerializer(),
  MarkController.getMarkdownSerializer()
);

export const createMarkdownView = ({ view }: { view: EditorView }): string => {
  const doc = view.state.doc;

  // ProseMirror 문서를 마크다운으로 변환
  const markdown = myMarkdownSerializer.serialize(doc);

  return markdown;
};

export const parseMarkdown = (schema: Schema) =>
  new MarkdownParser(schema, markdownit(), {
    text: { node: "text" },
    ...NodeController.getMarkdownParser(),
    ...MarkController.getMarkdownParser(),
  });
