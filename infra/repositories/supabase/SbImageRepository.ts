import { ImageRepository } from "domain/repositories/ImageRepository";
import { ImageEntity } from "domain/entities/Image";
import { createClient } from "utils/supabase/server";

export class SbImageRepository implements ImageRepository {
  // private supabase;

  // constructor() {
  //   this.supabase = createClient(); // Supabase 클라이언트 생성
  // }

  async uploadImage(
    bucket: string,
    path: string,
    fileContent: Buffer
  ): Promise<ImageEntity> {
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
