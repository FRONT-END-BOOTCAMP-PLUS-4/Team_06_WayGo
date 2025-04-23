// 유저 로그인 조회 api 요청을 처리하는 라우트
import { LoggedInDto } from "application/usecases/auth/dto/LoggedInDto";
import { LoginUsecase } from "application/usecases/auth/LoginUsecase";
import { SbUserRepository } from "infra/repositories/supabase/SbUserRepository";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  nickname: string;
  profileImage?: string;
  createdAt?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "이메일과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const loginUsecase = new LoginUsecase(new SbUserRepository());

    const loggedInDto: LoggedInDto = await loginUsecase.execute({
      email,
      password,
    });

    const tokenPayload = jwt.decode(loggedInDto.token) as JwtPayload;

    const response = NextResponse.json(loggedInDto, { status: 200 });

    const memberData = {
      id: tokenPayload?.id || null,
      email: tokenPayload?.email || null,
      name: tokenPayload?.name || null,
      nickname: tokenPayload?.nickname || null,
      profileImage: tokenPayload?.profileImage || null,
      createdAt: tokenPayload?.createdAt || null,
    };

    // 개발 환경과 프로덕션 환경에 따라 secure 옵션 설정
    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set(
      "auth-storage",
      JSON.stringify({
        member: memberData,
        token: loggedInDto.token,
      }),
      {
        path: "/",
        sameSite: "strict",
        // 보안이슈 : 프로덕션 환경에서만 secure: true 설정
        secure: isProduction,
      }
    );

    return response;
  } catch (error) {
    console.error("로그인 실패: ", error);

    const errorMessage =
      error instanceof Error ? error.message : "서버 오류가 발생했습니다.";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
