import { z } from 'zod';
import { Task } from '../';
import { Priority, PriorityMapper, StatusMapper } from '../../shared';
import Status from '../../shared/enums/status';

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'The title is required')
    .max(100, 'The title cannot be longer than 100 characters'),
  description: z
    .string()
    .max(50, 'The description cannot be longer than 50 characters')
    .optional(),
  priority: z
    .enum([Priority.HIGH, Priority.MEDIUM, Priority.LOW])
    .default(Priority.LOW),

  status: z
    .enum([Status.DONE, Status.PENDING, Status.TODO])
    .default(Status.TODO),
});

export function isTask(obj: any): obj is Task {
  return (
    obj instanceof Task ||
    (typeof obj === 'object' &&
      obj !== null &&
      typeof obj.id === 'number' &&
      typeof obj.title === 'string' &&
      typeof obj.description === 'string' &&
      typeof obj.estimatedTime === 'number' &&
      typeof obj.completed === 'boolean' &&
      obj.createdAt instanceof Date &&
      Object.values(Priority).includes(obj.priority) &&
      Object.values(Status).includes(obj.status))
  );
}

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;
