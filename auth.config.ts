import type { NextAuthConfig } from 'next-auth';
import { parseTags } from './app/lib/database/users';
import type { User as AppUser } from './app/lib/database/definitions';

type SafeUser = Omit<AppUser, 'password' | 'otpSecret'>;

function sanitizeUser(user: AppUser | SafeUser): SafeUser {
  const { password: _password, otpSecret: _otpSecret, ...safeUser } = user as AppUser;
  return safeUser;
}
 
export const authConfig = {
  pages: {
    signIn: '/login',
    verifyRequest: "/otp",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname.endsWith('.css')) {
        return true;
      }
      if (
        nextUrl.pathname === '/login' || 
        nextUrl.pathname === '/register' || 
        nextUrl.pathname === '/otp' ||
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
      const otpRequired = !!auth?.user?.otpRequired && auth?.user?.otpVerified;
      const otpLoggedIn = !!auth?.user?.otpLoggedIn;
      if (otpRequired && !otpLoggedIn) {
        const callbackUrl = `${nextUrl.pathname}${nextUrl.search}`;
        const otpUrl = new URL('/otp', nextUrl);
        otpUrl.searchParams.set('callbackUrl', callbackUrl);
        return Response.redirect(otpUrl);
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
        token.otpRequired = !!(user as AppUser).otpSecret;
        token.otpVerified = !token.otpRequired;
      }

      if (trigger === 'update' && session?.user) {
        token.user = {
          ...(token.user as SafeUser | undefined),
          ...session.user,
        };
        if (typeof session.user.otpRequired === 'boolean') {
          token.otpRequired = session.user.otpRequired;
        }
        if (typeof session.user.otpVerified === 'boolean') {
          token.otpVerified = session.user.otpVerified;
        }
      }

      return token;
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user as typeof session.user;
      }
      session.user.otpRequired = !!token.otpRequired;
      session.user.otpLoggedIn = !!token.otpVerified;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;