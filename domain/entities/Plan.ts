export class Plan {
  constructor(
    public title: string,
    public schedule: string,
    public details: string,
    public travelTips: string,
    public userId: number,
    public duration: string,
    public location: string,
    public budget: string,
    public season: string,
    public id?: number,
    public createdAt?: string,
    public updatedAt?: string,
    public deletedAt?: string
  ) {}
}
