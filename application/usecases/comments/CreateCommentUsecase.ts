import { CommentRepository } from "domain/repositories/CommentRepository";
import { CreateCommentDto } from "./dto/CreateCommentDto";
import { Comment } from "domain/entities/Comment";
// import { UserRepository } from "domain/repositories/UserRepository";

export class CreateCommentUsecase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(dto: CreateCommentDto): Promise<Comment> {
    const comment = new Comment(
      Date.now(), // id (임시 ID, 나중에 DB에서 생성)
      dto.content, // content
      new Date(), // createdAt (현재 시간)
      null, // updatedAt (처음 생성시 수정 시간 없음)
      "", // nickname->user.nickname (지금은 빈 문자열, 나중에 유저 닉네임 연결)
      dto.userId, // userId
      dto.planId, // planId
      undefined, // deletedAt (처음엔 삭제 안 됐으니 undefined)
      undefined // profileImage->user.profileImage(지금은 프로필 이미지 없음)
    );

    return this.commentRepository.create(comment);
  }
}
