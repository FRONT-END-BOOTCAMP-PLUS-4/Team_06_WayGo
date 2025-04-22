// 유저 로그인 조회 api 요청을 처리하는 라우트

import { LoggedInDto } from "application/usecases/auth/dto/LoggedInDto";
import { LoginUsecase } from "application/usecases/auth/LoginUsecase";
import { SbUserRepository } from "infra/repositories/supabase/SbUserRepository";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log("로그인 요청 수신:", {
      email,
      passwordLength: password?.length,
    });

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

    console.log("로그인 성공:", email);

    // 응답 객체 생성
    const response = NextResponse.json(loggedInDto, { status: 200 });

    // 쿠키에 인증 정보 저장 (미들웨어에서 접근하기 위함)
    response.cookies.set(
      "auth-storage",
      JSON.stringify({ state: { token: loggedInDto.token } }),
      {
        path: "/",
        sameSite: "strict",
        // 보안을 위해 production 환경에서는 secure: true 추가 권장
      }
    );

    return response;
  } catch (error) {
    console.error("로그인 실패: ", error);

    // 에러 메시지를 클라이언트에 전달
    const errorMessage =
      error instanceof Error ? error.message : "서버 오류가 발생했습니다.";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
