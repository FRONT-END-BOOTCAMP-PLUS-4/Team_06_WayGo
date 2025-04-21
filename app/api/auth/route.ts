// 유저 api 요청을 처리하는 라우트

import { SbUserRepository } from "infra/repositories/supabase/SbUserRepository";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const field = url.searchParams.get("field");
    const value = url.searchParams.get("value");

    if (!field || !value) {
      return NextResponse.json(
        { message: "이메일과 닉네임을 입력해주세요." },
        { status: 400 }
      );
    }

    if (field !== "email" && field !== "nickname") {
      return NextResponse.json(
        { message: "유효하지 않은 필드입니다." },
        { status: 400 }
      );
    }

    const userRepository = new SbUserRepository();
    const isDuplicate = await userRepository.checkDuplicate(
      field as "email" | "nickname",
      value
    );

    if (isDuplicate) {
      return NextResponse.json({
        available: false,
        message: `이미 사용 중인 ${field === "email" ? "이메일" : "닉네임"}입니다.`,
      });
    }
    return NextResponse.json({
      available: true,
      message: `사용 가능한 ${field === "email" ? "이메일" : "닉네임"}입니다.`,
    });
  } catch (error) {
    console.error("중복 확인 실패: ", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
