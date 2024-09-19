"use client";

import { Root } from "@radix-ui/react-portal";

import React from "react";

import { useDropdownSelector } from "./model";

export const EditorDropdown = () => {
  const { isOpen, position } = useDropdownSelector();
  if (!isOpen) return null;

  return (
    <Root>
      (
      <ul
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          listStyleType: "none",
          padding: "8px",
          backgroundColor: "white",
          border: "1px solid #ccc",
        }}
      />
      )
    </Root>
  );
};
