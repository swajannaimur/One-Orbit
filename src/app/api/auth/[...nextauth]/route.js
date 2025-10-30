import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

// users collection name
const USERS_COLLECTION = "users-data";

export const authOptions = {
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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

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

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.error("Authorize error : ", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id?.toString(); // ✅ store MongoDB _id
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // ✅ attach id to session
      session.user.role = token.role;
      return session;
    },
    async signIn({ user, account }) {
      if (account.provider !== "credentials") {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const existingUser = await db
          .collection(USERS_COLLECTION)
          .findOne({ email: user.email });

        if (!existingUser) {
          const result = await db.collection(USERS_COLLECTION).insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
            role: "client",
            createdAt: new Date(),
          });
          user.id = result.insertedId.toString(); // ✅ ensure new users get _id
        } else if (!existingUser.role) {
          await db
            .collection(USERS_COLLECTION)
            .updateOne({ email: user.email }, { $set: { role: "client" } });
        }else {
          user.id = existingUser._id.toString(); // ✅ set id for existing users
        }
      }
      return true;
    },
  },

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import clientPromise from "@/lib/mongodb";
// import bcrypt from "bcryptjs";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";

// // users collection name
// const USERS_COLLECTION = "users-data";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     }),

//     // ✅ Credentials Login
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         try {
//           const client = await clientPromise;
//           const db = client.db(process.env.DB_NAME); // database name
//           const user = await db
//             .collection(USERS_COLLECTION)
//             .findOne({ email: credentials.email });

//           if (!user) return null;

//           // password validation
//           const isPasswordCorrect = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );
//           if (!isPasswordCorrect) return null;

//           return {
//             id: user._id.toString(),
//             name: user.name,
//             email: user.email,
//             role: user.role,
//           };
//         } catch (err) {
//           console.error("Authorize error : ", err);
//           return null;
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id || user._id?.toString(); // ✅ store MongoDB _id
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id; // ✅ attach id to session
//       session.user.role = token.role;
//       return session;
//     },

//     // ✅ Updated signIn callback to handle selected role for social login
//     async signIn({ user, account, query }) {
//       if (account.provider !== "credentials") {
//         const client = await clientPromise;
//         const db = client.db(process.env.DB_NAME);

//         // ✅ Capture selected role from query parameter
//         const selectedRole =
//           query?.role === "developer" ? "developer" : "client";

//         const existingUser = await db
//           .collection(USERS_COLLECTION)
//           .findOne({ email: user.email });

//         if (!existingUser) {
//           const result = await db.collection(USERS_COLLECTION).insertOne({
//             name: user.name,
//             email: user.email,
//             image: user.image,
//             provider: account.provider,
//             role: selectedRole, // ✅ Save chosen role
//             createdAt: new Date(),
//           });
//           user.id = result.insertedId.toString(); // ✅ ensure new users get _id
//           user.role = selectedRole;
//         } else if (!existingUser.role) {
//           await db
//             .collection(USERS_COLLECTION)
//             .updateOne({ email: user.email }, { $set: { role: selectedRole } });
//           user.role = selectedRole;
//           user.id = existingUser._id.toString();
//         } else {
//           user.id = existingUser._id.toString(); // ✅ set id for existing users
//           user.role = existingUser.role;
//         }
//       }
//       return true;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

