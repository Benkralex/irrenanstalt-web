import type { NextAuthConfig } from 'next-auth';
import { parseTags } from './app/lib/database/users';
import type { User as AppUser } from './app/lib/database/definitions';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname.endsWith('.css')) {
        return true;
      }
      if (
        nextUrl.pathname === '/login' || 
        nextUrl.pathname === '/register' || 
        nextUrl.pathname === '/terms-of-service' || 
        (
          nextUrl.pathname !== '/verify-email/verify' && 
          nextUrl.pathname.startsWith('/verify-email')
        )
      ) {
        return true;
      }
      if (nextUrl.pathname.startsWith('/verify-email')) {
        return !!auth?.user;
      }
      if (auth?.user?.emailVerified === false) {
        return false;
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