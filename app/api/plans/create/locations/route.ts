import { NextResponse } from "next/server";
import { SbLocationRepository } from "infra/repositories/supabase/SbLocationRepository";
import { LocationListUsecase } from "application/usecases/location/LocationListUsecase";

// ✅ GET /api/locations
export async function GET() {
  try {
    const locationRepository = new SbLocationRepository(); // Supabase 연결된 레포지토리
    const locationListUsecase = new LocationListUsecase(locationRepository); // Usecase 준비

    const locations = await locationListUsecase.execute(); // 유즈케이스 실행해서 위치 목록 받아오기

    return NextResponse.json(locations, { status: 200 }); // 성공 응답
  } catch (error) {
    console.error("위치 목록 조회 실패:", error);
    return NextResponse.json(
      { message: "위치 목록 조회 실패" },
      { status: 500 }
    ); // 에러 응답
  }
}
