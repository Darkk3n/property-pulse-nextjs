'use server'
import connectDb from "@/config/database";
import { IMessage, Message } from '@/models/Message';
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { HydratedDocument } from 'mongoose';

async function deleteMessage(messageId: string) {
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID required')
    }
    const { userId } = sessionUser;

    await connectDb();
    const message: HydratedDocument<IMessage> | null = await Message.findById(messageId)

    if (message?.recipient.toString() !== userId)
        throw new Error('Unauthorized');


    await Message.deleteOne();

    revalidatePath('/', 'layout');
}

export default deleteMessage;