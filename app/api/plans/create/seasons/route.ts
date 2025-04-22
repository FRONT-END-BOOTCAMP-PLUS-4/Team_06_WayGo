import { NextResponse } from "next/server";
import { SbSeasonRepository } from "infra/repositories/supabase/SbSeasonRepository";
import { SeasonListUsecase } from "application/usecases/season/SeasonListUsecase";

// ✅ GET /api/seasons
export async function GET() {
  try {
    const seasonRepository = new SbSeasonRepository(); // Supabase 연결된 레포지토리
    const seasonListUsecase = new SeasonListUsecase(seasonRepository); // Usecase 준비

    const seasons = await seasonListUsecase.execute(); // 유즈케이스 실행해서 계절 목록 받아오기

    return NextResponse.json(seasons, { status: 200 }); // 성공 응답
  } catch (error) {
    console.error("계절 목록 조회 실패:", error);
    return NextResponse.json(
      { message: "계절 목록 조회 실패" },
      { status: 500 }
    ); // 에러 응답
  }
}
