"use client";

import { DOMParser } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import React, { useEffect, useRef, useState } from "react";

import { createState, createView } from "../models/core";
 
export const useEditorView = () => {
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

    viewInstance.dom.addEventListener("input", () => {
      if (viewInstance.state.doc) {
      }
    });

    return () => viewInstance.destroy();
  }, []);

  return { isMounted, editorRef, editorState, view };
};
