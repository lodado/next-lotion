import { ComponentProps } from "react";
import { Trigger } from "./radix";
import { cn } from "@/shared/utils";
import { rawButtonVariants } from "../../Button/style";

const SelectTrigger = (props: ComponentProps<typeof Trigger> & ComponentProps<typeof rawButtonVariants>) => {
  const { children, className, variant, size, ...rest } = props;

  return (
    <Trigger
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm leading-none h-9 gap-2 bg-background text-color-text-default shadow-md",
        className,
        rawButtonVariants({ variant, size })
      )}
      {...rest}
    >
      {children}
    </Trigger>
  );
};

export default SelectTrigger;
