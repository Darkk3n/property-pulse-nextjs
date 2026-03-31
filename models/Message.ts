import { Schema, model, models } from 'mongoose';

export interface IMessage {
   _id: string;
   sender: string;
   recipient: string;
   property: string;
   name: string;
   email: string;
   phone?: string;
   body?: string;
   read: boolean;
   createdAt: string;
   updatedAt: string;
}

export interface IMessagePopulated extends Omit<IMessage, 'sender' | 'property'> {
   sender: { _id: string; username: string };
   property: { _id: string; name: string };
}

const MessageSchema: Schema = new Schema(
   {
      sender: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true
      },
      recipient: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true
      },
      property: {
         type: Schema.Types.ObjectId,
         ref: 'Property',
         required: true
      },
      name: {
         type: String,
         required: [true, 'Name is required']
      },
      email: {
         type: String,
         required: [true, 'Email is required']
      },
      phone: String,
      body: String,
      read: {
         type: Boolean,
         default: false
      }

   }, { timestamps: true })

export const Message = models.Message || model('Message', MessageSchema)