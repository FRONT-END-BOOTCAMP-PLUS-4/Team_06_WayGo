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
    public deletedAt?: string | null,
    public user?: {
      id: string;
      nickname: string;
      profileImage?: string | null;
    },
    public duration?: {
      id: number;
      content: string;
    },
    public location?: {
      id: number;
      content: string;
    },
    public budget?: {
      id: number;
      content: string;
    },
    public season?: {
      id: number;
      content: string;
    },
    public images?: {
      id: number;
      imgUrl: string;
      isDefault: boolean;
    }[]
  ) {}
}
