import { Router } from 'express';

import { UserController } from './user.controller';

// Composición (elige el repo real que estás usando)
import { UserService } from '../../../../application/services/user.service';
 
import { UserSequelizeRepository } from '../../../../infrastructure/data/repositories/user.sequelize.repository';
// o: import { UserSequelizeRepository } from '../../../../infrastructure/data/repositories/UserSequelizeRepository';

const router = Router();

// Wiring
const userRepository = new UserSequelizeRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

/**
 * GET    /api/users           -> list
 * GET    /api/users/:id       -> detail
 * POST   /api/users           -> create
 * PATCH  /api/users/:id       -> update
 * DELETE /api/users/:id       -> delete
 */
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
// router.post('/', userController.createUser);
// router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

 

export default router;