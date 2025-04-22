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

    return NextResponse.json(loggedInDto, { status: 200 });
  } catch (error) {
    console.error("로그인 실패: ", error);

    // 에러 메시지를 클라이언트에 전달
    const errorMessage =
      error instanceof Error ? error.message : "서버 오류가 발생했습니다.";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
