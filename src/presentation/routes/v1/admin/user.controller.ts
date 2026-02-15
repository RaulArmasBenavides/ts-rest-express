import { Request, Response } from 'express';
import { IUserService } from '../../../../domain/interfaces/user-service.interface';
import { CreateUserDTO, UpdateUserDTO } from '../../../../application/types/create-user-dto';
import { CustomError } from '../../../../application/errors/CustomError';

export class UserController {
  constructor(private readonly userService: IUserService) {}

  /** GET /api/users */
  getUsers = async (_req: Request, res: Response): Promise<void> => {
    const users = await this.userService.getAllUsers();
    res.json(users);
  };

  /** GET /api/users/:id */
  getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const user = await this.userService.getUserById(id);

    if (!user) {
      throw CustomError.notFound('User not found');
    }

    res.json(user);
  };

  /** POST /api/users */
  createUser = async (req: Request, res: Response): Promise<void> => {
    const [error, dto] = CreateUserDTO.create(req.body);

    if (error) {
      throw CustomError.badRequest(error);
    }

    const user = await this.userService.createUser(dto!);

    res.status(201).json(user);
  };

  /** PATCH /api/users/:id */
  updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const [error, dto] = UpdateUserDTO.create({ id, ...req.body });

    if (error) {
      throw CustomError.badRequest(error);
    }

    const user = await this.userService.updateUser(id, dto!);

    if (!user) {
      throw CustomError.notFound('User not found');
    }

    res.json(user);
  };

  /** DELETE /api/users/:id */
  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const ok = await this.userService.deleteUser(id);

    if (!ok) {
      throw CustomError.notFound('User not found');
    }

    res.status(204).send();
  };
}
