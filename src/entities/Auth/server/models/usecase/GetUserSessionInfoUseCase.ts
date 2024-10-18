import { AuthServerRepository } from "../index.server";
import { NextAuthSessionResponse } from "../../type";
import { mapRepositoryErrorToUseCaseError } from "@/shared/constants/error/error";

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
