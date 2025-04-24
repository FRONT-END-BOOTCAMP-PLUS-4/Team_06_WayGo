export class User {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public nickname: string,
    public userType: string,
    public id?: string,
    public profileImage?: string | null,
    public createdAt?: Date,
    public deletedAt?: Date | null
  ) {}
}
