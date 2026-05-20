import { Router } from 'express';
import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';
import { validateHandler } from '@/middlewares';
import { validateIdSchema } from '@/shared';
import { CreateUserSchema, UpdateUserSchema } from './user.schema';

const router = Router();
const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

router.get('/', controller.findAll);
router.get(
  '/:id',
  validateHandler(validateIdSchema, 'params'),
  controller.findById,
);

router.post('/', validateHandler(CreateUserSchema, 'body'), controller.create);
router.delete(
  '/:id',
  validateHandler(validateIdSchema, 'params'),
  controller.deleteById,
);
router.put(
  '/:id',
  validateHandler(validateIdSchema, 'params'),
  validateHandler(UpdateUserSchema, 'body'),
  controller.updateById,
);

export default router;
