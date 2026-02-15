import { DomainError } from '../errors/DomainError';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string,
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, emailValidated, password, role, img } =
      object;

    if (!_id && !id) throw new DomainError('User id is required');
    if (!name) throw new DomainError('User name is required');
    if (!email) throw new DomainError('User email is required');
    if (!password) throw new DomainError('User password is required');
    if (!role) throw new DomainError('User role is required');

    return new User(_id || id, name, email, password, role, img);
  }
}
