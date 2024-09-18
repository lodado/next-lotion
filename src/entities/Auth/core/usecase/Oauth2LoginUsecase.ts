import { mapRepositoryErrorToUseCaseError } from "@/shared";

import { AuthRepositoryImpl } from "../repository";

export class Oauth2LoginUsecase {
  constructor(private AuthRepository: AuthRepositoryImpl) {}

  execute: () => Promise<void> = async () => {
    try {
      return this.AuthRepository.login();
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error);
    }
  };
}
