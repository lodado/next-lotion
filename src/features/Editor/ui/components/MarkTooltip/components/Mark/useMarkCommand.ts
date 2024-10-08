import { useEditorContext } from "@/features";
import { MarkController } from "@/features/Editor/models/editor/marks";
import { checkMarkInSelection, isSelectionWithinSingleNode } from "@/features/Editor/utils";
import useForceRender from "@/shared/hooks/useForceRender";
import { toggleMark } from "prosemirror-commands";

const marks = MarkController.marks;

const useMarkCommand = () => {
  const { view } = useEditorContext();
  const forceRender = useForceRender();

  const isSelectionWithinNode = () => {
    return isSelectionWithinSingleNode(view?.state.selection);
  };

  const hasMarkInSelection = (markType: keyof typeof marks) => {
    const { state } = view;

    return checkMarkInSelection(state, marks[markType].type);
  };

  const toggleMarkCommand = (markType: keyof typeof marks) => () => {
    const { state, dispatch } = view;
    const command = toggleMark(marks[markType].type);

    if (command(state, dispatch)) {
      view.focus();
      forceRender()
    }
  };

  return { isSelectionWithinNode, hasMarkInSelection, toggleMarkCommand };
};

export default useMarkCommand;
