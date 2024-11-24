import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the NotificationLog schema
@Schema()
export class NotificationLog extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: ['marketing', 'newsletter', 'updates'] })
  type: 'marketing' | 'newsletter' | 'updates';

  @Prop({ required: true, enum: ['email', 'sms', 'push'] })
  channel: 'email' | 'sms' | 'push';

  @Prop({ required: true, enum: ['pending', 'sent', 'failed'] })
  status: 'pending' | 'sent' | 'failed';

  @Prop()
  sentAt?: Date;

  @Prop()
  failureReason?: string;

  @Prop({ required: true })
  metadata: Record<string, any>;
}

// Create the schema using SchemaFactory
export const NotificationLogSchema = SchemaFactory.createForClass(NotificationLog);
