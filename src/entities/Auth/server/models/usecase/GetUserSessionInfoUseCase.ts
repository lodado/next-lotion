import { mapRepositoryErrorToUseCaseError } from "@/shared";
import { UserEntity } from "../../../core";
import { AuthServerRepository } from "../index.server";
import { NextAuthSessionResponse } from "../../type";

export class GetUserSessionInfoUseCase {
  constructor(private AuthRepository: AuthServerRepository) {}

  async execute(): Promise<NextAuthSessionResponse | undefined> {
    try {
      return await this.AuthRepository.getUserSessionInfo();
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error);
    }
  }
}
