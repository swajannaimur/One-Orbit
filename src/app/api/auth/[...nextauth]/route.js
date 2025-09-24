import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../../lib/mongodb";
import bcrypt from 'bcryptjs';

// users collection name 
const USERS_COLLECTION = "users";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },

            async authorize(credentials){
                try{
                    const client = await clientPromise;
                    const db = client.db("AuthMongoNext"); // database name
                    const user = await db.collection(USERS_COLLECTION).findOne({email: credentials.email});
                    
                    if(!user) return null;

                    // password validation
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if(!isPasswordCorrect) return null;

                    return user; // returns user object of NextAuth

                }
                catch(err){
                    console.error("Authorize error : ", err);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            if(account.provider === "credentials") return true;
            return false;
        },

    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };