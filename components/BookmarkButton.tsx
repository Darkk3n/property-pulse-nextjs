'use client'
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { IProperty } from "@/models/Property";
import { useSession } from 'next-auth/react';
import { FaBookmark } from "react-icons/fa";
import { toast } from 'react-toastify';

const BookmarkButton = ({ property }: { property: IProperty }) => {
   const { data: session } = useSession();
   const userId = session?.user.id;
   const handleClick = async () => {
      if (!userId) {
         toast.error('You need to be signed in to bookmark a listing')
         return;
      }
      try {
         const res = await bookmarkProperty(property._id)
         toast.success(res.message);
      } catch (error) {
         toast.error(`An error ocurred during the processing of the data: ${error}`);
      }

   }

   return (
      <button
         className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
         onClick={handleClick}>
         <FaBookmark className="mr-2" />Bookmark Property
      </button>
   );
}

export default BookmarkButton;