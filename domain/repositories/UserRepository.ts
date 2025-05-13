// domain/repositories/UserRepository.ts
import { User } from "domain/entities/User";
import { UpdatedUser } from "infra/repositories/supabase/SbUserRepository";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<UpdatedUser>;
  save(user: User): Promise<User>;

  findByEmail(email: string): Promise<User | null>;
  checkDuplicate(field: "email" | "nickname", value: string): Promise<boolean>;
}
