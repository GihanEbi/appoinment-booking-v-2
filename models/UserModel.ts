import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  ID: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  password: string; // Optional field for password, if needed

  //   created user details
  userCreated?: string;
  userModified?: string;
}

const userSchema = new Schema<IUser>(
  {
    ID: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phoneNo: { type: String, required: true },
    password: { type: String, required: true },

    //   created user details
    userCreated: { type: String, required: false },
    userModified: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Users || mongoose.model('Users', userSchema);
