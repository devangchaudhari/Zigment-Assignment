import { Module } from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { UserPreferencesController } from './user-preferences.controller';

@Module({
  providers: [UserPreferencesService],
  controllers: [UserPreferencesController]
})
export class UserPreferencesModule {}