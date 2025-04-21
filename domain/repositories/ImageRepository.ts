import { ImageEntity } from "domain/entities/ImageEntity";

export interface ImageRepository {
  uploadImage(
    bucket: string,
    path: string,
    fileContent: Buffer
  ): Promise<ImageEntity>;
}
