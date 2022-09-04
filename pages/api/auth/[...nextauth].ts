import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'

const NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0'
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0'
        }
      },
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'))

          const nextAuthUrl = 'http://localhost:3000'
          if (!nextAuthUrl) return null

          const nextAuthHost = new URL(nextAuthUrl).host
          if (siwe.domain !== nextAuthHost) return null

          // @ts-ignore
          // console.log('getCsrfToken: ', await getCsrfToken())
          // // @ts-ignore
          // if (siwe.nonce !== await getCsrfToken()) {
          //   console.log('nonce not same as csrftoken')
          //   return null
          // }

          await siwe.validate(credentials?.signature || '')

          return {
            id: siwe.address
          }
        } catch (error) {
          console.log(error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  jwt: {
    maxAge: 60 * 60 * 24 // 24 hours
  },
  secret: 'test', // process.env.NEXTAUTH_SECRET,
  callbacks: {
    // @ts-ignore
    async session({ session, token }) {
      if (session && session.user) {
        session.address = token.sub
        session.user.name = token.sub
        session.user.image = 'https://www.fillmurray.com/128/128'
        return session
      }
    }
  }
}

export default NextAuth(authOptions)