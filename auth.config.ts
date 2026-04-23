import type { NextAuthConfig } from 'next-auth';
import { parseTags } from './app/lib/database/users';
import type { User as AppUser } from './app/lib/database/definitions';

type SafeUser = Omit<AppUser, 'password'>;

function sanitizeUser(user: AppUser | SafeUser): SafeUser {
  const { password: _password, ...safeUser } = user as AppUser;
  return safeUser;
}
 
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
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = sanitizeUser(user as AppUser);
      }

      if (trigger === 'update' && session?.user) {
        token.user = {
          ...(token.user as SafeUser | undefined),
          ...session.user,
        };
      }

      return token;
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user as typeof session.user;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;