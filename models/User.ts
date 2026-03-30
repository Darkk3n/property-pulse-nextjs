import { Schema, model, models } from 'mongoose';

export interface IUser {
    email: string;
    username: string;
    image?: string;
    bookmarks: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
    email: { type: String, unique: [true, 'Email already exists'], required: [true, 'Email is required'] },
    username: { type: String, required: [true, 'Username is required'] },
    image: { type: String },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Property' }],

}, { timestamps: true })

export const User = models.User || model('User', UserSchema)