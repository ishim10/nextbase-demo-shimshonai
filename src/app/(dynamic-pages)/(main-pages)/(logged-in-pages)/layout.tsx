import { Button } from '@/components/ui/button';
import { getCachedLoggedInVerifiedSupabaseUser } from '@/rsc-data/supabase';
import {
  BarChart3,
  Database,
  Home,
  Lock,
  PlusCircle,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  try {
    await getCachedLoggedInVerifiedSupabaseUser();
  } catch (error) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-3 px-4 flex justify-between items-center">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <Lock className="h-4 w-4" />
              <span>Projects</span>
            </Link>
            <Link
              href="/datasets"
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <Database className="h-4 w-4" />
              <span>Datasets</span>
            </Link>
            <Link
              href="/results"
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Results</span>
            </Link>
            <Link
              href="/profile"
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/projects/new" className="flex items-center gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">New Project</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
