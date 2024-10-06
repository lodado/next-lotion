import React from "react";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { ICON_MARK_BUTTON_SIZE } from "@/features/Editor/constants";
import { IconButton } from "@/shared";
import Divider from "../Divider";

const Comment = () => {
  return (
    <>
      <button type="button" className="flex justify-center items-center caption" aria-label="Comment">
        <InsertCommentIcon style={{ width: `${ICON_MARK_BUTTON_SIZE}px`, height: `${ICON_MARK_BUTTON_SIZE}px` }} />
        &nbsp;(0)
      </button>

      <Divider />
    </>
  );
};

export default Comment;
