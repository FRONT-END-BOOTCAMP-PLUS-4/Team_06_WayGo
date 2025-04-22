import { ImageRepository } from "domain/repositories/ImageRepository";
import { ImageEntity } from "domain/entities/Image";
import { createClient } from "utils/supabase/server";

export class SbImageRepository implements ImageRepository {
  async uploadImage(
    bucket: string,
    path: string,
    fileContent: Buffer
  ): Promise<ImageEntity> {
    // supabase 클라이언트 생성
    const supabase = await createClient();

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, fileContent);

    if (error) {
      throw new Error(
        `Failed to upload image to bucket "${bucket}": ${error.message}`
      );
    }

    const imgUrl = supabase.storage.from(bucket).getPublicUrl(path)
      .data.publicUrl;

    return new ImageEntity(bucket, path, imgUrl);
  }
}
