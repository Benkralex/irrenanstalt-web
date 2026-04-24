import { auth } from '@/auth';
import NavLinks from './nav-links';

export async function Navbar() {
  const session = await auth()
  const username = session?.user.username
  
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}