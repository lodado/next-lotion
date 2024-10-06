import { cva, VariantProps } from "class-variance-authority";
import React, { HTMLAttributes, ReactNode } from "react";
import { PopperContentProps } from "@radix-ui/react-popper";
import { Arrow, Content, Portal, Provider, Root, Trigger } from "./radix";

// Define styles using class-variance-authority (cva)
const tooltipContentStyles = cva(
  "flex z-tooltip rounded gap-spacing-3 p-2 flex-start body-03 pt-spacing-1 pb-spacing-1 pl-spacing-3 pr-spacing-3 detail-02-r shadow-tooltip",
  {
    variants: {
      variant: {
        primary: "bg-color-background-input-default text-color-text-default",
        secondary: "bg-background-inverse text-background ",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface TooltipContentProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof tooltipContentStyles> {
  children: ReactNode;
  side?: PopperContentProps["side"];
  align?: PopperContentProps["align"];

  variant?: "primary" | "secondary";
}

export const TooltipTrigger = ({ children }: { children: ReactNode }) => {
  return <Trigger asChild>{children}</Trigger>;
};

export const TooltipContent = ({
  className,
  children,
  side = "top",
  align = "center",
  variant = "primary",
  ...rest
}: TooltipContentProps) => {
  return (
    <Portal>
      <Content className={tooltipContentStyles({ variant, className })} side={side} align={align} {...rest}>
        {children}
      </Content>
    </Portal>
  );
};
