import { NextResponse } from 'next/server';

// -------------services-----------------
import { connectDB } from '../../../../../../lib/db';
import BusinessDetailsModel from '../../../../../../models/BusinessDetailsModel';
import { createId } from '@/services/id_generator/id-generator-service';
import { id_codes } from '@/constants/id_code_constants';

export async function POST(req: Request) {
  const {
    businessName,
    document,
    availableTimeSlotText,
    appointmentTimePeriod,
  } = await req.json();

  try {
    await connectDB();

    const newBusinessDetails = new BusinessDetailsModel({
      UserID: 'US00002',
      businessName,
      document,
      availableTimeSlotText,
      appointmentTimePeriod,
    });

    await newBusinessDetails.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Business details created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating business details', error },
      { status: 500 }
    );
  }
}
