export class User {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public nickname: string,
    public userType: string,
    public profileImage: string | null,
    public createdAt?: Date, // ✅ 옵셔널
    public deletedAt?: Date | null, // ✅ 옵셔널
    public id?: string // ✅ 옵셔널
  ) {}
}
