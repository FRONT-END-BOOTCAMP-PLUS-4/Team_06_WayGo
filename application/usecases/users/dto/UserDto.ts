// application/usecases/users/dto/UserDto.ts
export interface UserDto {
  id: string;
  email: string;
  name: string;
  nickname: string;
  profileImage: string | null;
  userType: string;
  createdAt: string; // ✅ ISOString 변환된 string
  deletedAt: string | null;
}
