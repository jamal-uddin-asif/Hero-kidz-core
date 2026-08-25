import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        const user = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        // Return null if user data could not be retrieved
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log({ user, account, profile, email, credentials });

      const isExist = await dbConnect(collections.USERS).findOne({
        email: user.email,
        // provider: account?.provider,
      });
      if (isExist) {
        return true;
      }

      const newUser = {
        provider: account?.provider,
        email: user.email,
        name: user.name,
        image: user.image,
        role: "user",
      };
      const result = await dbConnect(collections.USERS).insertOne(newUser);

      return result.acknowledged;
      // return true
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, token, user }) {
      if(token){
        session.role = token.role
        session.email = token.email
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log({'AccountValueInJWT': account})

      if (user) {
        if (account.provider == "google") {
          const dbUser = await dbConnect(collections.USERS).findOne({
            email: user.email,
          });
          token.role = dbUser?.role;
          token.email = dbUser?.email;
        } else {
          token.role = user?.role;
          token.email = user?.email;
        }
      }
      return token;
    },
  },
};
