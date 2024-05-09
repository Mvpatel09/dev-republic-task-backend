import mongoose, { Document, Schema, Types } from 'mongoose';

interface IOrderProduct {
    productId: Types.ObjectId;
    quantity: number;
}

interface IOrder extends Document {
    user: Types.ObjectId;
    products: IOrderProduct[];
    totalPrice: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const orderProductSchema = new Schema<IOrderProduct>({
    productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true }
}, { _id: false });

const orderSchema: Schema<IOrder> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    products: [orderProductSchema],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' }
}, {
    versionKey: false,
    timestamps: true,
});

const Order = mongoose.model<IOrder>('order', orderSchema);

export default Order;
