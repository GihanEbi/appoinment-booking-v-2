import { NextResponse } from 'next/server';

// -------------services-----------------
import { connectDB } from '../../../../../../lib/db';
import UserGroupModel from '../../../../../../models/UserGroupModel';
import { createId } from '@/services/id_generator/id-generator-service';
import { id_codes } from '@/constants/id_code_constants';
import { CheckUserAccess } from '@/services/auth-services/auth-service';
import { access_levels } from '@/constants/access_constants';
import AppointmentModel from '../../../../../../models/appointmentModel';

type isValidTokenTypes = {
  success: boolean;
  access: string;
  status?: number;
  // Optional userId if needed for further processing
  userId?: string;
};

export async function POST(req: Request) {
  const { name, phone, service, date, status, reminder } = await req.json();

  //   --------- connect to database -----------
  await connectDB();

  // ------------ Check if phone already exists -----------
  const existingAppointment = await AppointmentModel.find({
    phone,
  });

  if (existingAppointment.length !== 0) {
    return NextResponse.json({
      success: false,
      message: 'Appointment with this phone number already exists',
      status: 409,
    });
  }

  // ----------- created appointment details -----------
  let createdAppointment;

  try {
    const ID = await createId(id_codes.idCode.appointment);
    createdAppointment = new AppointmentModel({
      ID,
      name,
      phone,
      service,
      date,
    });

    await createdAppointment.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment created successfully',
        data: createdAppointment,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error creating appointment' },
      { status: 500 }
    );
  }
}
