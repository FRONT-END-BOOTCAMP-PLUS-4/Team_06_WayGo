// domain/repositories/UserRepository.ts
import { User } from "domain/entities/User";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<User>;
}
