import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
  } from "next-auth";
  import { db } from "~/server/db"
  import CredentialsProvider from "next-auth/providers/credentials";
  import GitHubProvider from "next-auth/providers/github";
  import { signInSchema } from "~/lib/zod";
  import bcrypt from 'bcrypt'
  
  declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        id: string
      } & DefaultSession["user"];
    }
  }

  declare module 'next-auth/jwt' {
    interface JWT {
        id: string | undefined
    }
  }
  
  export const authOptions: NextAuthOptions = {
    callbacks: {
      jwt: async ({token}) => {
           token.id = token.sub
         return token
      },
      session: async ({session, token}) => {
    
        if(token && session && session.user) {
          session.user.name = token.name
          session.user.id = token.id as string
        }
        return session
      },
      signIn: async ({ user, account, profile}) => {
      try{
        if(account?.provider === 'github' && profile) {
            const existingUser = await db.user.findFirst({where: {OR: [{email: user?.email!}, {OauthId: user?.id}]}})
            if(!existingUser) {
              await db.user.create({
                data: {
                    username: user.name ?? "unknown",
                    email: user.email as string,
                    ProfilePicture: user.image,
                    OauthId: user.id,
                    OauthProvider: 'GITHUB'
                }
              })
            }
           else await db.user.update({where: {id: existingUser?.id}, data: {lastLogin: new Date()}})
        }
        
        return true
      } catch(e) {
        console.log(e)
        return false
      }
    },
  },
    providers: [
       CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: {label: 'email',type: 'text',placeholder: 'email'},
          password: {label: 'password', type: 'password', placeholder: 'password'}
        },
         authorize: async (credentials: any) => {
      try {
          if (!credentials) {
            throw new Error("No credentials provided")
          }
  
          const {email,password} = credentials
  
          const parsedData = signInSchema.safeParse({email,password})
          if(!parsedData.success) throw new Error('Invalid Credentials. try again !')
            
          const user = await db.user.findUnique({where: {email}})
          if(!user) throw new Error('User not found. check email !')
          const isMatch = await bcrypt.compare(password, user.password as string)     
          if(!isMatch) throw new Error('Check your password !!!')
  
          await db.user.update({where: {id: user.id}, data: {lastLogin: new Date()}})
  
          return {id: user.id.toString(), name: user.username, email: user.email}
  } catch(e) {
    console.error(e)
    if(e instanceof Error) throw new Error(e.message)
    else { throw new Error('Something went wrong !!!')}
  }
        }
       }) ,
       GitHubProvider({
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || ""
       })
    ],
    session: {
      strategy: 'jwt',
      maxAge: 2 * 24 * 60 * 60
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET || 'secret'
    },
    pages: {
      signIn: '/signin'
    },
    secret: process.env.NEXTAUTH_SECRET || 'secret'
  } satisfies NextAuthOptions;
  
export const getServerAuthSession = () => getServerSession(authOptions)
  