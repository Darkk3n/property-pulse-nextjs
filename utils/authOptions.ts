import connectDb from "@/config/database";
import { User } from "@/models/User";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
   providers: [Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
         params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code'
         }
      }
   })],
   callbacks: {
      // Invoked on successful sign in 
      async signIn({ profile, account }) {
         // 1. Connect to DB
         await connectDb();
         const profileImage = account?.provider === "google"
            ? (profile as any)?.picture
            : profile?.image;
         // 2. Check if user exists
         const userExists = await User.findOne({ email: profile?.email })
         // 3. if not, create user
         if (!userExists) {
            // Truncate userName if too long
            const userName = profile?.name?.slice(0, 20);
            await User.create({
               email: profile?.email,
               username: userName,
               image: profileImage
            })
         }
         // 4. Return true to allow sign in
         return true;
      },
      // Session callback function that modifies the session object
      async session({ session }) {
         // 1. Get user from DB
         const user = await User.findOne({ email: session.user?.email })
         // 2. Assign user id from sessions
         if (session.user) {
            session.user.id = user._id.toString()
         }
         // 3. Return session
         return session;
      }
   }
}