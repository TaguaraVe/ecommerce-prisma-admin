'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: 'Setting',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn('flex items-center space-x-3 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'test-sm font-medium transition-colors hover:text-primary ',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground  '
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
