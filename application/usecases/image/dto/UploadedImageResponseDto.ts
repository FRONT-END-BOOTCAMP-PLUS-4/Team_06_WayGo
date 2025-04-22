export interface UploadedImageResponseDto {
  imgUrl: string; // 업로드된 이미지의 공개 URL
  bucket: string; // 이미지가 저장된 버킷 이름
  path: string; // 이미지가 저장된 경로
}
