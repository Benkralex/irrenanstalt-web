import type { NextAuthConfig } from 'next-auth';
import { parseTags } from './app/lib/database/users';
import type { User as AppUser } from './app/lib/database/definitions';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname === '/login' || nextUrl.pathname === '/register') {
        return true;
      }
      if (nextUrl.pathname.startsWith('/admin')) {
        return parseTags(auth?.user?.tags || '').includes('admin');
      }
      const isLoggedIn = !!auth?.user;
      return isLoggedIn;
    },
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        console.log('User signed in:', user);
        token.user = user as AppUser;
      }
      return token
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user as typeof session.user;
      }
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig;