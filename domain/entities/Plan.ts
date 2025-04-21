export class Plan {
  constructor(
    public id?: number,
    public title: string,
    schedule: string,
    details: string,
    travelTips: string,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,
    userId: string,
    durationId: number,
    locationId: number,
    budgetId: number,
    seasonId: number
  ) {}
}
