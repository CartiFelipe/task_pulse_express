import { Priority } from '../enums';

export default class PriorityMapper {
  public static toInt(priority: Priority): number {
    switch (priority) {
      case Priority.LOW:
        return 0;
      case Priority.MEDIUM:
        return 1;
      case Priority.HIGH:
        return 2;
      default:
        throw new Error('Invalid priority value');
    }
  }

  public static toString(priority: Priority): string {
    switch (priority) {
      case Priority.LOW:
        return 'LOW';
      case Priority.MEDIUM:
        return 'MEDIUM';
      case Priority.HIGH:
        return 'HIGH';
      default:
        throw new Error('Invalid priority value');
    }
  }
  public static fromString(priority: string): Priority {
    switch (priority.toLowerCase()) {
      case 'low':
        return Priority.LOW;
      case 'medium':
        return Priority.MEDIUM;
      case 'high':
        return Priority.HIGH;
      default:
        throw new Error('Invalid priority string');
    }
  }
}
