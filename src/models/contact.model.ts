import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>('Contact', contactSchema);
