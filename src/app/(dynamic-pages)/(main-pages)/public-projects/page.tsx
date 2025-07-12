import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { T } from '@/components/ui/Typography';
import { getAllItems } from '@/data/anon/items';
import { Suspense } from 'react';
import { PublicProjectsList } from '../PublicProjectsList';

export const dynamic = 'force-dynamic';

function PublicProjectsListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

async function PublicProjectsListWrapper() {
  const items = await getAllItems();
  return <PublicProjectsList items={items} showActions={false} />;
}

export default function PublicProjectsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div>
          <T.H1>Public Projects</T.H1>
          <T.Subtle>
            Browse and explore public projects shared by the community
          </T.Subtle>
        </div>
      </div>

      <Suspense fallback={<PublicProjectsListSkeleton />}>
        <PublicProjectsListWrapper />
      </Suspense>
    </div>
  );
}
