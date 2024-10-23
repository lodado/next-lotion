// import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

import { AuthPort } from "./Port/index.server";
import AuthService from "./service/AuthService";

const { signIn, authorized, jwt, session } = AuthService;

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const authConfig = {
  debug: true,
  adapter: AuthPort,

  pages: {
    signIn: "/login",
  },
  callbacks: { signIn, jwt, session },

  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",

        path: "/",

        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT ? `.${process.env.NEXT_PUBLIC_CLIENT_URL}` : undefined,
        secure: process.env.NODE_ENV == "production",
      },
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 5 * 24 * 60 * 60, // cookie 수명 - 5일
  },

  jwt: {
    encryption: true,
    secret: process.env.AUTH_SECRET, // 환경 변수나 다른 방법으로 안전하게 키 관리
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    NaverProvider({
      clientId: process.env.NAVER_ID!,
      clientSecret: process.env.NAVER_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID!,
      clientSecret: process.env.KAKAO_SECRET!,
    }),

    /** FIXME
     * 자체 로그인 필요시 사용, 현재는 쓰지 않음
    
    Credentials({
      async authorize(credentials) {
        const { getUser } = AuthPort;

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;
          // const passwordsMatch = await bcrypt.compare(password, user.password)
          const passwordsMatch = password === user.password;

          if (passwordsMatch) return user;
        }

        console.log(parsedCredentials, "Invalid credentials");
        return null;
      },
    }),
     * */
  ],
} as any;
