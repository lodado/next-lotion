"use client";

import { AUTH_LOGOUT_ACTION, AuthClientRepository, useAuthSelector } from "@/entities";
import { LogoutUseCase } from "@/entities/Auth/core";
import { LOGIN_DIALOG_OPEN_ACTION } from "@/features";
import { useDispatch, useErrorBoundary } from "@/shared";
import React from "react";

const AuthButton = () => {
  const { isLogin } = useAuthSelector();
  const { setError } = useErrorBoundary();
  const dispatch = useDispatch();

  const handleClickLogin = async () => {
    const authClientRepository = new AuthClientRepository();

    try {
      if (isLogin) {
        await new LogoutUseCase(authClientRepository).execute();
        dispatch(AUTH_LOGOUT_ACTION());
      } else {
        dispatch(LOGIN_DIALOG_OPEN_ACTION());
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <button onClick={handleClickLogin} type="button">
      {isLogin ? "logout" : "login"}
    </button>
  );
};

export default AuthButton;
