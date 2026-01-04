import { CustomError } from "../../../../domain/errors/CustomError";
import { Request, Response } from 'express';
import { IUserService } from "../../../../domain/interfaces/user-service.interface";

 export class UserController {
  constructor(public readonly userService: IUserService) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  /** GET /api/users */
  getUsers = (_req: Request, res: Response) => {
    this.userService
      .getAllUsers()
      .then((users) => res.json(users))
      .catch((error) => this.handleError(error, res));
  };

  /** GET /api/users/:id */
  getUserById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.userService
      .getUserById(id)
      .then((user) => {
        if (!user) return res.status(404).json({ error: 'User not found' });
        return res.json(user);
      })
      .catch((error) => this.handleError(error, res));
  };

  /** POST /api/users */
  createUser = (req: Request, res: Response) => {
    const [error, dto] = CreateUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.userService
      .createUser(dto!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleError(error, res));
  };

  /** PATCH /api/users/:id */
  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;

    const [error, dto] = UpdateUserDto.create({ id, ...req.body });
    if (error) return res.status(400).json({ error });

    this.userService
      .updateUser(id, dto!)
      .then((user) => {
        if (!user) return res.status(404).json({ error: 'User not found' });
        return res.json(user);
      })
      .catch((error) => this.handleError(error, res));
  };

  /** DELETE /api/users/:id */
  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    this.userService
      .deleteUser(id)
      .then((ok) => {
        if (!ok) return res.status(404).json({ error: 'User not found' });
        return res.status(204).send();
      })
      .catch((error) => this.handleError(error, res));
  };
}