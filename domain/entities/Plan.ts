export class Plan {
  constructor(
    public id: number,
    public title: string,
    schedule: string,
    details: string,
    travel_tips: string,
    created_at: string,
    updated_at?: string,
    deleted_at?: string,
    user_id: number,
    duration_id: number,
    location_id: number,
    budget_id: number,
    season_id: number
  ) {}
}
