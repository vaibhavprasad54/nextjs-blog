
import { connectDB } from "@/app/utils/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User"
import bcrypt from "bcryptjs"

export const authOptions = {
    providers : [ 
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials){
               const {email, password, userName} = credentials;
               try {
                  await connectDB();
                  const user =  await User.findOne({email}) 
                  console.log("Userrrr2:", user);

                  if(!user){
                     return null;
                  }

                  
                  const matchPasswords = await bcrypt.compare(password, user.password);

                  if(!matchPasswords){
                     return null
                  }

                  
                  return {
                     id: user._id.toString(),
                     email: user.email,
                     userName: user.userName || "",
                  };

               } catch (error) {
                  console.log("Error:", error);
               }
            }
        })
     ],
     callbacks:{
      jwt: async ({ token, user }) =>{
  
        if (user) {
          token.uid = user;
        }
  
        return token
      },  
      session: async ({ session, token }) => {
         session.user = {
           id: token.uid.id,
           email: token.uid.email,
           userName:token.uid.userName,
         }
 
       return session;
     },
   },
     strategy: "jwt",
     secret: process.env.NEXTAUTH_SECRET,
     pages: {
        signIn: "/sign-in"
     },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };