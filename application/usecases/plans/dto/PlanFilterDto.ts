export interface PlanFilterDto {
  keyword?: string;
  budgetId?: number;
  locationId?: number;
  seasonId?: number;
  durationId?: number;
  page?: number;
  limit?: number; // Added the missing 'limit' property
}
