// application/usecases/users/EditUserUsecase.ts
import { UserRepository } from "domain/repositories/UserRepository";
import { EditUserDto } from "./dto/EditUserDto";

export class EditUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, editDto: EditUserDto): Promise<void> {
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
    if (editDto.email !== undefined) {
      user.email = editDto.email;
    }

    if (editDto.name !== undefined) {
      user.name = editDto.name;
    }

    await this.userRepository.update(user);
  }
}
