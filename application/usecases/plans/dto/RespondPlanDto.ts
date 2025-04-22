export interface RespondPlanDto {
  id: number; // 여행 계획 ID
  title: string; // 여행 계획 제목
  schedule: string; // 일정
  details: string; // 세부 정보
  travelTips: string; // 여행 팁
  createdAt: string; // 생성 시간
  updatedAt?: string; // 수정 시간 (옵셔널)
  deletedAt?: string; // 삭제 시간 (옵셔널)
  userId: string; // 작성자 ID
  duration: string; // 여행 기간 (duration 테이블의 content)
  location: string; // 여행 위치 (location 테이블의 content)
  budget: string; // 예산 (budget 테이블의 content)
  season: string; // 계절 (season 테이블의 content)
  images: {
    id: number; // 이미지 ID
    imgUrl: string; // 이미지 URL
    isDefault: boolean; // 대표 이미지 여부
  }[]; // 여행 계획에 연결된 이미지 목록
}
