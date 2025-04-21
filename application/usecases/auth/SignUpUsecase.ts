// 회원가입 요청을 처리하는 유스케이스
import { UserRepository } from "domain/repositories/UserRepository";
import { SignUpDto } from "./dto/SignUpDto";
import { SignedUpDto } from "./dto/SignedUpDto";
import { User } from "domain/entities/User";
import bcrypt from "bcryptjs";

export class SignUpUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userDto: SignUpDto): Promise<SignedUpDto> {
    const { name, email, nickname, password } = userDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = {
      name: name,
      email: email,
      nickname: nickname,
      password: hashedPassword,
      userType: "member",
    };

    const newUser = await this.userRepository.save(user);

    return { ...newUser } as SignedUpDto;
  }
}
