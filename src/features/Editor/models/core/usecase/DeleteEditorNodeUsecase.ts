import { mapRepositoryErrorToUseCaseError } from "@/shared";
import { ProseMirrorNode } from "../../editor";
import { EditorNode } from "../entity";
import { EditorRepositoryImpl } from "../repository";

/**
 * Use case to delete a ProseMirrorNode.
 */
export class DeleteNodeUseCase {
  private repository: EditorRepositoryImpl;

  constructor(repository: EditorRepositoryImpl) {
    this.repository = repository;
  }

  async execute({ id }: { id: string }): Promise<void> {
    try {
      await this.repository.deleteById({ id });
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error);
    }
  }
}
