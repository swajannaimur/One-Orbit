import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const USERS_COLLECTION = "users-data";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // ✅ 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // ✅ 30 days
  },
  providers: [
    // ✅ Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ✅ GitHub
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    // ✅ Email/password
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db(process.env.DB_NAME);
          const user = await db
            .collection(USERS_COLLECTION)
            .findOne({ email: credentials.email });

          if (!user) return null;

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // ✅ Persist user info in JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id?.toString();
        token.role = user.role || token.role;
      }
      return token;
    },

    // ✅ Expose session data to client
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    // ✅ Save new social login users to DB with role: "developer"
    async signIn({ user, account }) {
      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME);

      // Handle only social logins here
      if (account.provider !== "credentials") {
        const existingUser = await db
          .collection(USERS_COLLECTION)
          .findOne({ email: user.email });

        if (!existingUser) {
          const result = await db.collection(USERS_COLLECTION).insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
            role: "developer", // ✅ social logins → developer
            createdAt: new Date(),
          });
          user.id = result.insertedId.toString();
          user.role = "developer";
        } else {
          user.id = existingUser._id.toString();
          user.role = existingUser.role || "developer";

          // Ensure existing social users always have "developer" role
          if (existingUser.role !== "developer") {
            await db
              .collection(USERS_COLLECTION)
              .updateOne(
                { email: user.email },
                { $set: { role: "developer" } }
              );
          }
        }
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
