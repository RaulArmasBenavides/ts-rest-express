import { User } from "../../domain/entities/user.entity";
 
export class UserMapper {
  static toDomain(raw: any): User {
    // raw debe ser un objeto plano (plain) o row.dataValues
    return User.fromObject(raw);
  }

  static toPersistence(entity: User) {
    return {
      id: entity.id, // si en SQL tu PK se llama "id"
      name: entity.name,
      email: entity.email,
      password: entity.password,
      img: entity.img,
      role: entity.role
    };
  }
}
