"use client";

import { cn } from "@/shared/utils";
import { Content, Portal, Arrow } from "./radix";

import { PropsWithChildren } from "react";

const DropdownContent = ({ children, className }: PropsWithChildren & { className?: string }) => (
  <Portal>
    <Content
      className={cn(
        "p-2 flex flex-col text-color-text-default relative overflow-hidden w-max z-dropdown bg-background border border-solid border-color-border-input rounded-lg shadow-dropdown mt-2",
        className
      )}
    >
      {children}
    </Content>
  </Portal>
);

export default DropdownContent;
