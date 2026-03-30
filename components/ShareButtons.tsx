'use client'
import { IProperty } from "@/models/Property";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TwitterIcon, WhatsappIcon, WhatsappShareButton, XShareButton } from 'react-share';

const ShareButtons = ({ property }: { property: IProperty }) => {
   const sharedUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`
   return (
      <>
         <h3 className="text-xl font-bold text-center pt-2">
            Share this Property:
         </h3>
         <div className="flex gap-3 justify-center pb-5">
            <FacebookShareButton url={sharedUrl} hashtag={`#${property.type.trim()}`}>
               <FacebookIcon size={40} round />
            </FacebookShareButton>
            <XShareButton url={sharedUrl} title={property.name} hashtags={[`#${property.type.trim()}`]}>
               <TwitterIcon size={40} round />
            </XShareButton>
            <WhatsappShareButton url={sharedUrl} title={property.name} separator='::'>
               <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <EmailShareButton url={sharedUrl} title={property.name} subject={property.name} body={`Check out this property listing ${sharedUrl}`}>
               <EmailIcon size={40} round />
            </EmailShareButton>
         </div>
      </>
   );
}

export default ShareButtons;