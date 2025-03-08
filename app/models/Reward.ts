import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IReward extends Document {
  name: string;
  description: string;
  starsRequired: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

const RewardSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    starsRequired: { type: Number, required: true },
    tier: { 
      type: String, 
      enum: ['bronze', 'silver', 'gold', 'platinum'], 
      required: true 
    }
  },
  { timestamps: true }
);

export default mongoose.models.Reward || mongoose.model<IReward>('Reward', RewardSchema);

// UserReward model to track which rewards a user has earned
export interface IUserReward extends Document {
  user: IUser['_id'];
  reward: IReward['_id'];
  dateEarned: Date;
  isRedeemed: boolean;
  redeemedDate?: Date;
}

const UserRewardSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reward: { type: Schema.Types.ObjectId, ref: 'Reward', required: true },
    dateEarned: { type: Date, default: Date.now },
    isRedeemed: { type: Boolean, default: false },
    redeemedDate: { type: Date }
  },
  { timestamps: true }
);

export const UserReward = mongoose.models.UserReward || 
  mongoose.model<IUserReward>('UserReward', UserRewardSchema); 