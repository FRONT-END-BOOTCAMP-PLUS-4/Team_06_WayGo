import { NextResponse } from "next/server";
import { SbPlanRepository } from "infra/repositories/supabase/SbPlanRepository";
import { SbPlanImgRepository } from "infra/repositories/supabase/SbPlanImgRepository";
import { SbCommentRepository } from "infra/repositories/supabase/SbCommentRepository"; // ✅ 추가
import { GetPlanCardsUsecase } from "application/usecases/plans/GetPlanCardsUsecase";
import { createClient } from "utils/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const planIdsParam = searchParams.get("planIds");
    const userId = searchParams.get("userId"); // ✅ 추가

    if (!planIdsParam || !userId) {
      return NextResponse.json(
        { message: "planIds 또는 userId가 없습니다." },
        { status: 400 }
      );
    }

    const planIds = planIdsParam.split(",").map((id) => Number(id));

    const supabase = await createClient();
    const planRepo = new SbPlanRepository(supabase);
    const planImgRepo = new SbPlanImgRepository(supabase);
    const commentRepo = new SbCommentRepository(); // ✅ 주입

    const usecase = new GetPlanCardsUsecase(planRepo, planImgRepo, commentRepo); // ✅ 3개 주입
    const planCards = await usecase.execute(planIds, userId); // ✅ userId 함께 전달

    return NextResponse.json(planCards, { status: 200 });
  } catch (error) {
    console.error("플랜 카드 조회 실패:", error);
    return NextResponse.json(
      { message: "플랜 카드 조회 실패" },
      { status: 500 }
    );
  }
}
