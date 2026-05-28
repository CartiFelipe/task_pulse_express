import { Router } from 'express';
import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';
import { authMiddleware, ensureRole, validateHandler } from '@/middlewares';
import { validateIdSchema } from '@/shared';
import { CreateUserSchema, UpdateUserSchema } from './user.schema';

const router = Router();
const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

// all users [admin only]
router.get('/', authMiddleware, ensureRole('admin'), controller.getAll);

// get specific user by id [admin only]
router.get(
  '/:id',
  authMiddleware,
  ensureRole('admin'),
  validateHandler(validateIdSchema, 'params'),
  controller.getById,
);

// router.post('/', validateHandler(CreateUserSchema, 'body'), controller.create);

// delete specific user by id [admin only]
router.delete(
  '/:id',
  authMiddleware,
  ensureRole('admin'),
  validateHandler(validateIdSchema, 'params'),
  controller.delete,
);

// update specific user by id [admin only]
router.put(
  '/:id',
  authMiddleware,
  ensureRole('admin'),
  validateHandler(validateIdSchema, 'params'),
  validateHandler(UpdateUserSchema, 'body'),
  controller.updateById,
);

/*
  Quero criar novas rotas, exemplo: 
  - GET /users/me -> retorna os dados do usuário autenticado
  - DELETE /users/me -> deleta a conta do usuário autenticado
*/

export default router;
