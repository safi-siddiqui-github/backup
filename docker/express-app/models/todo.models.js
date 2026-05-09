import { model, Schema } from "mongoose";

const todoSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true
    }
)

export const TodoModel = model('Todo', todoSchema)
