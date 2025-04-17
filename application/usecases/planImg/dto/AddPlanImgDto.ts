export interface PlanImgDto {
  imgUrl: string; // Supabase Storage에 업로드된 이미지 URL
  isDefault: boolean; // 대표 이미지 여부
  planId: number; // 연결할 plan의 ID (CreateTravelPlan 이후 받은 값)
}
