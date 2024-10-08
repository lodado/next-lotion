import React from "react";

import { ICON_MARK_BUTTON_SIZE } from "@/features/Editor/constants";
import { Button, cn, Tooltip } from "@/shared";
import Divider from "../Divider";
import CommandTooltipContent from "../CommandTooltip/CommandTooltipContent";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const AdditionalOptionDropdown = () => {
  return (
    <>
      <Tooltip>
        <Tooltip.Trigger>
          <Button
            disabled
            className={cn("p-1 bg-color-background-disabled")}
            variant="text"
            size="small"
            aria-label={"add comment"}
          >
            <MoreHorizIcon style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }} />
          </Button>
        </Tooltip.Trigger>

        <CommandTooltipContent>
          <CommandTooltipContent.Description>additional options (not released yet!)</CommandTooltipContent.Description>
        </CommandTooltipContent>
      </Tooltip>
    </>
  );
};

export default AdditionalOptionDropdown;
