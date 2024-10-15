import "../src/app/globals.scss";
import "../src/shared/libs/Figma/index.scss";

import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";
 
import ClientProvider from "../src/app/provider/ClientProvider";
import { useDarkMode } from "storybook-dark-mode";
import nextIntl from "./next-intl";

const preview: Preview = {
  initialGlobals: {
    locale: "en",
    locales: {
      en: "English",
      ko: "Korean",
      ar: "Arabic",
    },
  },

  globalTypes: {
    adsTheme: {
      description: "Atlassian Design System theming options",
      defaultValue: "light",
    },
  },

  parameters: {
    nextIntl,

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
      <ClientProvider
        session={{
          user: {
            id: "test",
            name: "test",
            email: "test",
            image: "test",
          },
        }}
      >
        <Story />
      </ClientProvider>
    );
  },
];

export default preview;
