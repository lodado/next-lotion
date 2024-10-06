"use client";
 
import React from "react";

import { useEditorDispatch, useEditorSelector } from "@/features/Editor/hooks";
import { Tooltip } from "@/shared";

import "./index.scss";

export const EditorMarkTooltip = () => {
  const isOpen = useEditorSelector((state) => state.markToolTip.isOpen);
  const position = useEditorSelector((state) => state.markToolTip.position);
  const dispatch = useEditorDispatch();

  return (
    <Tooltip
      open={isOpen}
      defaultOpen={false}
      onOpenChange={() => {
        // if (isOpen) dispatch(RESET_EDITOR_MARK_TOOLTIP());
      }}
    >
      <Tooltip.Content
        data-state={isOpen ? "delayed-open" : "closed"}
        className="TooltipContent absolute w-[30rem] h-[3rem]"
        style={{ left: position.x, top: Math.max(position.y, 100) }}
        variant="primary"
        side={"top"}
      >
        Max width of tooltips is 240px - wrap text if necessary.
      </Tooltip.Content>
    </Tooltip>
  );
};
