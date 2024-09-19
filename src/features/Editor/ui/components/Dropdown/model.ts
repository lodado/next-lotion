import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropdownPosition } from "./type";
import { useEditorSelector } from "@/features/Editor/hooks";
 

interface DropdownState {
  position: DropdownPosition;
  isOpen: boolean;
}

const initialState: DropdownState = {
  position: { x: 0, y: 0 },
  isOpen: false,
};

const dropdownSlice = createSlice({
  name: "dropdown-slice",
  initialState,
  reducers: {
    openTrigger: (state, action: PayloadAction<DropdownPosition>) => {
      state.position = action.payload;
      state.isOpen = true;
    },
    closeTrigger: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openTrigger, closeTrigger } = dropdownSlice.actions;
export default dropdownSlice;

export const useDropdownSelector = () => useEditorSelector((state) => state.dropdown);
