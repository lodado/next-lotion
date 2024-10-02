"use client";

import { Provider as ReduxProvider } from "react-redux";

import React, { useEffect, useMemo, useState } from "react";

import { EditorProvider } from "./EditorProvider";
import { createEditorReduxLocalStore, createMarkdownView } from "../models";
import { useEditorView } from "../hooks/useEditorView";

const Editor = () => {
  const EditorReduxLocalStore = useMemo(() => createEditorReduxLocalStore(), []);
  const { isMounted, editorRef, view, editorState, widgetController } = useEditorView(EditorReduxLocalStore);

  const handleSaveContent = () => {
    if (view) {
      const savedData = view.state.doc.toJSON();
    }
  };

  return (
    <ReduxProvider store={EditorReduxLocalStore}>
      <EditorProvider view={view!} editorState={editorState!}>
        <button type="button" onClick={handleSaveContent}>
          save
        </button>

        <div className="pl-10 ">
          <div className="w-[500px] h-[500px]" data-testid="editor" ref={editorRef} />
        </div>

        {isMounted && <widgetController.Widgets />}
      </EditorProvider>
    </ReduxProvider>
  );
};

export default Editor;
