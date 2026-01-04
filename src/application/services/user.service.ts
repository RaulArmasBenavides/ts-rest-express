import { User } from "../../domain/entities/user.entity";
import { IUserService } from "../../domain/interfaces/user-service.interface";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  img?: string;
  role?: string;
  google?: boolean;
};

export type UpdateUserDTO = Partial<Omit<CreateUserDTO, 'password'>> & {
  password?: string;
};



export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  getUserById(uid: string): Promise<User | null> {
    return this.userRepository.findById(uid);
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    // Aquí normalmente:
    // - validar email
    // - hashear password
    // - set defaults
    return this.userRepository.create({
      ...data,
      role: data.role ?? 'USER_ROLE',
      google: data.google ?? false,
    } as any);
  }

  updateUser(uid: string, data: UpdateUserDTO): Promise<User | null> {
    return this.userRepository.update(uid, data as any);
  }

  deleteUser(uid: string): Promise<boolean> {
    return this.userRepository.delete(uid);
  }
}