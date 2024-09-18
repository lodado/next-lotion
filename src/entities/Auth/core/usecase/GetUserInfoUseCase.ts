import { mapRepositoryErrorToUseCaseError } from "@/shared";
import { AuthRepositoryImpl } from "../repository";
import { UserEntity } from "../entity";

export class GetUserInfoUseCase {
  constructor(private userAuthRepository: AuthRepositoryImpl) {}

  async execute(): Promise<UserEntity | undefined> {
    try {
      return await this.userAuthRepository.getUserInfo();
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error);
    }
  }
}
