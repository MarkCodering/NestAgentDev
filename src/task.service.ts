import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NestAgent } from './agent.service';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);

    constructor(private readonly agent: NestAgent) { }

    // "Three times a day"
    // Let's pick 9:00, 13:00, and 18:00
    @Cron('0 9,13,18 * * *')
    async handleScheduledTask() {
        this.logger.debug('Running scheduled Gmail and Calendar review');

        const prompt = `Please review my gmail and google calendar for today. 
    Summarize any important emails and list my upcoming events. 
    If there are any conflicts or urgent matters, please highlight them.`;

        try {
            const result = await this.agent.getResult(prompt);
            this.logger.log('Agent Review Result:');
            this.logger.log(result);
        } catch (error) {
            this.logger.error('Error during scheduled task:', error);
        }
    }

    // Optional: A test cron that runs every minute (commented out or for debugging)
    // @Cron(CronExpression.EVERY_MINUTE)
    // async testTask() {
    //   this.logger.debug('Testing agent...');
    // }
}
