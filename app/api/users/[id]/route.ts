// 유저 정보 조회 api 요청을 처리하는 라우트

import { NextResponse } from "next/server";
import { SbUserRepository } from "infra/repositories/supabase/SbUserRepository";
import { UserUsecase } from "application/usecases/users/UserUsecase";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id; // ✅ URL 파라미터로 id 가져옴

    const userRepository = new SbUserRepository(); // ✅ Supabase 연결된 레포
    const userUsecase = new UserUsecase(userRepository); // ✅ 유즈케이스 준비

    const userDto = await userUsecase.execute(userId); // ✅ 유즈케이스 실행

    return NextResponse.json(userDto, { status: 200 }); // 성공 응답
  } catch (error) {
    console.error("유저 조회 실패:", error);
    return NextResponse.json({ message: "유저 조회 실패" }, { status: 500 });
  }
}
