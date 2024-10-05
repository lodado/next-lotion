import { mapRepositoryErrorToUseCaseError } from "@/shared";
import { ProseMirrorNode } from "../../editor";
import { EditorNode } from "../entity";
import { EditorRepositoryImpl } from "../repository";

/**
 * Use case to update a ProseMirrorNode.
 */
export class UpdateNodeUseCase {
  private repository: EditorRepositoryImpl;

  constructor(repository: EditorRepositoryImpl) {
    this.repository = repository;
  }

  async execute({ id, content }: { id: string; content: ProseMirrorNode }): Promise<void> {
    try {
      const node = new EditorNode({ content });

      await this.repository.put({ id, node });
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error);
    }
  }
}
