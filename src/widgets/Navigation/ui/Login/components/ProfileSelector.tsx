"use client";

import React from "react";
import Link from "next/link";
import { Dropdown } from "@/shared/ui";
import { LogoutButton } from "@/features";
import { useSelector } from "@/shared/hooks";
import { User, Settings } from "lucide-react";

const ProfileDropdown = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Dropdown>
      <Dropdown.Trigger variant="text" className="flex min-w-[5rem] justify-center items-center p-0 m-0">
        프로필
      </Dropdown.Trigger>
      <Dropdown.Content className="w-64 py-3 mr-5">
        <div className="p-2 bg-background">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border border-solid border-color-icon-disabled bg-background rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-color-text-disabled" />
            </div>
            <div>
              <p className="heading-03 text-color-text-default">{user?.name ?? ""}</p>
              <p className="body-02 text-color-text-default opacity-70">{user?.email ?? ""}</p>
            </div>
          </div>
        </div>

        <Dropdown.Separator className="my-2" />

        <div className="flex flex-col py-2 gap-y-2">
          <Link href="/blog">
            <Dropdown.Item className="flex items-center justify-start w-full px-4 py-2 gap-2">
              <User className="" size={22} />
              <span className="heading-03">내 블로그</span>
            </Dropdown.Item>
          </Link>
          <Dropdown.Item className="flex items-center justify-start px-4 py-2 gap-2">
            <Settings className="" size={22} />
            <span className="heading-03">설정</span>
          </Dropdown.Item>
        </div>

        <Dropdown.Separator className="my-2" />

        <Dropdown.Item
          className="p-2 text-color-text-danger 
        data-[highlighted]:text-color-text-danger data-[highlighted]:font-bold "
        >
          <LogoutButton />
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
};

export default ProfileDropdown;
