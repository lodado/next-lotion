// usecases/GetDomainUseCase.ts
import { UseCaseError } from "@/shared";
import { Domain, DomainRepositoryImpl } from "@/entities/domain/models/core";

export default class GetDomainUseCase {
  private domainRepository: DomainRepositoryImpl;

  constructor(domainRepository: DomainRepositoryImpl) {
    this.domainRepository = domainRepository;
  }

  async execute(domainId: number): Promise<Domain> {
    try {
      // Fetch domain by ID
      const domain = await this.domainRepository.getDomainById(domainId);
      return domain;
    } catch (error) {
      throw new UseCaseError({ message: "Failed to execute GetDomainUseCase", originalError: error });
    }
  }
}
