import mongoose from "mongoose";

export interface TypeTransaction extends mongoose.Document {
    amount: number;
    date: Date;
    description: string;
    createdAt: Date;
}

const TransactionSchema = new mongoose.Schema<TypeTransaction>({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [500, "Description cannot exceed 500 characters"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.Transaction as mongoose.Model<TypeTransaction> || mongoose.model<TypeTransaction>('Transaction', TransactionSchema);
