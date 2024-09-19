"use client";

import { Provider as ReduxProvider } from "react-redux";

import React, { useMemo } from "react";

import { WidgetController } from "./components";
import { EditorProvider } from "./EditorProvider";
import { createEditorReduxLocalStore, EditorReduxStore } from "../models";
import { useEditorView } from "../hooks/useEditorView";

const Editor = () => {
  // const EditorReduxLocalStore = useMemo(() => createEditorReduxLocalStore(), []);

  const { isMounted, editorRef, view, editorState } = useEditorView();

  return (
    <ReduxProvider store={EditorReduxStore}>
      <EditorProvider view={view!} editorState={editorState!}>
        <div className="pl-10 ">
          <div className="w-[500px] h-[500px]" ref={editorRef} />
        </div>

        {isMounted && <WidgetController.Widgets />}
      </EditorProvider>
    </ReduxProvider>
  );
};

export default Editor;
