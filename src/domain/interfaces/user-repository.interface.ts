import { User } from "../entities/user.entity";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(uid: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;

  create(data: Omit<User, 'uid'> | { name: string; email: string; password: string; img?: string; role?: string; google?: boolean }): Promise<User>;

  update(uid: string, data: Partial<{ name: string; email: string; password: string; img?: string; role?: string; google?: boolean }>): Promise<User | null>;

  delete(uid: string): Promise<boolean>;
}