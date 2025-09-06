import { redirect } from 'next/navigation';

/**
 * IndexPage acts solely as a redirect to the dedicated home route.
 * Keeping the home page at `/home` simplifies navigation handling in the
 * Navbar and mirrors the requested structure where the landing page is
 * accessed from the index.
 */
export default function IndexPage() {
  // Immediately redirect to the home page when the index route is visited.
  redirect('/home');
  // Although redirect() ends the request, returning null satisfies the
  // React component signature.
  return null;
}