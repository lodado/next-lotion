"use client";
 
import React from "react";

import { useEditorDispatch, useEditorSelector } from "@/features/Editor/hooks";
import { IconButton, ScreenReaderOnly, Tooltip } from "@/shared";

import "./index.scss";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import CodeIcon from "@mui/icons-material/Code";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import { ICON_MARK_BUTTON_SIZE } from "@/features/Editor/constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Divider = () => {
  return <div className="w-[0.7px] h-[110%] bg-color-text-disabled opacity-50" />;
};

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
        className="TooltipContent absolute h-[2rem] bg-color-background-input-default"
        style={{ left: position.x, top: Math.max(position.y, 100) }}
        variant="primary"
        side={"top"}
      >
        <div className="flex space-x-2 items-center justify-center gap-x-[0.1rem]">
          <IconButton variant="custom" size="small" aria-label="Bold">
            <FormatBoldIcon style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }} />
          </IconButton>
          <IconButton variant="custom" size="small" aria-label="Italic">
            <FormatItalicIcon style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }} />
          </IconButton>
          <IconButton variant="custom" size="small" aria-label="Underline">
            <FormatUnderlinedIcon
              style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }}
            />
          </IconButton>
          <IconButton variant="custom" size="small" aria-label="Strikethrough">
            <FormatStrikethroughIcon
              style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }}
            />
          </IconButton>

          <Divider />

          <IconButton variant="custom" size="small" aria-label="Code block">
            <CodeIcon style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }} />
          </IconButton>
          <IconButton variant="custom" size="small" aria-label="Bulleted list">
            <FormatListBulletedIcon
              style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }}
            />
          </IconButton>
          <IconButton variant="custom" size="small" aria-label="Insert image">
            <ImageIcon style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }} />
          </IconButton>

          <button type="button" className="flex justify-center items-center " aria-label="Insert link">
            <svg
              className="relative"
              style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }}
            >
              <LinkIcon />
            </svg>

            <ExpandMoreIcon
              style={{ width: `${ICON_MARK_BUTTON_SIZE / 2}px`, height: `${ICON_MARK_BUTTON_SIZE / 2}px` }}
            />
          </button>

          <button type="button" className="flex justify-center items-center " aria-label="Change color">
            <div
              className="rounded-full bg-background border-dashed border-[0.1px] border-background-inverse mr-1"
              style={{ width: `${ICON_MARK_BUTTON_SIZE / 1.5}px`, height: `${ICON_MARK_BUTTON_SIZE / 1.5}px` }}
              role="presentation none"
            />

            <ExpandMoreIcon
              style={{ width: `${ICON_MARK_BUTTON_SIZE / 2}px`, height: `${ICON_MARK_BUTTON_SIZE / 2}px` }}
            />

            <ScreenReaderOnly>Change Color</ScreenReaderOnly>
          </button>

          <Divider />

          <IconButton variant="custom" size="small" aria-label="More options">
            <MoreHorizIcon style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }} />
          </IconButton>
        </div>
      </Tooltip.Content>
    </Tooltip>
  );
};
