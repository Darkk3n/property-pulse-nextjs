'use server'
import connectDb from '@/config/database';
import { IProperty, Property } from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


async function updateProperty(propertyId: string, formData: FormData) {
   await connectDb();

   const sessionUser = await getSessionUser();
   if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required');
   }
   const { userId } = sessionUser;
   const existingProperty: IProperty | null = await Property.findById(propertyId);
   if (existingProperty?.owner.toString() !== userId) {
      throw new Error('Current user does not own this property');
   }
   const amenities = formData.getAll('amenities')

   const propertyData = {
      owner: userId,
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
         street: formData.get('location.street'),
         city: formData.get('location.city'),
         zipcode: formData.get('location.zipcode'),
         state: formData.get('location.state')
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
         nightly: formData.get('rates.nightly'),
         weekly: formData.get('rates.weekly'),
         monthly: formData.get('rates.monthly'),
      },
      seller_info: {
         name: formData.get('seller_info.name'),
         email: formData.get('seller_info.email'),
         phone: formData.get('seller_info.phone'),
      },
   }

   const updatedProperty: IProperty | null = await Property.findByIdAndUpdate(propertyId, propertyData);

   revalidatePath('/', 'layout');
   redirect(`/properties/${updatedProperty?._id}`)
}

export default updateProperty;