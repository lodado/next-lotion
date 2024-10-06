import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarkTooltipPosition } from "./type";
import { MARGIN_LEFT_EDITOR } from "@/features/Editor/constants";

interface markTooltipState {
  position: MarkTooltipPosition;
  isOpen: boolean;
}

const initialState: markTooltipState = {
  position: { x: MARGIN_LEFT_EDITOR, y: 0 },
  isOpen: false,
};

const markTooltipSlice = createSlice({
  name: "markTooltip-slice",
  initialState,
  reducers: {
    RESET_EDITOR_MARK_TOOLTIP: (state) => {
      state.isOpen = false;
    },

    OPEN_EDITOR_MARK_TOOLTIP: (state, action: PayloadAction<MarkTooltipPosition>) => {
      state.position = action.payload;
      state.isOpen = true;
    },
    CLOSE_EDITOR_MARK_TOOLTIP: (state) => {
      state.isOpen = false;
    },
  },
});

export const { RESET_EDITOR_MARK_TOOLTIP, OPEN_EDITOR_MARK_TOOLTIP, CLOSE_EDITOR_MARK_TOOLTIP } =
  markTooltipSlice.actions;

export default markTooltipSlice;
