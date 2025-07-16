import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  ID: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  status: string;
  reminder?: boolean;

  //   created user details
  userCreated?: string;
  userModified?: string;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    ID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    reminder: { type: Boolean, default: false },

    //   created user details
    userCreated: { type: String, required: false },
    userModified: { type: String, required: false },
  },
  { timestamps: true }
);
export default mongoose.models.appointments ||
  mongoose.model('appointments', appointmentSchema);
