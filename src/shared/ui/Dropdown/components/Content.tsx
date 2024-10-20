"use client";

import { cn } from "@/shared/utils";
import { Content, Portal, Arrow, SubContent } from "./radix";

import { ComponentProps, PropsWithChildren } from "react";

interface DropdownContentProps extends PropsWithChildren {
  className?: string;
  isSub?: boolean;
  [key: string]: any;
}

const DropdownContent: React.FC<DropdownContentProps> = ({ children, className, isSub, ...rest }) => {
  const Box = isSub ? SubContent : Content;

  return (
    <Portal>
      <Box
        className={cn(
          "p-2 flex flex-col text-color-text-default relative overflow-hidden w-max z-dropdown bg-background border border-solid border-color-border-input rounded-lg shadow-dropdown mt-2",
          className
        )}
        {...rest}
      >
        {children}
      </Box>
    </Portal>
  );
};

export default DropdownContent;
