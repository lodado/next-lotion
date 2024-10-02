import { mapRepositoryErrorToUseCaseError } from "@/shared";
import { EditorRepositoryImpl } from "../repository";

/**
 * Use case to get a ProseMirrorNode.
 */
export class GetNodeUseCase {
  private repository: EditorRepositoryImpl;

  constructor(repository: EditorRepositoryImpl) {
    this.repository = repository;
  }

  async execute({ id }: { id: string }): Promise<void> {
    try {
      await this.repository.getById({ id });
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error);
    }
  }
}
