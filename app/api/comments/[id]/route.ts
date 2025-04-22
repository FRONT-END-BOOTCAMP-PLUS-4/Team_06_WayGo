import { NextResponse } from "next/server";
import { SbCommentRepository } from "infra/repositories/supabase/SbCommentRepository";
import { DeleteCommentUsecase } from "application/usecases/comments/DeleteCommentUsecase";
import { EditCommentUsecase } from "application/usecases/comments/EditCommentUsecase";
import { EditCommentDto } from "application/usecases/comments/dto/EditCommentDto";

// ✅ 댓글 단건 조회
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const commentRepository = new SbCommentRepository();
    const comment = await commentRepository.findById(id);

    if (!comment) {
      return NextResponse.json(
        { error: "댓글을 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.error("댓글 단건 조회 오류:", error);
    return NextResponse.json({ error: "댓글 조회 실패" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const body = await request.json();
    const dto: EditCommentDto = { ...body, id };

    const commentRepository = new SbCommentRepository();
    const editCommentUsecase = new EditCommentUsecase(commentRepository);

    await editCommentUsecase.execute(dto);

    return NextResponse.json({ message: "댓글 수정 성공" }, { status: 200 });
  } catch (error) {
    console.error("댓글 수정 오류:", error);

    if (error instanceof Error) {
      if (error.message === "댓글을 찾을 수 없습니다") {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      if (error.message === "수정 권한이 없습니다") {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }

    return NextResponse.json({ error: "댓글 수정 실패" }, { status: 500 });
  }
}

// ✅ 댓글 삭제 (DELETE 수정: body 안전하게 파싱)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    let userId: string | undefined = undefined;
    try {
      const body = await request.json();
      userId = body?.userId;
    } catch {}

    if (!userId) {
      return NextResponse.json(
        { error: "userId가 필요합니다" },
        { status: 400 }
      );
    }

    const commentRepository = new SbCommentRepository();
    const deleteCommentUsecase = new DeleteCommentUsecase(commentRepository);

    await deleteCommentUsecase.execute({ id, userId });

    return NextResponse.json({ message: "댓글 삭제 성공" }, { status: 200 });
  } catch (error) {
    console.error("댓글 삭제 오류:", error);
    return NextResponse.json({ error: "댓글 삭제 실패" }, { status: 500 });
  }
}
