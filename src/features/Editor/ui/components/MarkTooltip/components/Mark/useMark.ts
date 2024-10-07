import { useEditorContext } from "@/features";
import { MarkController } from "@/features/Editor/models/editor/marks";
import { toggleMark } from "prosemirror-commands";
import React from "react";

const marks = MarkController.marks;

const useMarkCommand = () => {
  const { view } = useEditorContext();

  const toggleMarkCommand = (markType: keyof typeof marks) => () => {
    const { state, dispatch } = view;
    const command = toggleMark(marks[markType].type);

    if (command(state, dispatch)) {
      view.focus();
    }
  };

  return { toggleMarkCommand };
};

export default useMarkCommand;
