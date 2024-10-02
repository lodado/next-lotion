"use client";

import { Provider as ReduxProvider } from "react-redux";

import React, { useEffect, useMemo, useState } from "react";

import { EditorProvider } from "./EditorProvider";
import { createEditorReduxLocalStore, createMarkdownView } from "../models";
import { useEditorView } from "../hooks/useEditorView";
import useEditorData from "../hooks/useEditorData";

const EditorContainer = ({
  EditorReduxLocalStore,
}: {
  EditorReduxLocalStore: ReturnType<typeof createEditorReduxLocalStore>;
}) => {
  const { isMounted, editorRef, view, editorState, widgetController, handleSaveContent, editorIndexedDBRepository } =
    useEditorView(EditorReduxLocalStore);

  return (
    <EditorProvider view={view!} editorState={editorState!}>
      <button type="button" onClick={handleSaveContent(editorIndexedDBRepository)}>
        save
      </button>

      <div className="pl-10 ">
        <div className="w-[500px] h-[500px]" data-testid="editor" ref={editorRef} />
      </div>

      {isMounted && <widgetController.Widgets />}
    </EditorProvider>
  );
};

const Editor = () => {
  const EditorReduxLocalStore = useMemo(() => createEditorReduxLocalStore(), []);

  return (
    <ReduxProvider store={EditorReduxLocalStore}>
      <EditorContainer EditorReduxLocalStore={EditorReduxLocalStore} />
    </ReduxProvider>
  );
};

export default Editor;
