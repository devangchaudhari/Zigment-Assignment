import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { UserPreference } from './schemas/user-preference.schema';

@Controller('api/preferences')
export class UserPreferencesController {
  constructor(private readonly userPreferencesService: UserPreferencesService) {}

  @Post()
  async create(@Body() data: Partial<UserPreference>): Promise<UserPreference> {
    return this.userPreferencesService.create(data);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<UserPreference> {
    return this.userPreferencesService.findOne(userId);
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() data: Partial<UserPreference>,
  ): Promise<UserPreference> {
    return this.userPreferencesService.update(userId, data);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string): Promise<void> {
    return this.userPreferencesService.delete(userId);
  }
}
