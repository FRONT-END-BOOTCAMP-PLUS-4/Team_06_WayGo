export interface PlanDetailDto {
  id: number;
  title: string;
  schedule: string;
  details: string;
  travelTips: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  user: {
    id: string;
    nickname: string;
    profileImage?: string | null;
  };

  duration: {
    id: number;
    content: string;
  };

  location: {
    id: number;
    content: string;
  };

  budget: {
    id: number;
    content: string;
  };

  season: {
    id: number;
    content: string;
  };

  images: {
    id: number;
    imgUrl: string;
    isDefault: boolean;
  }[];
}
