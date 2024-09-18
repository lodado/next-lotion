"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import LoginButton from "./LoginButton";
import { ICON_GITHUB, ICON_GOOGLE, ICON_KAKAO, useI18n } from "@/shared";
import { authenticateAction } from "../../api";

const LoginForm = () => {
  const t = useI18n("LOGIN");
  const [errorMessage, dispatch] = useFormState(authenticateAction, undefined);

  return (
    <div className="flex flex-col items-start gap-6 relative self-stretch w-full h-[220px] flex-[0_0_auto]">
      <form action={dispatch} className="flex flex-col w-full gap-2 space-y-3">
        <LoginButton value="kakao">
          <ICON_KAKAO /> {t("KAKAO")}
        </LoginButton>

        <LoginButton value="google">
          <ICON_GOOGLE /> {t("GOOGLE")}
        </LoginButton>

        <LoginButton value="github">
          <ICON_GITHUB /> {t("GITHUB")}
        </LoginButton>
      </form>
    </div>
  );
};

export default LoginForm;
