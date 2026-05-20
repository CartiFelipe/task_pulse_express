import { Priority } from '../../shared';
import Status from '../../shared/enums/status';

export default class Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  createdAt: Date;
  status: Status;
  user_id: number;

  constructor(
    id: number,
    title: string,
    description: string = 'Sem descrição',
    priority: Priority = Priority.LOW,
    status: Status = Status.TODO,
    createdAt: Date = new Date(),
    user_id: number,
  ) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.status = status;
    this.createdAt = createdAt;
    this.description = description;
    this.user_id = user_id;
  }
}
