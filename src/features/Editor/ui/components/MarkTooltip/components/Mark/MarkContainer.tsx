"use client";

import React from "react";
import { Button, cn, IconButton, ScreenReaderOnly, Tooltip } from "@/shared";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinkIcon from "@mui/icons-material/Link";
import CodeIcon from "@mui/icons-material/Code";

import { ICON_MARK_BUTTON_SIZE } from "@/features/Editor/constants";

import useMarkCommand from "../../../../../hooks/useMarkCommand";
import CommandTooltipContent from "../CommandTooltip/CommandTooltipContent";
import { MarkSelection } from "./style";
import { EDITOR_LINK_DIALOG_OPEN } from "../../../LinkDialog/model";
import { useEditorDispatch } from "@/features/Editor/hooks";

const buttonData = [
  {
    label: "Bold",
    command: "Bold" as const,
    Icon: FormatBoldIcon,
    width: ICON_MARK_BUTTON_SIZE,
    height: ICON_MARK_BUTTON_SIZE,
    showCondition: true, // 항상 렌더링

    commandDescription: "⌘-B",
  },
  {
    label: "Italic",
    command: "Italic" as const,
    Icon: FormatItalicIcon,
    width: ICON_MARK_BUTTON_SIZE,
    height: ICON_MARK_BUTTON_SIZE,
    showCondition: true, // 항상 렌더링

    commandDescription: "⌘-I",
  },
  {
    label: "Underline",
    command: "Underline" as const,
    Icon: FormatUnderlinedIcon,
    width: ICON_MARK_BUTTON_SIZE,
    height: ICON_MARK_BUTTON_SIZE,
    showCondition: true, // 항상 렌더링

    commandDescription: "⌘-U",
  },
  {
    label: "Strikethrough",
    command: "Strike" as const,
    Icon: FormatStrikethroughIcon,
    width: ICON_MARK_BUTTON_SIZE,
    height: ICON_MARK_BUTTON_SIZE,
    showCondition: true, // 항상 렌더링

    commandDescription: "⌘-D",
  },
  {
    label: "Code block",
    command: "InlineCodeSnippet" as const,
    Icon: CodeIcon,
    width: ICON_MARK_BUTTON_SIZE,
    height: ICON_MARK_BUTTON_SIZE,
    showCondition: true, // 항상 렌더링

    commandDescription: "⌘-`",
  },
] as const;

const MarkContainer = () => {
  const { toggleMarkCommand, isSelectionWithinNode, hasMarkInSelection } = useMarkCommand();
  const editorDispatch = useEditorDispatch();

  return (
    <div className="flex items-center justify-center gap-x-1">
      {buttonData.map(
        ({ label, command, Icon, width, height, showCondition, commandDescription }, index) =>
          showCondition && (
            <Tooltip key={label || index}>
              <Tooltip.Trigger>
                <IconButton
                  className={cn(MarkSelection({ markState: hasMarkInSelection(command) }), "p-1")}
                  onClick={command ? toggleMarkCommand(command) : undefined}
                  variant="text"
                  size="small"
                  aria-label={label}
                >
                  <Icon
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                    }}
                  />
                </IconButton>
              </Tooltip.Trigger>

              <CommandTooltipContent>
                <CommandTooltipContent.Description>{label}</CommandTooltipContent.Description>
                <CommandTooltipContent.CommandDescription>
                  {commandDescription}
                </CommandTooltipContent.CommandDescription>
              </CommandTooltipContent>
            </Tooltip>
          )
      )}
      {isSelectionWithinNode() && (
        <>
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                size="custom"
                type="button"
                variant="text"
                className="flex justify-center items-center p-1 disabled:opacity-1"
                aria-label="Insert link"
                onClick={() => {
                  editorDispatch(EDITOR_LINK_DIALOG_OPEN());
                }}
              >
                <svg
                  className="relative"
                  style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }}
                >
                  <LinkIcon />
                </svg>

                <ExpandMoreIcon
                  style={{ width: `${ICON_MARK_BUTTON_SIZE / 2}px`, height: `${ICON_MARK_BUTTON_SIZE / 2}px` }}
                />
              </Button>
            </Tooltip.Trigger>

            <CommandTooltipContent>
              <CommandTooltipContent.Description>Insert Link</CommandTooltipContent.Description>
              <CommandTooltipContent.CommandDescription>⌘-K</CommandTooltipContent.CommandDescription>
            </CommandTooltipContent>
          </Tooltip>
        </>
      )}
      <Tooltip>
        <Tooltip.Trigger>
          <Button
            size="custom"
            type="button"
            variant="text"
            className="flex justify-center p-1 items-center"
            aria-label="Change color"
          >
            <div
              className="rounded-full bg-background border-dashed border-[0.1px] border-background-inverse mr-1"
              style={{ width: `${ICON_MARK_BUTTON_SIZE / 1.5}px`, height: `${ICON_MARK_BUTTON_SIZE / 1.5}px` }}
              role="presentation none"
            />

            <ExpandMoreIcon
              style={{ width: `${ICON_MARK_BUTTON_SIZE / 2}px`, height: `${ICON_MARK_BUTTON_SIZE / 2}px` }}
            />

            <ScreenReaderOnly>Change Color</ScreenReaderOnly>
          </Button>
        </Tooltip.Trigger>

        <CommandTooltipContent>
          <CommandTooltipContent.Description>Change Color</CommandTooltipContent.Description>
          <CommandTooltipContent.CommandDescription>⌘-Ctrl-H</CommandTooltipContent.CommandDescription>
        </CommandTooltipContent>
      </Tooltip>
    </div>
  );
};

export default MarkContainer;
