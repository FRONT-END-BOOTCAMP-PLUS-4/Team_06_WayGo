export interface DeleteCommentDto {
  commentId: number;
  userId: string;
  //서버에서 로그인된 사용자와 comment.userId를 비교하여 삭제 권한을 확인한다.
}
