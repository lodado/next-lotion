"use client";
 
import React from "react";

import { useEditorDispatch, useEditorSelector } from "@/features/Editor/hooks";
import { Tooltip } from "@/shared";

import "./index.scss";

import { Comment } from "./components";
import Divider from "./components/Divider";
import { MarkContainer, NodeContainer } from "./components";
import AdditionalOptionDropdown from "./components/AdditionalOptionDropdown/AdditionalOptionDropdown";

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
        lang="en"
        data-state={isOpen ? "delayed-open" : "closed"}
        className="TooltipContent absolute h-[2rem] bg-color-background-input-default"
        style={{ left: position.x, top: Math.max(position.y, 100) }}
        variant="primary"
        side={"top"}
      >
        <div className="flex space-x-2 items-center justify-center gap-x-[0.1rem]">
          <Comment />

          <MarkContainer />

          <Divider />

          <NodeContainer />

          <Divider />

          <AdditionalOptionDropdown />
        </div>
      </Tooltip.Content>
    </Tooltip>
  );
};