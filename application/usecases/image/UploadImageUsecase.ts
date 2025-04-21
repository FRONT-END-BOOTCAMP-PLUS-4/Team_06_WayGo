import { ImageRepository } from "domain/repositories/ImageRepository";
import { UploadImageDto } from "./dto/UploadImageDto";
import { UploadedImageResponseDto } from "./dto/UploadedImageResponseDto";

export class UploadImageUsecase {
  constructor(private readonly imageRepository: ImageRepository) {}

  async execute(dto: UploadImageDto): Promise<UploadedImageResponseDto> {
    const path = `uploads/${new Date().toISOString()}/${dto.fileName}`; // 파일 경로

    const imageEntity = await this.imageRepository.uploadImage(
      dto.bucket,
      path,
      dto.fileContent
    );

    return {
      imgUrl: imageEntity.imgUrl,
      bucket: imageEntity.bucket,
      path: imageEntity.path,
    };
  }
}
