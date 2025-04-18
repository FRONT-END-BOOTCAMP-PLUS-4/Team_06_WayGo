// plan-img.entity.ts
export interface PlanImgEntity {
  id: number;
  planId: number; // 여행 계획 ID (foreign key)
  imgUrl: string; // 이미지 URL
  isDefault: boolean; // 대표 이미지 여부
}
