import { ImageEntity } from "domain/entities/Image";

export interface ImageRepository {
  uploadImage(
    bucket: string,
    path: string,
    fileContent: Buffer
  ): Promise<ImageEntity>;
}
