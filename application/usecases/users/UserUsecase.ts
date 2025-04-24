import { UserRepository } from "domain/repositories/UserRepository";
import { UserDto } from "./dto/UserDto";

export class UserUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("유저를 찾을 수 없습니다.");
    }

    // ✅ id, createdAt이 없으면 에러 던지기
    if (!user.id || !user.createdAt) {
      throw new Error("유저 데이터가 올바르지 않습니다. (id, createdAt 없음)");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      profileImage: user.profileImage ?? null,
      userType: user.userType,
      createdAt: user.createdAt.toISOString(),
      deletedAt: user.deletedAt ? user.deletedAt.toISOString() : null,
    };
  }
}
