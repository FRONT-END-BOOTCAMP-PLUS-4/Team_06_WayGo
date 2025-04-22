import { ImageRepository } from "domain/repositories/ImageRepository";
import { UploadImageDto } from "./dto/UploadImageDto";
import { UploadedImageResponseDto } from "./dto/UploadedImageResponseDto";

export class UploadImageUsecase {
  constructor(private readonly imageRepository: ImageRepository) {}

  async execute(dto: UploadImageDto): Promise<UploadedImageResponseDto> {
    try {
      const imageEntity = await this.imageRepository.uploadImage(
        dto.bucket,
        `uploads/${new Date().toISOString()}/${dto.fileName}`,
        dto.fileContent
      );

      return {
        imgUrl: imageEntity.imgUrl,
        bucket: imageEntity.bucket,
        path: imageEntity.path,
      };
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }
}
