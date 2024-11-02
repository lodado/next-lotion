import { SERVER_DI_REPOSITORY } from "@/DI/index.server";
import { NextAuthSessionResponse } from "../../type";
import { mapRepositoryErrorToUseCaseError } from "@/shared/constants/error/error";

export class GetUserSessionInfoUseCase {
  constructor(private AuthRepository: SERVER_DI_REPOSITORY.Auth) {}

  async execute(): Promise<NextAuthSessionResponse | undefined> {
    try {
      return await this.AuthRepository.getUserSessionInfo();
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error);
    }
  }
}
