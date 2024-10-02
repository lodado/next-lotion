import { EditorView } from "prosemirror-view";
import { EditorNode, EditorRepositoryImpl } from "../models";
import { EditorIndexedDBRepository } from "../models/client/repository/EditorIndexedDBRepository";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const useEditorData = ({ view }: { view?: EditorView | null }) => {
  const [content, setContent] = useState<EditorNode | null | undefined>(null);
  const editorIndexedDBRepository = useMemo(() => new EditorIndexedDBRepository(), []);

  const handleSaveContent = useCallback(
    (repository: EditorRepositoryImpl) => async () => {
      if (view) {
        const savedData = new EditorNode({ content: view.state.doc.toJSON() });
        try {
          await repository.put({ id: "editor-content", node: savedData });

          console.log("save ", savedData);
        } catch (error) {
          console.error("Failed to save editor content:", error);
          setContent(undefined);
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
            setContent(savedNode); // Assuming content is ProseMirrorNode
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
