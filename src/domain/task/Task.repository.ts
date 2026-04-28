import { Priority } from '../../shared';
import Status from '../../shared/enums/status';
import Task from './Task.entity';

export default class TaskRepository {
  private static tasksMocks: Array<Task> = [
    new Task(1, 'Task 1', 'Description for task 1', Priority.HIGH, Status.DONE),
    new Task(
      2,
      'Task 2',
      'Description for task 2',
      Priority.MEDIUM,
      Status.PENDING,
    ),
    new Task(3, 'Task 3', 'Description for task 3', Priority.HIGH, Status.DONE),
  ];

  public static getAll(): Array<Task> {
    return this.tasksMocks.map((value) => value);
  }

  public static getById(id: number): Task | undefined {
    const task: Task | undefined = this.tasksMocks.find((t) => t.id === id);

    return task;
  }

  public static createTask(task: Task) {
    this.tasksMocks.push({
      ...task,
      id: this.tasksMocks.length + 1,
    });
    return this.tasksMocks[this.tasksMocks.length - 1];
  }
}
