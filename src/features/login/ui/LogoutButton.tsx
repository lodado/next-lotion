"use client";

import React from "react";
import { AUTH_LOGOUT_ACTION, AuthClientRepository } from "@/entities";
import { LogoutUseCase } from "@/entities/Auth/core";

import { useDispatch, useErrorBoundary } from "@/shared/hooks";
import { useTranslations } from "next-intl";
import { revalidatePath } from "next/cache";

const LogoutButton: React.FC = () => {
  const { setError } = useErrorBoundary();
  const dispatch = useDispatch();
  const t = useTranslations("LogoutButton"); // Initialize the translation function

  const handleClickLogout = async () => {
    const authClientRepository = new AuthClientRepository();

    try {
      await new LogoutUseCase(authClientRepository).execute();
      dispatch(AUTH_LOGOUT_ACTION());
      location.reload();
    } catch (e) {
      setError(e);
    }
  };

  return (
    <button onClick={handleClickLogout} type="button">
      {t("logout")}
    </button>
  );
};

export default LogoutButton;
