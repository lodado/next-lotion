import "../src/app/globals.scss";
import "../src/shared/libs/Figma/index.scss";

import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";

import RootProvider from "../src/app/provider/RootProvider";
import ClientProvider from "../src/app/provider/ClientProvider";
import { useDarkMode } from "storybook-dark-mode";

const preview: Preview = {
  globalTypes: {
    adsTheme: {
      description: "Atlassian Design System theming options",
      defaultValue: "light",
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story: any) => {
    const isDarkMode = useDarkMode();
    useEffect(() => {
      document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
      document.body.style.backgroundColor = isDarkMode ? "#000" : "#fff";
    }, [isDarkMode]);

    return <Story />;
  },

  (Story) => {
    return (
      <ClientProvider session={{}}>
        <Story />
      </ClientProvider>
    );
  },
];

export default preview;
