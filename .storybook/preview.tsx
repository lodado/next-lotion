import "../src/app/globals.scss";
import "../src/shared/libs/Figma/index.scss";

import type { Preview } from "@storybook/react";
import React from "react";

import RootProvider from "../src/app/provider/RootProvider";
import ClientProvider from "../src/app/provider/ClientProvider";

const preview: Preview = {
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
  (Story) => {
    return (
      <ClientProvider session={{}}>
        <Story />
      </ClientProvider>
    );
  },
];

export default preview;
