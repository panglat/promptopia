import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';
import User, { IUser } from '@models/user';
import { SessionOptions } from 'next-auth';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne<IUser>({
        email: session.user?.email
      });
      const newSession = {
        ...session,
        user: { ...session.user, id: sessionUser?._id.toString() }
      };

      return newSession;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if a user already exists
        try {
          const userExists = await User.findOne<IUser>({
            email: profile?.email
          });
          // if not  create a new user
          if (!userExists) {
            try {
              await User.create({
                email: profile?.email,
                username: profile?.name?.replace(' ', '').toLowerCase(),
                // @ts-ignore
                image: profile?.picture
              });
            } catch (error) {
              console.error('NextAuth signIn: User.create failed.', error);
              return false;
            }
          }
        } catch (error) {
          console.error('NextAuth signIn: User.findOne failed.', error);
          return false;
        }

        return true;
      } catch (error) {
        console.error(
          'NextAuth signIn: MongoDB Cloud connection failed.',
          error
        );
        return false;
      }
    }
  }
});

export { handler as GET, handler as POST };
