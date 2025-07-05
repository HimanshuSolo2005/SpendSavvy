import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Transaction from '../../../models/Transaction';
import mongoose from 'mongoose'; 

export async function GET() {
  await dbConnect();
  try {
    const transactions = await Transaction.find({}).sort({ date: -1, createdAt: -1 });
    return NextResponse.json({ success: true, data: transactions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const transaction = await Transaction.create(body);
    return NextResponse.json({ success: true, data: transaction }, { status: 201 });
  } catch (error) {
    // Basic validation error handling from Mongoose
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map(err => (err as any).message);
      return NextResponse.json({ success: false, message: errors.join(', ') }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}