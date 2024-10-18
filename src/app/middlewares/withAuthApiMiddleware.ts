import { NextRequest, NextResponse } from "next/server";
 
import { AuthServerRepository } from "@/entities/index.server";
import { GetUserInfoUseCase } from "@/entities/Auth/core/usecase/GetUserInfoUseCase";

export const withAuthApiMiddleware = async (request: NextRequest, path: string, defaultLocale: string) => {
  const user = await new GetUserInfoUseCase(new AuthServerRepository()).execute();
  const response = NextResponse.next();

  // private page
  if (!user && /\/protected/.test(path)) {
    return NextResponse.json({ message: "Login required." }, { status: 401 });
  }

  return response;
};
