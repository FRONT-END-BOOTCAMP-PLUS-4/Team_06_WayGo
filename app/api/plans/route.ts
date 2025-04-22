import { NextRequest, NextResponse } from "next/server";
import { SbPlanRepository } from "infra/repositories/supabase/SbPlanRepository";
import { SbPlanImgRepository } from "infra/repositories/supabase/SbPlanImgRepository";
import { CreatePlanUsecase } from "application/usecases/plans/CreatePlanUsecase";
import { CreatePlanDto } from "application/usecases/plans/dto/CreatePlanDto";
import { AddPlanImgDto } from "application/usecases/planImg/dto/AddPlanImgDto";
import { createClient } from "utils/supabase/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // 요청 본문에서 데이터 추출
    const body = await req.json();
    const {
      title,
      schedule,
      details,
      travelTips,
      durationId,
      locationId,
      budgetId,
      seasonId,
      images = [],
      userId,
    } = body;

    // 요청 데이터 유효성 검사
    if (!title || !schedule || !details || !userId) {
      return NextResponse.json(
        { success: false, message: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    // CreatePlanDto 생성
    const createPlanDto: CreatePlanDto = {
      title,
      schedule,
      details,
      travelTips,
      durationId,
      locationId,
      budgetId,
      seasonId,
      userId,
    };

    // AddPlanImgDto 배열 생성
    const addPlanImgDtos: AddPlanImgDto[] = images.map((image: any) => ({
      imgUrl: image.imgUrl,
      isDefault: image.isDefault,
      planId: 0, // planId는 여행 계획 생성 후 할당됨
    }));

    // Supabase 클라이언트 생성
    const supabase = await createClient(); // 비동기 호출

    // 의존성 주입
    const planRepository = new SbPlanRepository(supabase);
    const planImgRepository = new SbPlanImgRepository(supabase);
    const createPlanUsecase = new CreatePlanUsecase(
      planRepository,
      planImgRepository
    );

    // 여행 계획 생성
    const createdPlan = await createPlanUsecase.execute(
      createPlanDto,
      addPlanImgDtos
    );

    // 성공 응답 반환
    return NextResponse.json({
      success: true,
      data: createdPlan,
    });
  } catch (error: any) {
    // 에러 응답 반환
    return NextResponse.json(
      {
        success: false,
        message: error.message || "서버 에러가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
