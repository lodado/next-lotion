"use client";

import { Provider as ReduxProvider } from "react-redux";

import React, { useEffect, useMemo, useState } from "react";

import { WidgetController } from "./components";
import { EditorProvider } from "./EditorProvider";
import { createEditorReduxLocalStore, createMarkdownView, EditorReduxStore } from "../models";
import { useEditorView } from "../hooks/useEditorView";

const Editor = () => {
  // const EditorReduxLocalStore = useMemo(() => createEditorReduxLocalStore(), []);

  const { isMounted, editorRef, view, editorState } = useEditorView();

  const [a, setD] = useState(0);

  useEffect(() => {
    const req = () => {
      if (view) {
        console.log(123, createMarkdownView({ view }));
      }

      setD((d) => d + 1);

      setTimeout(req, 1500);
    };

    if (view) req();
  }, [view]);

  return (
    <ReduxProvider store={EditorReduxStore}>
      <EditorProvider view={view!} editorState={editorState!}>
        <div className="pl-10 ">
          <div className="w-[500px] h-[500px]" ref={editorRef} />
        </div>

        {isMounted && <WidgetController.Widgets />}
      </EditorProvider>

      {view && createMarkdownView({ view })}
    </ReduxProvider>
  );
};

export default Editor;
