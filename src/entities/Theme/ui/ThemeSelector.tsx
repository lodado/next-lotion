"use client";

import { Select } from "@/shared";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ThemeSelector = () => {
  
  
  return (
    <Select defaultValue="다크모드">
      <Select.Trigger className="min-w-[10rem]">
        <Select.Value placeholder={""} />
        <Select.Icon className="SelectIcon">
          <ExpandMoreIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className="min-w-[10rem]">
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="blueberry">Blueberry</Select.Item>
          <Select.Item value="grapes">Grapes</Select.Item>
          <Select.Item value="pineapple">Pineapple</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select>
  );
};

export default ThemeSelector;
