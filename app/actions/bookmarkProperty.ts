'use server'

import connectDb from "@/config/database";
import { User } from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId: string) {
   await connectDb();
   const sessionUser = await getSessionUser();

   if (!sessionUser || !sessionUser.userId)
      throw new Error('User ID is required');

   const { userId } = sessionUser;
   const user = await User.findById(userId);
   if (!user)
      throw new Error('User not found');

   let isBookmarked = user.bookmarks.includes(propertyId);
   let message: string;

   if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter((p: string) => p !== propertyId);
      message = 'Bookmar Removed';
      isBookmarked = false;
   }
   else {
      user.bookmarks.push(propertyId);
      message = 'Bookmar Added';
      isBookmarked = true;
   }
   await user.save();
   revalidatePath('/properties/saved', 'page');
   return { message, isBookmarked };
}


export default bookmarkProperty;