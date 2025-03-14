import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {findUserByCredentials} from "@/app/(auth)/actions/find-user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Credentials({
    credentials: {
      email: {},
      password: {}
    },
    authorize: async (credentials) => {
      return await findUserByCredentials(credentials.email as string, credentials.password as string);
    }
  })],
})