// 회원가입 중복체크 api 요청을 처리하는 라우트

import { SbUserRepository } from "infra/repositories/supabase/SbUserRepository";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    const { type } = params;
    const url = new URL(request.url);
    const value = url.searchParams.get("value");

    console.log(`중복 확인 요청 - 타입: ${type}, 값: ${value}`);

    if (!value) {
      return NextResponse.json(
        { message: "값을 입력해주세요." },
        { status: 400 }
      );
    }

    if (type !== "email" && type !== "nickname") {
      return NextResponse.json(
        { message: "유효하지 않은 타입입니다." },
        { status: 400 }
      );
    }

    const userRepository = new SbUserRepository();
    const isDuplicate = await userRepository.checkDuplicate(
      type as "email" | "nickname",
      value
    );

    console.log(`중복 확인 결과: ${isDuplicate ? "중복" : "사용 가능"}`);

    if (isDuplicate) {
      return NextResponse.json({
        available: false,
        message: `이미 사용 중인 ${type === "email" ? "이메일" : "닉네임"}입니다.`,
      });
    }

    return NextResponse.json({
      available: true,
      message: `사용 가능한 ${type === "email" ? "이메일" : "닉네임"}입니다.`,
    });
  } catch (error) {
    console.error("중복 확인 실패: ", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
