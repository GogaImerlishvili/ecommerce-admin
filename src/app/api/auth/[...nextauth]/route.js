import { User } from "@/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      cliendId:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });

        const passwordOk = user && bcrypt.compareSync(password, user.password);
    
        if (passwordOk) {
          return user;
        }
        return null;
      },
    }),
  ],
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
