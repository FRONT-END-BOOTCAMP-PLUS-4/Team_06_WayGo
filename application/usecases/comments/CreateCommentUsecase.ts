import { CommentRepository } from "domain/repositories/CommentRepository";
import { CreateCommentDto } from "./dto/CreateCommentDto";
import { Comment } from "domain/entities/Comment";

export class CreateCommentUsecase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(dto: CreateCommentDto): Promise<Comment> {
    //dto를 받아서  비즈니스 로직을 처리하고 Comment 객체를 프로미스로 반환
    const comment = new Comment(
      Date.now(), // id (임시 ID, 나중에 DB에서 생성)
      dto.content, // content
      new Date(), // createdAt (현재 시간)
      null, // updatedAt (처음 생성시 수정 시간 없음)
      "", // nickname->나중에 supabase에서 join해서 가져올 예정
      dto.userId, // userId
      dto.planId, // planId
      undefined, // deletedAt (처음엔 삭제 안 됐으니 undefined)
      undefined // profileImage->나중에 supabase에서 join해서 가져올 예정
    );

    return this.commentRepository.create(comment);
  }
}
