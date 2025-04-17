export interface EditPlanDto {
  id: number; // 수정할 여행 계획 ID

  // 수정 가능한 필드들 (옵셔널 처리)
  title?: string;
  schedule?: string;
  details?: string;
  travelTips?: string;
  durationId?: number;
  locationId?: number;
  budgetId?: number;
  seasonId?: number;
}
