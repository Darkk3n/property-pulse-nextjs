import Image from "next/image";

const PropertyImages = ({ images }: { images: string[] }) => {
   return (<section className="bg-blue-50 p-4">
      <div className="container mx-auto">
         {images.length === 1 ? (
            <Image src={images[0]}
               alt=""
               className="object-cover h-[400p] mx-auto rounded-xl"
               width={1800}
               height={400}
               priority
            />
         ) : (
            <div className="grid grid-cols-2 gap-4">
               {images.map((i, idx) => (
                  <div key={idx} className={`${images.length === 3 && idx === 2 ? 'col-span-2' : 'col-span-1'}`}>
                     <Image src={i}
                        alt=""
                        className="object-cover h-[400p] w-full rounded-xl"
                        width={1800}
                        height={400}
                        priority
                     />
                  </div>
               ))}
            </div>
         )}
      </div>
   </section>);
}

export default PropertyImages;