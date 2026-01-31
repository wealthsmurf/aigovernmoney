import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold text-primary">
              Youth Subsidy Navigator
            </span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" asChild>
              <Link href="/" className="font-semibold text-sm sm:text-base">
                Checker
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/blog" className="font-semibold text-sm sm:text-base">
                Blog
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
