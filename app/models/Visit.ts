import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IRestaurant } from './Restaurant';

export interface IVisit extends Document {
  user: IUser['_id'];
  restaurant: IRestaurant['_id'];
  date: Date;
  starsEarned: number;
}

const VisitSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    date: { type: Date, default: Date.now },
    starsEarned: { type: Number, default: 1 }
  },
  { timestamps: true }
);

export default mongoose.models.Visit || mongoose.model<IVisit>('Visit', VisitSchema); 