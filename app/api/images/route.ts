import { NextRequest, NextResponse } from "next/server";
import { SbImageRepository } from "infra/repositories/supabase/SbImageRepository";
import { UploadImageUsecase } from "application/usecases/image/UploadImageUsecase";
import { UploadImageDto } from "application/usecases/image/dto/UploadImageDto";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { bucket, fileName, fileContent } = await req.json();

    if (!["plan-images", "profile-images"].includes(bucket)) {
      throw new Error(`Invalid bucket name: ${bucket}`);
    }

    const imageRepository = new SbImageRepository();
    const uploadImageUsecase = new UploadImageUsecase(imageRepository);

    const uploadImageDto: UploadImageDto = {
      bucket,
      fileName,
      fileContent: Buffer.from(fileContent, "base64"), // Base64 디코딩
    };

    const response = await uploadImageUsecase.execute(uploadImageDto);

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
