// /api/users/route.ts
import { NextResponse } from "next/server";
import { SbUserRepository } from "infra/repositories/supabase/SbUserRepository";
import { UserUsecase } from "application/usecases/users/UserUsecase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "userId가 없습니다." },
        { status: 400 }
      );
    }

    const userRepository = new SbUserRepository();
    const userUsecase = new UserUsecase(userRepository);

    const userDto = await userUsecase.execute(userId);

    return NextResponse.json(userDto, { status: 200 });
  } catch (error) {
    console.error("유저 조회 실패:", error);
    return NextResponse.json({ message: "유저 조회 실패" }, { status: 500 });
  }
}
