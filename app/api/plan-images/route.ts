import { NextRequest, NextResponse } from "next/server";
import { SbPlanImgRepository } from "infra/repositories/supabase/SbPlanImgRepository";
import { createClient } from "utils/supabase/server";
import { AddPlanImgDto } from "application/usecases/planImg/dto/AddPlanImgDto";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { images } = await req.json();

    // 요청 데이터 유효성 검사
    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "이미지 데이터가 올바르지 않습니다.",
        },
        { status: 400 }
      );
    }

    // Supabase 클라이언트 생성
    const supabase = await createClient();
    const planImgRepository = new SbPlanImgRepository(supabase);

    // 각 이미지에 대해 AddPlanImgDto 생성 및 유효성 검사
    const planImgDtos: AddPlanImgDto[] = images.map((image) => {
      if (
        !image.imgUrl ||
        typeof image.isDefault !== "boolean" ||
        !image.planId
      ) {
        throw new Error("잘못된 이미지 데이터 형식입니다.");
      }
      return {
        imgUrl: image.imgUrl,
        isDefault: image.isDefault,
        planId: image.planId,
      };
    });

    // 이미지 데이터 저장
    await Promise.all(
      planImgDtos.map((imgDto) => planImgRepository.addPlanImg(imgDto))
    );

    return NextResponse.json({
      success: true,
      message: "이미지 정보가 성공적으로 저장되었습니다.",
    });
  } catch (error) {
    console.error("Error saving plan images:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "이미지 정보 저장 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
