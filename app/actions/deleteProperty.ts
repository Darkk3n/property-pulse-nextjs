'use server'

import cloudinary from "@/config/cloudinary";
import connectDb from "@/config/database";
import { IProperty, Property } from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId: string) {
   const sessionUser = await getSessionUser();

   if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID required')
   }
   const { userId } = sessionUser;

   await connectDb();
   const propertyDoc: IProperty | null = await Property.findById(propertyId)
   const property = convertToSerializableObject(propertyDoc)
   if (!property) throw new Error('Property not found');

   if (property.owner.toString() !== userId) {
      throw new Error('Unauthorized')
   }
   const publicIds = property.images.map((imageUrl: string) => {
      const parts = imageUrl.split('/');
      return parts.at(-1)?.split('.').at(0);
   })

   if (publicIds.length > 0) {
      for (let publicId of publicIds) {
         await cloudinary.uploader.destroy('propertypulse/' + publicId);
      }
   }

   await Property.deleteOne();

   revalidatePath('/', 'layout');
}

export default deleteProperty;