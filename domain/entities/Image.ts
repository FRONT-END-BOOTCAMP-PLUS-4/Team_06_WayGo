export class ImageEntity {
  constructor(
    public bucket: string, // Supabase 버킷 이름
    public path: string, // 이미지 경로
    public imgUrl: string // 공개 URL
  ) {}
}
