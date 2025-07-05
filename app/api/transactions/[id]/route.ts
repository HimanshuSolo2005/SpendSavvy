import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Transaction from '../../../../models/Transaction';
import mongoose from 'mongoose'; 

interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  await dbConnect();
  const { id } = params;

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return NextResponse.json({ success: false, message: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: transaction }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}

export async function PUT(request: Request, { params }: { params: Params }) {
  await dbConnect();
  const { id } = params;

  try {
    const body = await request.json();
    const transaction = await Transaction.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!transaction) {
      return NextResponse.json({ success: false, message: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: transaction }, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map(
        (err) => (err as mongoose.Error.ValidatorError | mongoose.Error.CastError).message
      );
      return NextResponse.json({ success: false, message: errors.join(', ') }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedTransaction = await Transaction.deleteOne({ _id: id });
    if (!deletedTransaction.deletedCount) {
      return NextResponse.json({ success: false, message: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}