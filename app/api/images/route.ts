import { NextRequest, NextResponse } from "next/server";
import { SbImageRepository } from "infra/repositories/supabase/SbImageRepository";
import { UploadImageUsecase } from "application/usecases/image/UploadImageUsecase";
import { UploadImageDto } from "application/usecases/image/dto/UploadImageDto";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // FormData 처리
    const formData = await req.formData();
    const bucket = (formData.get("bucket") as string)?.trim();
    const fileName = formData.get("fileName") as string;
    const file = formData.get("fileContent") as File;

    // 유효성 검사
    if (!bucket || !fileName || !file) {
      return NextResponse.json(
        { success: false, message: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    if (!["plan-images", "profile-images"].includes(bucket)) {
      throw new Error(`Invalid bucket name: ${bucket}`);
    }

    // 파일 내용을 Buffer로 변환
    const fileContent = Buffer.from(await file.arrayBuffer());

    // 의존성 주입
    const imageRepository = new SbImageRepository();
    const uploadImageUsecase = new UploadImageUsecase(imageRepository);

    // DTO 생성
    const uploadImageDto: UploadImageDto = {
      bucket,
      fileName,
      fileContent,
    };

    // 이미지 업로드 실행
    const response = await uploadImageUsecase.execute(uploadImageDto);

    // 성공 응답 반환
    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    // 에러 응답 반환
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
