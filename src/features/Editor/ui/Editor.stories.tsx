import type { Meta, StoryObj } from "@storybook/react";
import Editor from "./Editor";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Editor> = {
  title: "Features/Editor",
  component: Editor,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Editor>;

export const NavigationExample: Story = {
  args: {},
};

export const EditorExample = Editor;
