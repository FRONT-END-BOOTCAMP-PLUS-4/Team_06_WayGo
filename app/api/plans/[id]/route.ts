import { NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { SbPlanRepository } from "infra/repositories/supabase/SbPlanRepository";
import { PlanDetailUsecase } from "application/usecases/plans/PlanDetailUsecase";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // 유효한 id 체크
    const planId = parseInt(params.id);
    if (isNaN(planId)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 ID입니다." },
        { status: 400 }
      );
    }

    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // Repository 및 Usecase 인스턴스 생성
    const planRepository = new SbPlanRepository(supabase);
    const planDetailUsecase = new PlanDetailUsecase(planRepository);

    // 여행 계획 상세 조회
    const planDetail = await planDetailUsecase.execute(planId);

    if (!planDetail) {
      return NextResponse.json(
        { success: false, message: "여행 계획을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 성공 응답 반환
    return NextResponse.json({
      success: true,
      data: planDetail,
    });
  } catch (error) {
    console.error("Error fetching plan details:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "서버 에러가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
