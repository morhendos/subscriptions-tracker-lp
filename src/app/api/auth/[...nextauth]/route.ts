import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AUTH_CONFIG } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Very simple NextAuth configuration without full abstraction
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Find user
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() },
          });

          if (!user) return null;

          // Verify password
          const passwordValid = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!passwordValid) return null;

          // Return user data
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: AUTH_CONFIG.SESSION_MAX_AGE,
  },
  pages: AUTH_CONFIG.ROUTES,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.roles = token.roles;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
