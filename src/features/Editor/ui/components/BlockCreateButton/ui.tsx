import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Root } from "@radix-ui/react-portal";yar

import React from "react";

import { BlockCreateContent } from "./components/BlockCreateContent";
import { useBlockCreateButtonSelector } from "./model";
import { Dropdown, ScreenReaderOnly } from "@/shared";

export const BlockCreateButton = () => {
  const { isOpen, position } = useBlockCreateButtonSelector();
  if (!isOpen) return null;

  return (
    <Root>
      <Dropdown>
        <Dropdown.Trigger
          type="button"
          className="bg-transparent text-cancel-default"
          style={{
            position: "absolute",

            width: "37px",
            height: "37px",
            top: position.y,
            left: position.x,
          }}
        >
          <AddRoundedIcon role="none presentation" aria-hidden={false} />
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
