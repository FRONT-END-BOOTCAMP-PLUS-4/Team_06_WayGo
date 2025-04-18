export class User {
  constructor(
    public readonly id: number,
    public email: string,
    public password: string,
    public name: string,
    public nickname: string,
    public userType: string,
    public profileImage?: string | null,
    public readonly createdAt: Date = new Date(),
    public deletedAt?: Date | null
  ) {}
}
