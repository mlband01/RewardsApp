import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone: string;
  joinDate: Date;
  lastVisit: Date;
  totalVisits: number;
  totalStars: number;
  favoriteRestaurant: string;
  status: 'active' | 'inactive';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  isAdmin: boolean;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String, default: '' },
    joinDate: { type: Date, default: Date.now },
    lastVisit: { type: Date, default: Date.now },
    totalVisits: { type: Number, default: 0 },
    totalStars: { type: Number, default: 0 },
    favoriteRestaurant: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    tier: { 
      type: String, 
      enum: ['bronze', 'silver', 'gold', 'platinum'], 
      default: 'bronze' 
    },
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// This is to prevent overwriting the model when the file is recompiled
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 