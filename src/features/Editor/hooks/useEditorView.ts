"use client";

import { DOMParser, Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import React, { useEffect, useRef, useState } from "react";

import { createSchema, createState, createView, ProseMirrorNode } from "../models/editor";
import { WidgetController } from "../ui/components";
import { EditorReduxStore } from "../models";
import useEditorData from "./useEditorData";
import { useEditorDispatch } from "./useEditorDispatcher";
import { RESET_EDITOR_STATUS } from "../models/store/saga";

export const useEditorView = (ReduxLocalStore: typeof EditorReduxStore) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorDispatch = useEditorDispatch();

  const [isMounted, setIsMounted] = useState(false);

  const [view, setView] = useState<EditorView | null>(null);
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [widgetController, setWidgetController] = useState(() => new WidgetController(ReduxLocalStore));

  const { content, handleSaveContent, editorIndexedDBRepository } = useEditorData({ view: view });

  const initEditor = (
    domParser = (schema: Schema<any, any>) => DOMParser.fromSchema(schema).parse(editorRef.current!)
  ) => {
    setIsMounted(false);

    const newWidgetController = new WidgetController(ReduxLocalStore);

    const state = createState({
      widgetController: newWidgetController,
      getDoc: domParser,
    });

    const viewInstance = createView({
      editor: editorRef.current!,
      state,
    });

    setEditorState(state);
    setView(viewInstance);

    setIsMounted(true);
    setWidgetController(newWidgetController);
    editorDispatch(RESET_EDITOR_STATUS());

    return () => viewInstance.destroy();
  };

  useEffect(() => {
    const domParser =
      view && content ? (schema: Schema<any, any>) => ProseMirrorNode.fromJSON(schema, content.toJSON()) : undefined;

    const destroyView = initEditor(domParser);

    return destroyView;
  }, [content]);

  return { isMounted, editorRef, editorState, view, widgetController, handleSaveContent, editorIndexedDBRepository };
};
