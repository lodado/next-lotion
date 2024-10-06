"use client";

import { Root } from "@radix-ui/react-portal";

import React from "react";

import { useEditorDispatch, useEditorSelector } from "@/features/Editor/hooks";
import { Tooltip } from "@/shared";
import { OPEN_EDITOR_MARK_TOOLTIP, RESET_EDITOR_MARK_TOOLTIP } from "./model";

export const EditorMarkTooltip = () => {
  const isOpen = useEditorSelector((state) => state.markToolTip.isOpen);
  const position = useEditorSelector((state) => state.markToolTip.position);
  const dispatch = useEditorDispatch();

  if (!isOpen) return null;

  return (
    <Tooltip
      open={isOpen}
      defaultOpen={false}
      onOpenChange={() => {
        // if (isOpen) dispatch(RESET_EDITOR_MARK_TOOLTIP());
      }}
    >
      <Tooltip.Content
        className="absolute w-[30rem] h-[3rem]"
        style={{ left: position.x, top: position.y }}
        align="center"
        side="left"
        variant="primary"
      >
        Max width of tooltips is 240px - wrap text if necessary.
      </Tooltip.Content>
    </Tooltip>
  );
};
