import { GetEditorNodeUseCase } from "./../models/core/usecase/GetEditorNodeUseCase";
import { DeleteEditorNodeUseCase, EditorNode, UpdateEditorNodeUseCase } from "../models";
import { EditorServerRepository } from "../models/index.server";
import { AuthServerRepository } from "@/entities/index.server";

export async function fetchDocument(id: string) {
  try {
    const editorRepository = new EditorServerRepository(id);
    const authRepository = new AuthServerRepository();

    const document = await new GetEditorNodeUseCase(editorRepository, authRepository).execute();
    return document;
  } catch (error) {
    console.error(error);
  }
}

export async function updateDocument(id: string, newNode: EditorNode) {
  try {
    const editorRepository = new EditorServerRepository(id);
    const authRepository = new AuthServerRepository();

    await new UpdateEditorNodeUseCase(editorRepository, authRepository).execute({ content: newNode.content });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteDocument(id: string) {
  try {
    const editorRepository = new EditorServerRepository(id);
    const authRepository = new AuthServerRepository();

    await new DeleteEditorNodeUseCase(editorRepository, authRepository).execute();
  } catch (error) {
    console.error(error);
  }
}
