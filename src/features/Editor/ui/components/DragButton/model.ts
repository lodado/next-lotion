import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node as ProseMirrorNode, ResolvedPos } from "prosemirror-model";
import { Position } from "./type";
import { useEditorSelector } from "@/features/Editor/models";

interface DragButtonState {
  position: Position;
  pos: ResolvedPos | null;
  dragFlag: boolean;
  isOpen: boolean;
}

const initialState: DragButtonState = {
  position: { x: 0, y: 0 },
  pos: null,
  dragFlag: false,
  isOpen: false,
};

const dragButtonSlice = createSlice({
  name: "dragButton-slice",
  initialState,
  reducers: {
    DRAG_BUTTON_SET_DRAG_FLAG(state, action: PayloadAction<boolean>) {
      state.dragFlag = action.payload;
    },
    openTrigger(state, action: PayloadAction<{ x: number; y: number; pos: ResolvedPos }>) {
      if (state.dragFlag) return;
      const { x, y, pos } = action.payload;
      state.position = { x: 24, y: y - 10 };

      // @ts-ignore
      state.pos = pos;
      state.isOpen = true;
    },
    closeTrigger(state) {
      if (state.dragFlag) return;
      state.isOpen = false;
    },
  },
});

export const { DRAG_BUTTON_SET_DRAG_FLAG, openTrigger, closeTrigger } = dragButtonSlice.actions;
export default dragButtonSlice;

export const useDragButtonSelector = () => useEditorSelector((state) => state.dragButton);
