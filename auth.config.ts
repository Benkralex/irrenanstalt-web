import type { NextAuthConfig } from 'next-auth';
import { parseTags } from './app/lib/database/users';
import type { User as AppUser, SessionUser } from './app/lib/database/definitions';
import { isEmailVerified } from './app/lib/database/email-verify';
 
function isPublic(pathname: string) {
  return ['/login', '/otp', '/terms-of-service', '/no-admin'].includes(pathname) || 
    pathname.startsWith('/register') ||
    (pathname.startsWith('/verify-email') && pathname !== '/verify-email/verify') ||
    pathname.endsWith('.css');
}

function sanetizeUser(user: AppUser): SessionUser {
  const { password, otpSecret, emailVerified, otpVerified, ...sanetizedUser } = user;
  return sanetizedUser;
}

export const authConfig = {
  pages: {
    signIn: '/login',
    verifyRequest: "/otp",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      // Public pages
      if (isPublic(nextUrl.pathname)) {
        return true;
      }
      // Email verification page
      if (nextUrl.pathname.startsWith('/verify-email')) {
        return !!auth?.user;
      }
      // OTP verification
      const otpLoggedIn = !!auth?.otpLoggedIn;
      if (!otpLoggedIn) {
        const callbackUrl = `${nextUrl.pathname}${nextUrl.search}`;
        const otpUrl = new URL('/otp', nextUrl);
        otpUrl.searchParams.set('callbackUrl', callbackUrl);
        return Response.redirect(otpUrl);
      }
      // Email verification
      if (await isEmailVerified(auth?.user?.email || '') === false) {
        return false;
      }
      // Admin
      if (nextUrl.pathname.startsWith('/admin')) {
        return parseTags(auth?.user?.tags || '').includes('admin') ? true : Response.redirect(new URL('/no-admin', nextUrl));
      }
      // Default: require authentication
      const isLoggedIn = !!auth?.user;
      return isLoggedIn;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = sanetizeUser(user as AppUser);
        const otpVerified = !!(user as AppUser).otpVerified && !!(user as AppUser).otpSecret;
        token.otpLoggedIn = !otpVerified;
      }

      if (trigger === 'update') {
        token.user = {
          ...(token.user as SessionUser | undefined),
          ...session.user,
        };
        if (typeof session.otpLoggedIn === 'boolean') {
          token.otpLoggedIn = session.otpLoggedIn;
        }
      }

      return token;
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user as typeof session.user;
      }
      session.otpLoggedIn = !!token.otpLoggedIn;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;