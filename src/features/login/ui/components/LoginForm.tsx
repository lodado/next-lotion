"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import LoginButton from "./LoginButton";
import { ICON_GITHUB, ICON_GOOGLE, ICON_KAKAO, useI18n } from "@/shared";
import { authenticateAction } from "../../api";
import { useTranslations } from "next-intl";

const LoginForm = () => {
  const t = useTranslations("LoginForm");
  const [errorMessage, dispatch] = useFormState(authenticateAction, undefined);

  return (
    <div className="flex flex-col items-start gap-3 relative self-stretch w-full h-[220px] flex-[0_0_auto]">
      <form action={dispatch} className="flex flex-col w-full gap-1 space-y-3">
        <LoginButton value="kakao">
          <ICON_KAKAO /> {t("KakaoButton")}
        </LoginButton>

        <LoginButton value="google">
          <ICON_GOOGLE /> {t("GoogleButton")}
        </LoginButton>

        <LoginButton value="github">
          <ICON_GITHUB /> {t("GithubButton")}
        </LoginButton>
      </form>
    </div>
  );
};
export default LoginForm;
