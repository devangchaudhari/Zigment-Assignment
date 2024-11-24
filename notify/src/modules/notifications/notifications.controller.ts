import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Endpoint to send notifications
  @Post('send')
  async sendNotification(
    @Body() body: {
      userId: string;
      type: 'marketing' | 'newsletter' | 'updates';
      channel: 'email' | 'sms' | 'push';
      content: { subject: string; body: string };
    }
  ) {
    return this.notificationsService.sendNotification(
      body.userId,
      body.type,
      body.channel,
      body.content
    );
  }

  // Endpoint to get notification logs by userId
  @Get(':userId/logs')
  async getNotificationLogs(@Param('userId') userId: string) {
    return this.notificationsService.getLogs(userId);
  }

  // Endpoint to get basic statistics about notifications
  @Get('stats')
  async getNotificationStats() {
    return this.notificationsService.getStats();
  }
}
