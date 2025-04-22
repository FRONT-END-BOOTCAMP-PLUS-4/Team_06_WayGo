export interface CreatePlanDto {
  title: string;
  schedule: string;
  details: string;
  travelTips: string;
  durationId: number;
  locationId: number;
  budgetId: number;
  seasonId: number;
  userId: string;
}
