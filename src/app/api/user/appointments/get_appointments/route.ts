// -------------services-----------------
import { CheckUserAccess } from '@/services/auth-services/auth-service';
import { connectDB } from '../../../../../../lib/db';
import UserGroupModel from '../../../../../../models/UserGroupModel';
import { access_levels } from '@/constants/access_constants';
import { NextResponse } from 'next/server';
import AppointmentModel from '../../../../../../models/appointmentModel';

export async function GET(req: Request) {

  //   --------- connect to database -----------
  await connectDB();
  let data = await AppointmentModel.find();
  return NextResponse.json({ success: true, data });
}