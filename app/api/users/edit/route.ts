import { NextResponse } from "next/server";

import { SbUserRepository } from "infra/repositories/supabase/SbUserRepository";
import { EditUserUsecase } from "application/usecases/users/EditUserUsecase";
import { EditUserDto } from "application/usecases/users/dto/EditUserDto";

export async function PATCH(req: Request) {
  try {
    const userRepo = new SbUserRepository();
    const editUserUsecase = new EditUserUsecase(userRepo);

    const body = await req.json();
    const { id, nickname, profileImage } = body;

    if (!id) {
      return NextResponse.json(
        { message: "사용자 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const editDto: EditUserDto = { nickname, profileImage };

    const updatedUser = await editUserUsecase.execute(id, editDto);

    return NextResponse.json(
      {
        success: true,
        message: "유저 정보가 성공적으로 수정되었습니다.",
        user: updatedUser,
      },
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
