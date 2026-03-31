'use server'
import connectDb from "@/config/database";
import { Message } from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function addMessage(formData: FormData) {
   await connectDb();

   const sessionUser = await getSessionUser();
   if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required');
   }
   const { userId } = sessionUser;
   const recepient = formData.get('recepient')
   if (userId === recepient) {
      return new Error('You cannot send a message to yourself')
   }
   const newMessage = new Message({
      sender: userId,
      recepient: recepient,
      property: formData.get('property'),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      body: formData.get('body'),
   })

   await newMessage.save();

   return { submitted: true };
}

export default addMessage