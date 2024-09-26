"use client";

import { Provider as ReduxProvider } from "react-redux";

import React, { useEffect, useMemo, useState } from "react";

import { EditorProvider } from "./EditorProvider";
import { createEditorReduxLocalStore, createMarkdownView } from "../models";
import { useEditorView } from "../hooks/useEditorView";

const Editor = () => {
  const EditorReduxLocalStore = useMemo(() => createEditorReduxLocalStore(), []);
  const { isMounted, editorRef, view, editorState, widgetController } = useEditorView(EditorReduxLocalStore);

  const [d, setD] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setD((d) => d + 1);
    }, 1500);
  }, []);

  if (view) {
    console.log(createMarkdownView({ view: view! }));
  }
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
