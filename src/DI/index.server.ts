import { AuthServerRepository } from "@/entities/index.server";
import { DomainServerRepository } from "@/features/blog/domain/models/server/repository";
import { EditorServerRepository } from "@/features/Editor/models/index.server";

export const SERVER_DI_REPOSITORY = {
  Auth: AuthServerRepository,
  Domain: DomainServerRepository,
  Editor: EditorServerRepository,
};
