export class Plan {
  constructor(
    public title: string,
    public schedule: string,
    public details: string,
    public travelTips: string,
    public userId: string,
    public duration: string,
    public location: string,
    public budget: string,
    public season: string,
    public id?: number,
    public imgUrl?: string,
    public createdAt?: string,
    public updatedAt?: string,
    public deletedAt?: string
  ) {}
}
