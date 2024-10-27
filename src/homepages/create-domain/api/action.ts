"use server";

import { GetUserInfoUseCase } from "@/entities/Auth/core";
import { AuthServerRepository } from "@/entities/index.server";
import { Domain } from "@/features/blog/domain/models/core";
import { DomainServerRepository } from "@/features/blog/domain/models/server/repository";
import { CreateDomainUseCase, GetDomainUseCase } from "@/features/blog/domain/models/core/usecase";
import { redirect } from "next/navigation";
import { getLinkHref } from "@/shared/api";

export async function createBlogAction(formData: FormData) {
  const domainLocation = formData.get("subdomain") as string;
  const userId = formData.get("userId") as string;
  const domainName = formData.get("blogTitle") as string;
  const description = formData.get("blogDescription") as string;
  const language = formData.get("mainLanguage") as Domain["language"];
  const image = formData.get("ogImage") as File | null;

  const imageLink = "https://www.example.com/image.jpg";

  const domain = new Domain({ domainName, domainLocation, description, userId, language, image: imageLink });

  await new CreateDomainUseCase(new DomainServerRepository(), new AuthServerRepository()).execute(domain);

  redirect(await getLinkHref({ subDomain: `${domainLocation}`, href: "/" }));
}

export async function isDomainAddressAlreadyRegistered(domainAddress: string) {
  const flag = await new GetDomainUseCase(new DomainServerRepository()).getDomainByDomainAddress(domainAddress);

  return flag;
}
