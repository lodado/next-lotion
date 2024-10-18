"use client";

import { useSwitchTheme } from "@/shared";
import React from "react";

import { ChevronDown } from "lucide-react";

import { Button, Select } from "@/shared/ui";
import Link from "next/link";
import { AuthButton } from "@/features";

const ProfileSelector = () => {
  const { isMounted, theme, updateTheme, toggleTheme } = useSwitchTheme();

  return (
    <Select value={theme} defaultValue={theme} onValueChange={updateTheme}>
      <Select.Trigger variant={"text"} className="flex min-w-[5rem] justify-center items-center p-0 m-0">
        <Select.Value asChild placeholder="system">
          <div className="flex min-w-[5rem] justify-center items-center p-0 m-0">프로필</div>
        </Select.Value>
      </Select.Trigger>
      <Select.Content className="min-w-[10rem]">
        <Select.Group>
          <Select.Label>유저 정보</Select.Label>
          <Link href="/blog">
            <Select.Item value="system">내 블로그로 가기</Select.Item>
          </Link>

          <AuthButton />
        </Select.Group>
      </Select.Content>
    </Select>
  );
};

export default ProfileSelector;
