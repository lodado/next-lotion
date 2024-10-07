"use client";

import React from "react";
import { IconButton, ScreenReaderOnly } from "@/shared";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinkIcon from "@mui/icons-material/Link";

import { ICON_MARK_BUTTON_SIZE } from "@/features/Editor/constants";
import { MarkController } from "@/features/Editor/models/editor/marks";
import { toggleMark } from "prosemirror-commands";
import { useEditorContext } from "@/features/Editor/ui/EditorProvider";
import { TextSelection } from "prosemirror-state";
import useMarkCommand from "./useMarkCommand";

const MarkContainer = () => {
  const { toggleMarkCommand, isSelectionWithinNode } = useMarkCommand();

  return (
    <div className="flex space-x-2 items-center justify-center gap-x-[0.1rem]">
      <IconButton onClick={toggleMarkCommand("Bold")} variant="custom" size="small" aria-label="Bold">
        <FormatBoldIcon style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }} />
      </IconButton>
      <IconButton onClick={toggleMarkCommand("Italic")} variant="custom" size="small" aria-label="Italic">
        <FormatItalicIcon style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }} />
      </IconButton>
      <IconButton onClick={toggleMarkCommand("Underline")} variant="custom" size="small" aria-label="Underline">
        <FormatUnderlinedIcon style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }} />
      </IconButton>
      <IconButton onClick={toggleMarkCommand("Strike")} variant="custom" size="small" aria-label="Strikethrough">
        <FormatStrikethroughIcon
          style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }}
        />
      </IconButton>

      {isSelectionWithinNode() && (
        <button type="button" className="flex justify-center items-center disabled:opacity-1" aria-label="Insert link">
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
      )}

      <button type="button" className="flex justify-center items-center " aria-label="Change color">
        <div
          className="rounded-full bg-background border-dashed border-[0.1px] border-background-inverse mr-1"
          style={{ width: `${ICON_MARK_BUTTON_SIZE / 1.5}px`, height: `${ICON_MARK_BUTTON_SIZE / 1.5}px` }}
          role="presentation none"
        />

        <ExpandMoreIcon style={{ width: `${ICON_MARK_BUTTON_SIZE / 2}px`, height: `${ICON_MARK_BUTTON_SIZE / 2}px` }} />

        <ScreenReaderOnly>Change Color</ScreenReaderOnly>
      </button>
    </div>
  );
};

export default MarkContainer;
