import { Router } from 'express';
import { validateHandler } from '../../middlewares';
import { createTaskSchema, updateTaskSchema } from './Task.schema';
import TaskController from './Task.controller';
import { validateIdSchema } from '../../shared/schemas/validateIdSchema';

const router = Router();

router.get('/', TaskController.getAllTasks);
router.get(
  '/:id',
  validateHandler(validateIdSchema, 'params'),
  TaskController.getTaskById,
);

router.post(
  '/',
  validateHandler(createTaskSchema, 'body'),
  TaskController.createTask,
);

router.put(
  '/:id',
  validateHandler(validateIdSchema, 'params'),
  validateHandler(updateTaskSchema, 'body'),
  TaskController.updateTask,
);
router.delete(
  '/:id',
  validateHandler(validateIdSchema, 'params'),
  TaskController.deleteTask,
);

export default router;
