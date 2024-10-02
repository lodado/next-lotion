"use client";

import { Provider as ReduxProvider } from "react-redux";

import React, { cloneElement, ReactElement, useMemo } from "react";

import { EditorProvider } from "./EditorProvider";
import { createEditorReduxLocalStore, createMarkdownView } from "../models";
import { useEditorView } from "../hooks/useEditorView";
import useEditorData from "../hooks/useEditorData";

const EditorContainer = ({
  EditorReduxLocalStore,
}: {
  EditorReduxLocalStore?: ReturnType<typeof createEditorReduxLocalStore>;
}) => {
  const { isMounted, editorRef, view, editorState, widgetController } = useEditorView(EditorReduxLocalStore!);
  const { handleSaveContent, editorIndexedDBRepository } = useEditorData({ view: view });

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

const EditorRoot = ({ children }: { children: ReactElement }) => {
  const EditorReduxLocalStore = useMemo(() => createEditorReduxLocalStore(), []);

  return (
    <ReduxProvider store={EditorReduxLocalStore}>{cloneElement(children, { EditorReduxLocalStore })}</ReduxProvider>
  );
};

EditorRoot.Editor = EditorContainer;

export default EditorRoot;
