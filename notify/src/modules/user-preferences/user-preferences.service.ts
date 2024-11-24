import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './schemas/user-preference.schema';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreference.name) private readonly userPreferenceModel: Model<UserPreference>,
  ) {}

  async create(data: Partial<UserPreference>): Promise<UserPreference> {
    return new this.userPreferenceModel(data).save();
  }

  async findOne(userId: string): Promise<UserPreference> {
    const preference = await this.userPreferenceModel.findOne({ userId });
    if (!preference) throw new NotFoundException('User preference not found');
    return preference;
  }

  async update(userId: string, data: Partial<UserPreference>): Promise<UserPreference> {
    const updated = await this.userPreferenceModel.findOneAndUpdate({ userId }, data, { new: true });
    if (!updated) throw new NotFoundException('User preference not found');
    return updated;
  }

  async delete(userId: string): Promise<void> {
    const result = await this.userPreferenceModel.deleteOne({ userId });
    if (result.deletedCount === 0) throw new NotFoundException('User preference not found');
  }
}
