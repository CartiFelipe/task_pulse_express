import { CreateTaskDTO, Task } from '..';
import { Priority, PriorityMapper, StatusMapper } from '../../shared';

export default class TaskMapper {
  public static toDTO(task: Task): CreateTaskDTO {
    return {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
    };
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
