import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  // Exclude API routes, Next internals, and any path with a file extension.
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};