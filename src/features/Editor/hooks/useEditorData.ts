import { useEditorDispatch, useEditorSelector } from "./useEditorDispatcher";
import { EditorView } from "prosemirror-view";
import { EditorNode, EditorRepositoryImpl, SET_EDITOR_CONTENT } from "../models";
import { EditorIndexedDBRepository } from "../models/client/repository/EditorIndexedDBRepository";
import React, { useCallback, useEffect, useMemo, useState } from "react";

/**
 * // TODO
 * tanstack query로 migration
 */
const useEditorData = ({ view }: { view?: EditorView | null }) => {
  const content = useEditorSelector((state) => state.editorContent.content);
  const editorIndexedDBRepository = useMemo(() => new EditorIndexedDBRepository(), []);
  const editorDispatch = useEditorDispatch();

  const handleSaveContent = useCallback(
    (repository: EditorRepositoryImpl) => async () => {
      if (view) {
        const savedData = new EditorNode({ content: view.state.doc.toJSON() });
        try {
          await repository.put({ id: "editor-content", node: savedData });

          editorDispatch(SET_EDITOR_CONTENT(savedData));

          console.log("save ", savedData);
        } catch (error) {
          console.error("Failed to save editor content:", error);
        }
      }
    },
    [view]
  );

  const handleLoadContent = useCallback(
    (repository: EditorRepositoryImpl) => async () => {
      if (view) {
        try {
          const savedNode = await repository.getById({ id: "editor-content" }); // Fetch content with a unique ID

          if (savedNode) {
            editorDispatch(SET_EDITOR_CONTENT(savedNode));
          }
        } catch (error) {
          console.error("Failed to load editor content:", error);
        }
      }
    },
    []
  );

  return { content, handleSaveContent, handleLoadContent, editorIndexedDBRepository };
};

export default useEditorData;
