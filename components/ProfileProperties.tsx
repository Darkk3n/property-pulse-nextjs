'use client'
import deleteProperty from "@/app/actions/deleteProperty";
import { IProperty } from "@/models/Property";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfileProperties = ({ initialProperties }: { initialProperties: IProperty[] }) => {
   const [properties, setProperties] = useState<IProperty[]>(initialProperties);

   const handleDeleteProperty = async (propertyId: string) => {
      const confirmed = window.confirm('Are you sure you want to delete this Property?')
      if (!confirmed) return;
      await deleteProperty(propertyId)

      const updatedProperties = properties.filter(p => p._id !== propertyId);

      setProperties(updatedProperties);
      toast.success('Property deleted successfully');
   }

   return properties.map((p) => (
      <div className="mb-10" key={p._id}>
         <Link href={`/properties/${p._id}`}>
            <Image
               className="h-32 w-full rounded-md object-cover"
               src={p.images[0]}
               alt="Property 1"
               width={1000}
               height={200}
            />
         </Link>
         <div className="mt-2">
            <p className="text-lg font-semibold">{p.name}</p>
            <p className="text-gray-600">Address: {p.location.street} {p.location.city} {p.location.state}</p>
         </div>
         <div className="mt-2">
            <Link
               href={`/properties/${p._id}/edit`}
               className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600">
               Edit
            </Link>
            <button
               className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
               type="button" onClick={() => handleDeleteProperty(p._id)}>
               Delete
            </button>
         </div>
      </div>
   ));
}

export default ProfileProperties;