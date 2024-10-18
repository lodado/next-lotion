"use client";

import { cn } from "@/shared/utils";
import { Content, Portal, ScrollDownButton, ScrollUpButton, Viewport } from "./radix";

import { ChevronUp, ChevronDown } from "lucide-react";
import { PropsWithChildren } from "react";

import "../index.scss";

const SelectContent = ({ children, className }: PropsWithChildren & { className?: string }) => (
  <Portal>
    <Content
      dir="inherit"
      position="popper"
      className="SelectContent overflow-hidden w-max z-dropdown bg-background border border-solid border-color-border-input rounded-lg shadow-dropdown mt-2"
    >
      <ScrollUpButton className="flex items-center justify-center h-6 bg-background-default text-color-text-default cursor-default">
        <ChevronUp />
      </ScrollUpButton>
      <Viewport className={cn("p-2", className)}>{children}</Viewport>
      <ScrollDownButton className="flex items-center justify-center h-6 bg-background-default text-color-text-default cursor-default">
        <ChevronDown />
      </ScrollDownButton>
    </Content>
  </Portal>
);

export default SelectContent;
