import { NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { SbPlanRepository } from "infra/repositories/supabase/SbPlanRepository";
import { SbPlanImgRepository } from "infra/repositories/supabase/SbPlanImgRepository";
import { PlanListUsecase } from "application/usecases/plans/PlanListUsecase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "사용자 ID가 필요합니다." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const planRepository = new SbPlanRepository(supabase);
  const planImgRepository = new SbPlanImgRepository(supabase);
  const planListUsecase = new PlanListUsecase(
    planRepository,
    planImgRepository
  );

  try {
    const plans = await planListUsecase.findAllByUserId(userId);
    return NextResponse.json(plans, { status: 200 });
  } catch (error) {
    console.error("사용자별 플랜 조회 실패:", error);
    return NextResponse.json(
      { error: "사용자별 플랜 조회 실패" },
      { status: 500 }
    );
  }
}
