import priority from '@/shared/enums/priority';
import { CreateTaskDTO, Task } from '..';
import { Task as pTask } from 'lib/generated/prisma/client';
import status from '@/shared/enums/status';

export default class TaskMapper {
  public static toDTO(task: Task): CreateTaskDTO {
    return {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      createdAt: task.createdAt,
    };
  }

  public static fromPrisma(pTask: pTask): Task {
    return new Task(
      pTask.id,
      pTask.title,
      pTask.description,
      pTask.priority as priority,
      pTask.status as status,
      pTask.createdAt,
    );
  }

  // public static toEntity(dto: CreateTaskDTO): Task {
  //   return new Task(
  //     0, // ID will be set by the database
  //     dto.title,
  //     dto.estimatedTime,
  //     '', // Default priority
  //     Priority.HIGH, // Default completed status
  //     false, // Default createdAt
  //   );
  // }
}
