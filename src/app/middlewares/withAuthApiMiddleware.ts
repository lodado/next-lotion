import { SERVER_DI_REPOSITORY } from "@/DI/index.server";
 
import { NextRequest, NextResponse } from "next/server";
import { GetUserInfoUseCase } from "@/entities/Auth/core/usecase/GetUserInfoUseCase";

export const withAuthApiMiddleware = async (request: NextRequest, path: string, defaultLocale: string) => {
  const user = await new GetUserInfoUseCase(new SERVER_DI_REPOSITORY.Auth()).execute();
  const response = NextResponse.next();

  // private page
  if (!user && /\/protected/.test(path)) {
    return NextResponse.json({ message: "Login required." }, { status: 401 });
  }

  return response;
};
