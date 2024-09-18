"use client";

import React from "react";
import { LOGIN_DIALOG_CLOSE_ACTION, LOGIN_DIALOG_OPEN_ACTION, useLoginDialogSelector } from "../../models";
import { useDispatch, useSwitchTheme } from "@/shared";
import { AlertDialog } from "@/shared/ui/Dialog";
import LoginForm from "./LoginForm";

const LoginDialogContainer = () => {
  const { isOpened } = useLoginDialogSelector();
  const dispatch = useDispatch();
  const { toggleTheme } = useSwitchTheme();

  return (
    <AlertDialog
      isVisible={isOpened}
      onChangeVisible={(newVisibleStatus: boolean) => {
        const action = newVisibleStatus ? LOGIN_DIALOG_OPEN_ACTION : LOGIN_DIALOG_CLOSE_ACTION;
        dispatch(action());
      }}
    >
      <AlertDialog.Header>Test</AlertDialog.Header>
      <AlertDialog.Body className="w-[900px]">
        <button className="bg-surface-up" type="button" onClick={() => toggleTheme()}>
          test
        </button>
        <LoginForm />
      </AlertDialog.Body>
    </AlertDialog>
  );
};

export default LoginDialogContainer;
