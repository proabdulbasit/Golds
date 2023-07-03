import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
import dbConnect from "../../../utils/mongo";
import User from "../../../models/User";
import { compare } from "bcrypt";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        await dbConnect();
        console.log("api checkup",credentials)
        const { email, password } = credentials;

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Wrong Credentials!");
        }

        const validated = await compare(password, user.password);
        if (!validated) {
          throw new Error("Wrong Credentials!");
        }

        if (user.isAdmin !== true) {
          throw new Error("UnAuthorised!");
        }
        return user;
      },
    }),

  ],

  callbacks: {
    
    jwt: ({ token, user }) => {
      console.log("user", user)
      console.log("token", token)
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.isAdmin = token.isAdmin;
      }

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  pages: {
    signIn: "/admin",
  },
});
