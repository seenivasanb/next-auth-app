import { verifyPassword } from "@/helpers/bcrypt/password";
import { connectToDB } from "@/helpers/db/connectDB";
import User from "@/models/userModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Signin",
            credentials: {
                username: {
                    type: "text",
                    name: "username",
                },
                password: {
                    type: "text",
                    name: "password"
                }
            },
            authorize: async (credentials) => {
                const { username, password }: any = credentials;
                if (!username || !password) {
                    return Promise.reject(new Error("Username and password are required"))
                }

                try {
                    await connectToDB();
                    const user = await User.findOne({
                        username: credentials?.username
                    });
                    if (!user) {
                        return Promise.reject(new Error("User is not exists"));
                    }

                    const isPasswordValid = await verifyPassword(password, user.password);
                    if (isPasswordValid) {
                        return user
                    } else {
                        return Promise.reject(new Error("Invalid username and password"))
                    }
                } catch (error) {
                    console.log(error);
                    return Promise.reject(error);
                }
            }
        })
    ],
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 30 * 60, // expire in 30 minutes
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.username
                }
            }

            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    id: token.id,
                    name: token.name
                }

            }
        },
    }
})

export default handler;
export { handler as GET, handler as POST }