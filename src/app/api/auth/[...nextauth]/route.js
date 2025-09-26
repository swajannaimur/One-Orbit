import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../lib/mongodb";
<<<<<<< HEAD
import bcrypt from "bcryptjs";
=======
import bcrypt from 'bcryptjs';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
>>>>>>> bff8d313186af4c2023ccf42ab75ebf49f84457f

// users collection name
const USERS_COLLECTION = "users-data";

export const authOptions = {
<<<<<<< HEAD
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
=======
    providers: [
             GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
>>>>>>> bff8d313186af4c2023ccf42ab75ebf49f84457f

      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db(process.env.DB_NAME); // database name
          const user = await db
            .collection(USERS_COLLECTION)
            .findOne({ email: credentials.email });

          if (!user) return null;

          // password validation
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) return null;

<<<<<<< HEAD
          return user; // returns user object of NextAuth
        } catch (err) {
          console.error("Authorize error : ", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "credentials") return true;
      return false;
=======
                }
                catch(err){
                    console.error("Authorize error : ", err);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "credentials") return true;

            // For Google & GitHub, save user to DB if not exists
            try {
                const client = await clientPromise;
                const db = client.db(process.env.DB_NAME);
                const existingUser = await db.collection(USERS_COLLECTION).findOne({ email: user.email });
                if (!existingUser) {
                    await db.collection(USERS_COLLECTION).insertOne({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        provider: account.provider,
                        createdAt: new Date(),
                    });
                }
            } catch (err) {
                console.error("Social login DB error:", err);
                // Optionally, you can block sign-in if DB fails
                // return false;
            }
            return true;
        },
>>>>>>> bff8d313186af4c2023ccf42ab75ebf49f84457f
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };