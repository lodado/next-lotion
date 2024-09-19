"use client";

import { Provider as ReduxProvider } from "react-redux";

import React from "react";

import { WidgetController } from "./components";
import { EditorProvider } from "./EditorProvider";
import { EditorReduxLocalStore } from "../models";
import { useEditorView } from "../hooks/useEditorView";

const Editor = () => {
  const { isMounted, editorRef, view, editorState } = useEditorView();

  return (
    <ReduxProvider store={EditorReduxLocalStore}>
      <EditorProvider view={view!} editorState={editorState!}>
        <div className="pl-10">
          <div ref={editorRef} />
        </div>

        {isMounted && <WidgetController.Widgets />}
      </EditorProvider>
    </ReduxProvider>
  );
};

export default Editor;
