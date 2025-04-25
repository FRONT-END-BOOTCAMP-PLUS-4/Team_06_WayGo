// EditUserUsecase.ts
import { UserRepository } from "domain/repositories/UserRepository";
import { EditUserDto } from "./dto/EditUserDto"; // DTO 정의
import { UpdatedUser } from "domain/entities/UpdatedUser"; // Import the 'UpdatedUser' type

export class EditUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, editDto: EditUserDto): Promise<UpdatedUser> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("유저를 찾을 수 없습니다.");
    }

    if (editDto.nickname !== undefined) {
      user.nickname = editDto.nickname;
    }
    if (editDto.profileImage !== undefined) {
      user.profileImage = editDto.profileImage;
    }

    const updatedUser = await this.userRepository.update(user);
    return updatedUser;
  }
}
