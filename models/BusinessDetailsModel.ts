import mongoose, { Schema, Document } from 'mongoose';
export interface IBusinessDetails extends Document {
  UserID: string;
  businessName: string;
  document: string;
  availableTimeSlotText: string;
  appointmentTimePeriod: string;

  //   created user details
  userCreated?: string;
  userModified?: string;
}

const BusinessDetailsSchema: Schema = new Schema({
  UserID: { type: String, required: true },
  businessName: { type: String, required: true },
  document: { type: String, required: true },
  availableTimeSlotText: { type: String, required: true },
  appointmentTimePeriod: { type: String, required: true },
  userCreated: { type: String, required: false },
  userModified: { type: String, required: false },
});

export default mongoose.models.BusinessDetails ||
  mongoose.model('BusinessDetails', BusinessDetailsSchema);
