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

    const userId = 'US00002'; // Hardcoded for testing, replace with actual userId from request
    const updatedBusinessDetails = await BusinessDetailsModel.findOneAndUpdate(
      { UserID: userId },
      {
        businessName,
        document,
        availableTimeSlotText,
        appointmentTimePeriod,
        userModified: userId, // Assuming userModified is the ID of the user making the update
      },
      { new: true } // Return the updated document
    );
    if (!updatedBusinessDetails) {
      return NextResponse.json(
        { message: 'No business details found for this user' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: 'Business details updated successfully',
        Details: updatedBusinessDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating business details' },
      { status: 500 }
    );
  }
}
