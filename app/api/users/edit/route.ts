import { NextResponse } from "next/server";

import { SbUserRepository } from "infra/repositories/supabase/SbUserRepository";
import { EditUserUsecase } from "application/usecases/users/EditUserUsecase";
import { EditUserDto } from "application/usecases/users/dto/EditUserDto";

export async function PATCH(req: Request) {
  try {
    const userRepo = new SbUserRepository(); // ✅ Repository에 주입
    const editUserUsecase = new EditUserUsecase(userRepo); // ✅ Usecase 연결

    const body = await req.json();
    const { id, name, email, nickname, profileImage } = body;

    if (!id) {
      return NextResponse.json(
        { message: "사용자 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const editDto: EditUserDto = {
      name,
      email,
      nickname,
      profileImage,
    };

    await editUserUsecase.execute(id, editDto);

    return NextResponse.json(
      { message: "유저 정보가 성공적으로 수정되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("유저 정보 수정 실패:", error);
    return NextResponse.json(
      { message: "유저 정보 수정에 실패했습니다." },
      { status: 500 }
    );
  }
}
