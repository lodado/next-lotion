import { mapEntityErrorToRepositoryError, RepositoryError } from "@/shared";
import { ProseMirrorNode } from "../../core";
import { EditorRepositoryImpl } from "./EditorRepositoryImpl";
import { EditorNode } from "../entity";

export class ProseMirrorRepository implements EditorRepositoryImpl {
  path = "/node";

  constructor(path: string = "/node") {
    this.path = path;
  }

  async getById({ id }: { id: string }): Promise<EditorNode> {
    try {
      const response = await fetch(`/${this.path}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch editor state.");
      }
      const data = await response.json();

      return new EditorNode({ content: data });
    } catch (error) {
      throw mapEntityErrorToRepositoryError(error);
    }
  }

  async put({ id, node }: { id: string; node: ProseMirrorNode }): Promise<void> {
    try {
      const response = await fetch(`/${this.path}/${id}`, {
        method: "PUT",
        body: JSON.stringify({ content: node }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update node.");
      }
    } catch (error) {
      throw mapEntityErrorToRepositoryError(error);
    }
  }

  async deleteById({ id }: { id: string }): Promise<void> {
    try {
      const response = await fetch(`/node/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete node.");
      }
    } catch (error) {
      throw new RepositoryError({ message: `Error deleting node with id ${id}`, originalError: error });
    }
  }
}
