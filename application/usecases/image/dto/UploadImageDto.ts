export interface UploadImageDto {
  bucket: string; // 업로드할 버킷 이름 (예: "plan-images" 또는 "profile-images")
  fileName: string; // 업로드할 파일 이름
  fileContent: Buffer; // 파일 내용 (Buffer 형태)
}
