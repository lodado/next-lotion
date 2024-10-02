"use client";

import { Provider as ReduxProvider } from "react-redux";

import React, { useEffect, useMemo, useState } from "react";

import { EditorProvider } from "./EditorProvider";
import { createEditorReduxLocalStore, createMarkdownView } from "../models";
import { useEditorView } from "../hooks/useEditorView";
import useEditorData from "../hooks/useEditorData";

const Editor = () => {
  const EditorReduxLocalStore = useMemo(() => createEditorReduxLocalStore(), []);
  const { isMounted, editorRef, view, editorState, widgetController, handleSaveContent, editorIndexedDBRepository } =
    useEditorView(EditorReduxLocalStore);

  return (
    <ReduxProvider store={EditorReduxLocalStore}>
      <EditorProvider view={view!} editorState={editorState!}>
        <button type="button" onClick={handleSaveContent(editorIndexedDBRepository)}>
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
