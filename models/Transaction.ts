import mongoose from 'mongoose';


const TransactionSchema = new mongoose.Schema({ 
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [200, 'Description cannot be more than 200 characters'],
  },
  category: {
    type: String,
    
    enum: [
        'Food', 'Transport', 'Utilities', 'Rent', 'Shopping', 'Entertainment',
        'Health', 'Education', 'Salary', 'Groceries', 'Bills', ''
    ],
    default: '',
    required: [true, 'Category is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface ITransactionDocument extends mongoose.Document {
  amount: number;
  date: Date;
  description: string;
  category: string;
  createdAt: Date;
}

export default mongoose.models.Transaction || mongoose.model<ITransactionDocument>('Transaction', TransactionSchema);