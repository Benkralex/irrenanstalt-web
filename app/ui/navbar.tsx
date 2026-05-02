import { auth } from '@/auth';
import NavLinks from './nav-links';
import { parseTags } from '../lib/database/users';
import { Logo } from './icons';

export async function Navbar() {
  const session = await auth()
  const username = session?.user?.username
  
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex flex-row items-center justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="md:mb-4 flex items-center justify-center">
          <Logo classNames='w-[40px] h-[40px]  md:w-[96px] md:h-[96px]'/>
        </div>
        <NavLinks tags={parseTags(session?.user?.tags || '')} />
      </div>
    </div>
  );
}