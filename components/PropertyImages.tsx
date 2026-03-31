'use client'
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }: { images: string[] }) => {
   return (
      <Gallery>
         <section className="bg-blue-50 p-4">
            <div className="container mx-auto">
               {images.length === 1 ? (
                  <Item
                     original={images[0]}
                     thumbnail={images[0]}
                     width='1000'
                     height='600'
                  >
                     {({ ref, open }) => (
                        <Image src={images[0]}
                           alt=""
                           ref={ref}
                           onClick={open}
                           className="object-cover h-[400p] mx-auto rounded-xl cursor-pointer"
                           width={1800}
                           height={400}
                           priority
                        />
                     )}
                  </Item>
               ) : (
                  <div className="grid grid-cols-2 gap-4">
                     {images.map((i, idx) => (
                        <div key={idx} className={`${images.length === 3 && idx === 2 ? 'col-span-2' : 'col-span-1'}`}>
                           <Item
                              original={i}
                              thumbnail={i}
                              width='1000'
                              height='600'
                           >
                              {({ ref, open }) => (
                                 <Image src={i}
                                    alt="" ref={ref}
                                    onClick={open}
                                    className="object-cover h-[400p] w-full rounded-xl cursor-pointer"
                                    width={1800}
                                    height={400}
                                    priority
                                 />
                              )}
                           </Item>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </section>
      </Gallery>
   );
}

export default PropertyImages;