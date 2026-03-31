'use server'
import connectDb from "@/config/database";
import { IMessage, Message } from '@/models/Message';
import { User } from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { HydratedDocument } from 'mongoose';
import { revalidatePath } from 'next/cache';

async function markMessageAsRead(messageId: string) {
    await connectDb();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId)
        throw new Error('User ID is required');

    const { userId } = sessionUser;
    const message: HydratedDocument<IMessage> | null = await Message.findById(messageId);
    if (!message)
        throw new Error('Message not found');

    if (message.recipient.toString() !== userId)
        throw new Error('Unauthorized');

    message.read = !message.read;

    revalidatePath('/messages', 'page');

    await message.save();

    return message.read;
}

export default markMessageAsRead;