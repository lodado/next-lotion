"use client";

import React from "react";
import { LOGIN_DIALOG_CLOSE_ACTION, LOGIN_DIALOG_OPEN_ACTION, useLoginDialogSelector } from "../../models";
import { useDispatch } from "@/shared";
import { AlertDialog } from "@/shared/ui/Dialog";
import LoginForm from "./LoginForm";

const LoginDialogContainer = () => {
  const { isOpened } = useLoginDialogSelector();
  const dispatch = useDispatch();

  return (
    <AlertDialog
      isVisible={isOpened}
      onChangeVisible={(newVisibleStatus: boolean) => {
        const action = newVisibleStatus ? LOGIN_DIALOG_OPEN_ACTION : LOGIN_DIALOG_CLOSE_ACTION;
        dispatch(action());
      }}
    >
      <div className="flex relative h-[200px] bg-[#00C7E6] justify-center items-center">
        <AlertDialog.Close className="absolute right-[10px] top-[10px]" />
      </div>

      <AlertDialog.Header>Login</AlertDialog.Header>
      <AlertDialog.Body className="w-[900px]">
        <LoginForm />
      </AlertDialog.Body>
    </AlertDialog>
  );
};

export default LoginDialogContainer;
