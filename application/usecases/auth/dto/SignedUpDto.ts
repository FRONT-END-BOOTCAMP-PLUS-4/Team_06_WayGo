// 회원가입 후 반환되는 데이터

export interface SignedUpDto {
  id: number;
  name: string;
  email: string;
  password: string;
  nickname: string;
  userType: string;
  profileImage?: string | null;
  createdAt: Date;
  deletedAt?: Date | null;
}
