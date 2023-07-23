import { redirect } from 'next/navigation';
import { UserButton, auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { MainNav } from '@/components/main-nav';
import { StoreSwitcher } from '@/components/store-switcher';

export const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <header className="border-b">
      <div className="h-16 flex items-center px-4 bg-indigo-100">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6 font-semibold " />
        <div className="ml-auto flex items-center justify-end space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};
