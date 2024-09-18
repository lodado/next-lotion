"use client";

import { createReducer } from "@reduxjs/toolkit";

import { useSelector } from "@/shared";
import { LOGIN_DIALOG_CLOSE_ACTION, LOGIN_DIALOG_OPEN_ACTION } from "./action";

// Define a type for the slice state
interface LoginDialogState {
  isOpened: boolean;
}

// Define the initial state using that type
const initialState: LoginDialogState = {
  isOpened: false,
};

export const loginDialogReducer = createReducer(initialState, (builder) => {
  builder.addCase(LOGIN_DIALOG_OPEN_ACTION, (state) => {
    state.isOpened = true;
  });

  builder.addCase(LOGIN_DIALOG_CLOSE_ACTION, (state) => {
    state.isOpened = false;
  });
});

// Other code such as selectors can use the imported `RootState` type
export const useLoginDialogSelector = () => {
  const selector = useSelector((state) => state.loginDialog);

  return selector;
};
