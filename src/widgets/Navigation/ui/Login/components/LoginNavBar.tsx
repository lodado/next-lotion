import React, { useState } from "react";
 
import Link from "next/link";
import { MobileMenuDropdown, MobileMenuToggleButton } from "./MobileMenuToggle";

import ProfileDropdown from "./ProfileSelector";
import { AuthRepositoryImpl, GetUserInfoUseCase } from "@/entities/Auth/core";
import { LoginButton } from "@/features";
import { Bell } from "lucide-react";
import { IconButton } from "@/shared/ui";
import { Logo } from "../../Logo";

const navLinks = [{ href: "/about", label: "알람" }];

const LoginNavBar = async ({ authRepository }: { authRepository: AuthRepositoryImpl }) => {
  const isLogin = await new GetUserInfoUseCase(authRepository).isUserLogin();

  return (
    <nav className="sticky w-screen top-0 bg-background text-color-text-default shadow-md z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 px-5">
          <div className="flex items-center flex-shrink-0 flex-row gap-5">
            <Logo />
          </div>
          {/* 데스크톱 메뉴 */}
          <div className="block">
            <div className="flex items-center space-x-4">
              {isLogin ? (
                <>
                  <IconButton variant="text">
                    <Bell />
                  </IconButton>

                  <ProfileDropdown />
                </>
              ) : (
                <>
                  <LoginButton />
                </>
              )}
              {/*
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
              */}
            </div>
          </div>
          {/* 모바일 메뉴 버튼, 반응형 지원시 고려해볼것 */}
          {/* <MobileMenuToggleButton /> */}
        </div>
      </div>
      {/* 모바일 메뉴, 반응형 지원시 고려해볼것 */}
      {/* <MobileMenuDropdown navLinks={navLinks} /> */}
    </nav>
  );
};

export default LoginNavBar;
