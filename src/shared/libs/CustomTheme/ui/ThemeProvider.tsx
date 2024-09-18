"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import React, { useState } from "react";

const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  return <>{children}</>;
};

export default ThemeProvider;
