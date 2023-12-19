import User from "@/app/models/userModel";
import { connectDB } from "@/app/utils/connect";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      async authorize(credentials) {
        await connectDB();

        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            // check password
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          console.log("Error while credentials processing.", error);
          return NextResponse.json(
            { message: "Error while credentials processing." },
            { status: 500 }
          );
        }
      },
    }),
  ],

  // Pute user information into the token & session
  callbacks: {
    // Put the user info in to the token
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    // Put the token info in to the session
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      console.log("session: ", session);
      return session;
    },
  },

  // If any error occured during Sign in it will redirect to the bellow address
  pages: {
    error: "/login",
  },
});

export { handler as GET, handler as POST };
