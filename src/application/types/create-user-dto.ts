export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  img?: string;
  role?: string;
  google?: boolean;
};



export type UpdateUserDto = Partial<Omit<CreateUserDto, 'password'>> & {
  password?: string;
};

export class UpdateUserDTO {
  static create(props: any): [string?, UpdateUserDto?] {
    const id = String(props?.id ?? '').trim();
    if (!id) return ['id is required'];

    const name = props?.name !== undefined ? String(props.name).trim() : undefined;
    const email = props?.email !== undefined ? String(props.email).trim().toLowerCase() : undefined;
    const password = props?.password !== undefined ? String(props.password) : undefined;
    const img = props?.img !== undefined ? String(props.img).trim() : undefined;
    const role = props?.role !== undefined ? String(props.role).trim() : undefined;
    const google = props?.google !== undefined ? !!props.google : undefined;

    if (
      name === undefined &&
      email === undefined &&
      password === undefined &&
      img === undefined &&
      role === undefined &&
      google === undefined
    ) {
      return ['At least one field must be provided'];
    }

    if (password !== undefined && password.length < 6) {
      return ['password must be at least 6 characters'];
    }

    const dto: UpdateUserDto = {  name, email, password, img, role, google };
    return [undefined, dto];
  }
}


export class CreateUserDTO {
  static create(props: any): [string?, CreateUserDto?] {
    const name = String(props?.name ?? '').trim();
    const email = String(props?.email ?? '').trim().toLowerCase();
    const password = String(props?.password ?? '');

    if (!name) return ['name is required'];
    if (!email) return ['email is required'];
    if (!password) return ['password is required'];

    if (password.length < 6) return ['password must be at least 6 characters'];
    if (email.length > 254) return ['email is too long'];

    const dto: CreateUserDto = {
      name,
      email,
      password,
      img: props?.img ? String(props.img).trim() : undefined,
      role: props?.role ? String(props.role).trim() : undefined,
      google: props?.google === true,
    };

    return [undefined, dto];
  }
}