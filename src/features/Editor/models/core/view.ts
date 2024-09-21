import { defaultMarkdownSerializer, MarkdownSerializer } from "prosemirror-markdown";
import { Node as ProsemirrorNode } from "prosemirror-model";
import { EditorState, Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { NodeController } from "./nodes";

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
  defaultMarkdownSerializer.marks
);

export const createMarkdownView = ({ view }: { view: EditorView }): string => {
  const doc = view.state.doc;

  // ProseMirror 문서를 마크다운으로 변환
  const markdown = myMarkdownSerializer.serialize(doc);

  return markdown;
};
