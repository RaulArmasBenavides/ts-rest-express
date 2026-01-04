import { User } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/interfaces/user-repository.interface";
import { UserMapper } from "../../mappers/user.mapper";
import { UserModel } from "../models/user.model";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  img?: string;
  role?: string;
  google?: boolean;
};

type UpdateUserInput = Partial<Omit<CreateUserInput, 'email'>> & {
  email?: string; // si permites cambiar email, déjalo; si no, quítalo
};

export class UserSequelizeRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    const rows = await UserModel.findAll();
    return rows.map(r => UserMapper.toDomain(r.get({ plain: true })));
  }

  async findById(uid: string): Promise<User | null> {
    const row = await UserModel.findByPk(uid);
    if (!row) return null;
    return UserMapper.toDomain(row.get({ plain: true }));
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await UserModel.findOne({ where: { email } });
    if (!row) return null;
    return UserMapper.toDomain(row.get({ plain: true }));
  }

  async create(data: CreateUserInput): Promise<User> {
    const created = await UserModel.create({
      name: data.name,
      email: data.email,
      password: data.password,
      img: data.img,
      role: data.role ?? 'USER_ROLE',
      google: data.google ?? false,
    });

    return UserMapper.toDomain(created.get({ plain: true }));
  }

  async update(uid: string, data: UpdateUserInput): Promise<User | null> {
    const row = await UserModel.findByPk(uid);
    if (!row) return null;

    await row.update({
      ...data,
    });

    return UserMapper.toDomain(row.get({ plain: true }));
  }

  async delete(uid: string): Promise<boolean> {
    const deleted = await UserModel.destroy({ where: { id: uid } });
    return deleted > 0;
  }
}