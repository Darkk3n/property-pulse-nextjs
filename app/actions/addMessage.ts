'use server'
import connectDb from "@/config/database";
import { Message } from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export type MessageFormState = {
   submitted: boolean;
   error?: string;
};

async function addMessage(prevState: MessageFormState, formData: FormData): Promise<MessageFormState> {
   await connectDb();

   const sessionUser = await getSessionUser();
   if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required');
   }
   const { userId } = sessionUser;
   const recipient = formData.get('recipient')
   if (userId === recipient) {
      return { submitted: false, error: 'You cannot send a message to yourself' }
   }
   try {
      const newMessage = new Message({
         sender: userId,
         recipient: recipient,
         property: formData.get('property'),
         name: formData.get('name'),
         email: formData.get('email'),
         phone: formData.get('phone'),
         body: formData.get('message'),
      })

      await newMessage.save();

      return { submitted: true };
   } catch (e) {
      return {
         submitted: false,
         error: e instanceof Error ? e.message : 'Failed to send message',
      };
   }

}

export default addMessage