import { Router } from 'express';
import TaskController from './Task.controller';
import TaskRepository from './Task.repository';
import { validateHandler } from '../../middlewares';
import { createTaskSchema, updateTaskSchema } from './Task.schema';
import { validateIdSchema } from '../../shared/schemas/validateIdSchema';
import TaskService from './Task.services';
import authMiddleware from '../../middlewares/authMiddleware';

const router = Router();
const repository = new TaskRepository();
const service = new TaskService(repository);
const controller = new TaskController(service);

router.use(authMiddleware);
router.get('/', authMiddleware, controller.getAllTasks);
router.get('/:id', authMiddleware, validateHandler(validateIdSchema, 'params'), controller.getTaskById);
router.post('/', authMiddleware, validateHandler(createTaskSchema, 'body'), controller.createTask);
router.put('/:id', authMiddleware, validateHandler(validateIdSchema, 'params'), validateHandler(updateTaskSchema, 'body'), controller.updateTask);
router.delete('/:id', authMiddleware, validateHandler(validateIdSchema, 'params'), controller.deleteTask);

export default router;
