// 로그인 요청을 처리하는 유스케이스

import { UserRepository } from "domain/repositories/UserRepository";
import { LoginDto } from "./dto/LoginDto";
import { LoggedInDto } from "./dto/LoggedInDto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class LoginUsecase {
  constructor(private repository: UserRepository) {}

  async execute(loginDto: LoginDto): Promise<LoggedInDto> {
    const { email, password } = loginDto;

    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error("존재하지 않는 계정입니다.");
    }

    const isValidPw = await bcrypt.compare(password, user.password);

    if (!isValidPw) {
      throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }

    const payload = {
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return { token } as LoggedInDto;
  }
}
