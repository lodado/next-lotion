"use client";

import React from "react";
import { IconButton } from "@/shared";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ImageIcon from "@mui/icons-material/Image";

import { ICON_MARK_BUTTON_SIZE } from "@/features/Editor/constants";
import useNodeCommand from "./useNode";

export const NodeContainer = () => {
  const { isSelectionWithinNode } = useNodeCommand();

  return (
    <div className="flex items-center gap-x-2 p-2">
      <IconButton variant="custom" size="small" aria-label="Bulleted list">
        <FormatListBulletedIcon style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }} />
      </IconButton>
      <IconButton variant="custom" size="small" aria-label="Insert image">
        <ImageIcon style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }} />
      </IconButton>
    </div>
  );
};

export default NodeContainer;
