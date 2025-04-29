export class Plan {
  constructor(
    public title: string,
    public schedule: string,
    public details: string,
    public travelTips: string,
    public userId: string,
    public durationId: number, // 필수 필드 추가
    public locationId: number, // 필수 필드 추가
    public budgetId: number, // 필수 필드 추가
    public seasonId: number, // 필수 필드 추가
    public id?: number,
    public createdAt?: string,
    public updatedAt?: string,
    public deletedAt?: string | null,
    public commentsCount?: number, // 댓글 수 필드 추가
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
