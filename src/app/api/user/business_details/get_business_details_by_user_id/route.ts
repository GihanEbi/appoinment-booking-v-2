import { NextResponse } from 'next/server';

// -------------services-----------------
import { connectDB } from '../../../../../../lib/db';
import BusinessDetailsModel from '../../../../../../models/BusinessDetailsModel';
import { createId } from '@/services/id_generator/id-generator-service';
import { id_codes } from '@/constants/id_code_constants';

export async function POST(req: Request) {
  //   const { userId } = await req.json();
  const userId = 'US00002'; // Hardcoded for testing, replace with actual userId from request

  try {
    await connectDB();

    const businessDetails = await BusinessDetailsModel.aggregate([
      {
        $match: { UserID: userId },
      },
      {
        $project: {
          _id: 0,
          businessName: 1,
          document: 1,
          availableTimeSlotText: 1,
          appointmentTimePeriod: 1,
        },
      },
    ]);

    if (!businessDetails || businessDetails.length === 0) {
      return NextResponse.json(
        { message: 'No business details found for this user' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Business data', Details: businessDetails[0] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching business details' },
      { status: 500 }
    );
  }
}
