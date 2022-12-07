import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import userController from "../../../controllers/userController"

import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  secret: 'J@ss3!c63@1',
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),    //add external providor like google and github 
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: ".." },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const user = await userController.getone(credentials.email,credentials.password)
          console.log(user);
          if (user) {
            return user
          } else {
            throw new Error('you need to register')
          }
        } catch (error) {
          console.log(error)
        }
       
      }
    })
  ],
}
export default NextAuth(authOptions)