export class Comment {
  constructor(
    public id: number,
    public content: string,
    public createdAt: Date,
    public updatedAt: Date | null,
    public nickname: string,
    public userId: string,
    public planId: number,
    public deletedAt?: Date | null,
    public profileImage?: string | null
  ) {}
}
