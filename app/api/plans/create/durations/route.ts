import { NextResponse } from "next/server";
import { SbDurationRepository } from "infra/repositories/supabase/SbDurationRepository";
import { DurationListUsecase } from "application/usecases/duration/DurationListUsecase";

// ✅ GET /api/durations
export async function GET() {
  try {
    const durationRepository = new SbDurationRepository(); // Supabase 연결된 레포지토리
    const durationListUsecase = new DurationListUsecase(durationRepository); // Usecase 준비

    const durations = await durationListUsecase.execute(); // 유즈케이스 실행해서 기간 목록 받아오기

    return NextResponse.json(durations, { status: 200 }); // 성공 응답
  } catch (error) {
    console.error("기간 목록 조회 실패:", error);
    return NextResponse.json(
      { message: "기간 목록 조회 실패" },
      { status: 500 }
    ); // 에러 응답
  }
}
