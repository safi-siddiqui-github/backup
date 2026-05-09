import { model, Schema } from "mongoose";

const orderItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new Schema(
    {
        price: {
            type: Number,
            required: true,
            default: 0
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        orderItems: {
            type: [orderItemSchema]
        },
        address: {
            type: String,
            required: true,
        },
        status:{
            type: String,
            enum: ['PENDING', 'CANCELLED', 'DELIVERED'],
            default: 'PENDING'
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const orderModel = model('Order', orderSchema)
