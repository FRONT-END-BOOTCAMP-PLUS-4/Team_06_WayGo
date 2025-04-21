// 유저 회원가입 api 요청을 처리하는 라우트
import { NextResponse } from "next/server";
import { SignUpDto } from "../../../../application/usecases/auth/dto/SignUpDto";
import { SignedUpDto } from "../../../../application/usecases/auth/dto/SignedUpDto";
import { SignUpUsecase } from "../../../../application/usecases/auth/SignUpUsecase";
import { SbUserRepository } from "../../../../infra/repositories/supabase/SbUserRepository";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const signUpDto: SignUpDto = {
      name: body.name,
      email: body.email,
      nickname: body.nickname,
      password: body.password,
    };

    const signUpUsecase = new SignUpUsecase(new SbUserRepository());

    const signedUpDto: SignedUpDto = await signUpUsecase.execute(signUpDto);

    return NextResponse.json(
      { message: "회원가입 성공", data: signedUpDto },
      { status: 201 }
    );
  } catch (error) {
    console.error("회원가입 실패", error);
    return NextResponse.json({ message: "회원가입 실패" }, { status: 500 });
  }
}
