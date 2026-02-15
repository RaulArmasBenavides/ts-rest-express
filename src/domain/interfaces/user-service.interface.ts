 
import { CreateUserDTO, UpdateUserDTO } from "../../application/types/create-user-dto";
import { User } from "../entities/user.entity";

export interface IUserService {
  getAllUsers(): Promise<User[]>;
  getUserById(uid: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(data: CreateUserDTO): Promise<User>;
  updateUser(uid: string, data: UpdateUserDTO): Promise<User | null>;
  deleteUser(uid: string): Promise<boolean>;
}