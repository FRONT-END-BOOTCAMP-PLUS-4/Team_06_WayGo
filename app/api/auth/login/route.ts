// 유저 로그인 조회 api 요청을 처리하는 라우트

import { LoggedInDto } from "application/usecases/auth/dto/LoggedInDto";
import { LoginUsecase } from "application/usecases/auth/LoginUsecase";
import { SbUserRepository } from "infra/repositories/supabase/SbUserRepository";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

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

    return NextResponse.json(loggedInDto, { status: 200 });
  } catch (error) {
    console.error("로그인 실패: ", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
