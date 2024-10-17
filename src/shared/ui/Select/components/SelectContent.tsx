import { cn } from "@/shared/utils";
import { Content, Portal, ScrollDownButton, ScrollUpButton, Viewport } from "./radix";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { PropsWithChildren } from "react";

import "../index.scss";

const SelectContent = ({ children, className }: PropsWithChildren & { className?: string }) => (
  <Portal>
    <Content
      position="popper"
      className="SelectContent overflow-hidden w-max z-dropdown bg-background border border-solid border-color-border-input rounded-lg shadow-dropdown mt-2"
    >
      <ScrollUpButton className="flex items-center justify-center h-6 bg-background-default text-color-text-default cursor-default">
        <KeyboardArrowUpIcon />
      </ScrollUpButton>
      <Viewport className={cn("p-2", className)}>{children}</Viewport>
      <ScrollDownButton className="flex items-center justify-center h-6 bg-background-default text-color-text-default cursor-default">
        <KeyboardArrowDownIcon />
      </ScrollDownButton>
    </Content>
  </Portal>
);

export default SelectContent;
