"use client";

import { Provider as ReduxProvider } from "react-redux";

import React, { useMemo } from "react";
 
import { EditorProvider } from "./EditorProvider";
import { createEditorReduxLocalStore } from "../models";
import { useEditorView } from "../hooks/useEditorView";

const Editor = () => {
    const EditorReduxLocalStore = useMemo(() => createEditorReduxLocalStore(), []);
    const { isMounted, editorRef, view, editorState, widgetController } = useEditorView(EditorReduxLocalStore);

    return (
      <ReduxProvider store={EditorReduxLocalStore}>
        <EditorProvider view={view!} editorState={editorState!}>
          <div className="pl-10 ">
            <div className="w-[500px] h-[500px]" ref={editorRef} />
          </div>

          {isMounted && <widgetController.Widgets />}
        </EditorProvider>
      </ReduxProvider>
    );
};

export default Editor;
