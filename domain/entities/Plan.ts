export class Plan {
  constructor(
    public title: string,
    public schedule: string,
    public details: string,
    public travelTips: string,
    public userId: string,
    public durationId: number,
    public locationId: number,
    public budgetId: number,
    public seasonId: number,
    public id?: number,
    public createdAt?: string,
    public updatedAt?: string,
    public deletedAt?: string
  ) {}
}
