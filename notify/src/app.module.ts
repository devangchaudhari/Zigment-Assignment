import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { UserPreferencesModule } from './modules/user-preferences/user-preferences.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/notificationsDB'), // Update with your database connection
    NotificationsModule,
    UserPreferencesModule,
  ],
})
export class AppModule {}
