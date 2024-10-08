import { Tooltip } from "@/shared";
import React, { PropsWithChildren } from "react";

const CommandTooltipContent = ({ children }: PropsWithChildren) => {
  return (
    <Tooltip.Content variant="secondary" className="py-0.5 flex flex-col gap-0 mb-2">
      {children}
    </Tooltip.Content>
  );
};

const Description = ({ children }: PropsWithChildren) => {
  return <div className="caption-sm">{children}</div>;
};

const CommandDescription = ({ children }: PropsWithChildren) => {
  return <div className="caption-xsm text-color-background-brand-subtlest-pressed caption">{children}</div>;
};

CommandTooltipContent.Description = Description;
CommandTooltipContent.CommandDescription = CommandDescription;

export default CommandTooltipContent;
