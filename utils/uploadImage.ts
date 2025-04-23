// 이미지 업로드 함수 정의
const uploadImage = async (file: File, bucketName: string) => {
  try {
    // 파일 확장자 추출
    const fileExt = file.name.split(".").pop()?.toLowerCase();

    // 파일명 생성 (타임스탬프 + 랜덤문자열)
    const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    const safeFileName = `${uniqueId}.${fileExt}`;

    // formData 에 버킷 이름과 파일명, 그리고 실제 파일 추가
    const formData = new FormData();
    formData.append("bucket", bucketName);
    formData.append("fileName", safeFileName);
    formData.append("fileContent", file);

    // 파일 업로드 API 호출
    const response = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    // response.ok 가 없는 경우 에러 출력
    if (!response.ok) {
      throw new Error("이미지 업로드 실패");
    }

    // 정상 업로드된 후, response 데이터 내의 imgUrl만 반환
    const result = await response.json();
    return result.data.imgUrl;
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("이미지 업로드 중 오류가 발생했습니다.");
  }
};

export default uploadImage;
