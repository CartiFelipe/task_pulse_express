import Status from '../enums/status';

export default class StatusMapper {
  public static toInt(status: Status): number {
    switch (status) {
      case Status.TODO:
        return 0;
      case Status.PENDING:
        return 1;
      case Status.DONE:
        return 2;
      default:
        throw new Error('Invalid status value');
    }
  }

  public static toString(status: Status): string {
    switch (status) {
      case Status.TODO:
        return 'todo';
      case Status.PENDING:
        return 'pending';
      case Status.DONE:
        return 'done';
      default:
        throw new Error('Invalid status value');
    }
  }
  public static fromString(status: string): Status {
    switch (status.toLowerCase()) {
      case 'todo':
        return Status.TODO;
      case 'pending':
        return Status.PENDING;
      case 'done':
        return Status.DONE;
      default:
        throw new Error('Invalid status string');
    }
  }
}
