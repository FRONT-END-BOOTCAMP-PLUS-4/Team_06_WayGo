// app/api/comments/routes.ts

import { NextResponse } from "next/server";
import { SbCommentRepository } from "infra/repositories/supabase/SbCommentRepository";
import { CreateCommentUsecase } from "application/usecases/comments/CreateCommentUsecase";
import { CommentListUsecase } from "application/usecases/comments/CommentListUsecase";
import { CreateCommentDto } from "application/usecases/comments/dto/CreateCommentDto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dto: CreateCommentDto = body;

    const commentRepository = new SbCommentRepository();
    const createCommentUsecase = new CreateCommentUsecase(commentRepository);
    const comment = await createCommentUsecase.execute(dto);

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("댓글 생성 오류:", error);
    return NextResponse.json({ error: "댓글 생성 실패" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const planId = Number(url.searchParams.get("planId")); // 쿼리스트링으로 planId 받기

    if (isNaN(planId)) {
      return NextResponse.json(
        { error: "planId가 유효하지 않습니다" },
        { status: 400 }
      );
    }

    const commentRepository = new SbCommentRepository();
    const commentListUsecase = new CommentListUsecase(commentRepository);
    const commentListDto = await commentListUsecase.execute(planId);

    return NextResponse.json(commentListDto, { status: 200 });
  } catch (error) {
    console.error("댓글 목록 조회 오류:", error);
    return NextResponse.json({ error: "댓글 목록 조회 실패" }, { status: 500 });
  }
}
