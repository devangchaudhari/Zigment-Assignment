import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './schemas/notification-log.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationLog.name) private readonly notificationLogModel: Model<NotificationLog>, // Inject NotificationLog model
  ) {}

  // Simulate sending a notification and log it
  async sendNotification(userId: string, type: 'marketing' | 'newsletter' | 'updates', channel: 'email' | 'sms' | 'push', content: any): Promise<NotificationLog> {
    // Simulate a notification being sent
    const logData = {
      userId,
      type,
      channel,
      status: 'pending',
      metadata: content,
    };

    const newLog = new this.notificationLogModel(logData);
    const savedLog = await newLog.save();

    // After saving, update the log status to 'sent'
    savedLog.status = 'sent';
    savedLog.sentAt = new Date();
    await savedLog.save();

    return savedLog;
  }

  // Fetch notification logs for a user
  async getLogs(userId: string): Promise<NotificationLog[]> {
    return this.notificationLogModel.find({ userId }).exec();
  }

  // Get basic statistics (e.g., total sent notifications, failed notifications)
  async getStats(): Promise<any> {
    const totalNotifications = await this.notificationLogModel.countDocuments();
    const sentNotifications = await this.notificationLogModel.countDocuments({ status: 'sent' });
    const failedNotifications = await this.notificationLogModel.countDocuments({ status: 'failed' });

    return {
      total: totalNotifications,
      sent: sentNotifications,
      failed: failedNotifications,
    };
  }
}
