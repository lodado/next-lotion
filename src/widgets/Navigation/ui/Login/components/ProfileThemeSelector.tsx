"use client";

import { useSwitchTheme } from "@/shared";
import React from "react";
import { useTranslations } from "next-intl";

import { SunMoon } from "lucide-react";
import { ChevronRight } from "lucide-react";

import { Dropdown } from "@/shared/ui";

const ProfileThemeDropdownor = () => {
  const { isMounted, theme, updateTheme, toggleTheme } = useSwitchTheme();
  const t = useTranslations("PROFILETHEMESELECTOR");

  return (
    <Dropdown>
      <Dropdown.Trigger
        variant="custom"
        className="outline-0 flex flex-col px-0 py-2 gap-y-2 w-full border-0 text-inherit"
      >
        <Dropdown.Item className="flex items-center justify-between w-full px-2 py-2 gap-2">
          <span className="flex flex-row items-center gap-2 body-01">
            <SunMoon size={22} />
            {t("LABEL-THEME")}
          </span>

          <span className="flex flex-row items-center gap-1 font-extrabold">
            {t(`ITEM-${theme.toUpperCase()}`)} <ChevronRight strokeWidth={1.8} size={19} />
          </span>
        </Dropdown.Item>
      </Dropdown.Trigger>
      <Dropdown.Content side="left" align="end" className="mt-[9.6rem] min-w-[10rem]">
        <>
          <Dropdown.Label>{t("LABEL-THEME")}</Dropdown.Label>
          <Dropdown.Item
            onClick={() => {
              updateTheme("system");
            }}
          >
            {t("ITEM-SYSTEM")}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              updateTheme("dark");
            }}
          >
            {t("ITEM-DARK")}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              updateTheme("light");
            }}
          >
            {t("ITEM-LIGHT")}
          </Dropdown.Item>
        </>
      </Dropdown.Content>
    </Dropdown>
  );
};

export default ProfileThemeDropdownor;
