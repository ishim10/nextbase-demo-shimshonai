import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { T } from '@/components/ui/Typography';
import { getAllPrivateItems } from '@/data/anon/privateItems';
import { Lock, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { ProjectsList } from '../../ProjectsList';

export const dynamic = 'force-dynamic';

function ProjectsListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
      <Card className="shadow-sm border-muted/40">
        <div className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </Card>
    </div>
  );
}

async function ProjectsListWrapper() {
  const projects = await getAllPrivateItems();
  return <ProjectsList projects={projects} showActions={false} />;
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center gap-3">
        <T.H1>Projects</T.H1>
        <Badge variant="outline" className="h-6 flex items-center gap-1">
          <Lock className="h-3 w-3" /> Secure
        </Badge>
      </div>
      <T.Subtle className="mb-8">
        Browse your projects that only you can access
      </T.Subtle>

      <div className="flex justify-end mb-8">
        <Link href="/projects/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" /> Create New Project
          </Button>
        </Link>
      </div>

      <Suspense fallback={<ProjectsListSkeleton />}>
        <ProjectsListWrapper />
      </Suspense>
    </div>
  );
}
