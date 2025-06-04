import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('0 */5 * * * *')
  async handleCron() {
    const baseUrl = process.env.BACKEND_URL;
    const response = await fetch(baseUrl).then((res) => res.text());
    this.logger.debug(`Job is running every 5 minutes: ${response}`);
  }
}
