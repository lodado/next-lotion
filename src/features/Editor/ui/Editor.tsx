"use client";

import { Provider as ReduxProvider } from "react-redux";
import { DOMParser } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import React, { useEffect, useRef, useState } from "react";

import { WidgetController } from "./components";
import { createState, createView } from "./core";
import { EditorProvider } from "./EditorProvider";
import { EditorReduxLocalStore } from "../models";

const useEditorView = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [view, setView] = useState<EditorView | null>(null);
  const [editorState, setEditorState] = useState<EditorState | null>(null);

  useEffect(() => {
    const state = createState({ getDoc: (schema) => DOMParser.fromSchema(schema).parse(editorRef.current!) });

    const viewInstance = createView({ editor: editorRef.current!, state });

    setEditorState(state);
    setView(viewInstance);

    setIsMounted(true);

    return () => viewInstance.destroy();
  }, []);

  return { isMounted, editorRef, editorState, view };
};

const Editor = () => {
  const { isMounted, editorRef, view, editorState } = useEditorView();

  return (
    <ReduxProvider store={EditorReduxLocalStore}>
      <div style={{ width: "100%", height: "100px" }}>margin for test</div>

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
