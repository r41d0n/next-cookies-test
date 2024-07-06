import {PrismaAdapter} from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./lib/prisma"
import {signInEmailPassword} from "./auth/actions/auth-actions";


export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Github,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email", placeholder: "email@domain.com"},
        password: {label: "Password", type: "password", placeholder: "********"}
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailPassword(credentials!.email as string, credentials!.password as string);

        if (user) {
          return user
        }
        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {

      return true
    },
    async jwt({token, user, account, profile}) {
      const dbUser = await prisma.user.findUnique({where: {email: token.email!}});
      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';
      return token;
    },
    async session({session, token, user}) {

      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }


      return session;
    },

  }
})