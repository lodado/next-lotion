"use client";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Root } from "@radix-ui/react-portal";

import React from "react";

import { BlockCreateContent } from "./components/BlockCreateContent";
 
import { Dropdown, ScreenReaderOnly } from "@/shared";
import { useEditorSelector } from "@/features/Editor/hooks";
import { ICON_BUTTON_SIZE } from "@/features/Editor/constants";

export const BlockCreateButton = () => {
  const isOpen = useEditorSelector((state) => state.blockCreateButton.isOpen);
  const position = useEditorSelector((state) => state.blockCreateButton.position);

  if (!isOpen) return null;

  return (
    <Root>
      <Dropdown>
        <Dropdown.Trigger
          type="button"
          className="bg-transparent text-cancel-default"
          style={{
            position: "absolute",

            inlineSize: `${ICON_BUTTON_SIZE}px`, // width -> inline-size
            blockSize: `${ICON_BUTTON_SIZE}px`, // height -> block-size
            insetBlockStart: position.y, // top -> inset-block-start
            insetInlineStart: position.x, // left -> inset-inline-start
          }}
        >
          <AddRoundedIcon
            style={{ fill: "var(--Color-Background-Accent-Gray-Subtlest-Pressed)" }}
            role="none presentation"
            aria-hidden={false}
          />
          <ScreenReaderOnly>Create block</ScreenReaderOnly>
        </Dropdown.Trigger>

        <BlockCreateContent>
          <BlockCreateContent.Item>Text</BlockCreateContent.Item>
          <BlockCreateContent.Item>Image</BlockCreateContent.Item>
          <BlockCreateContent.Item>Video</BlockCreateContent.Item>
          <BlockCreateContent.Item>Divider</BlockCreateContent.Item>
        </BlockCreateContent>
      </Dropdown>
    </Root>
  );
};
