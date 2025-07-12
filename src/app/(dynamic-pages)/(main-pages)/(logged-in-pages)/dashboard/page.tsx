import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { T } from '@/components/ui/Typography';
import { getAllItems } from '@/data/anon/items';
import { getAllPrivateItems } from '@/data/anon/privateItems';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { ProjectsList } from '../../ProjectsList';
import { PublicProjectsList } from '../../PublicProjectsList';

export const dynamic = 'force-dynamic';

async function ItemsListContainer() {
  const items = await getAllItems();
  return <PublicProjectsList items={items} showActions={false} />;
}

async function ProjectsListContainer() {
  const projects = await getAllPrivateItems();
  return <ProjectsList projects={projects} showActions={false} />;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
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

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <T.H1>Dashboard</T.H1>
            <T.Subtle>
              Manage your projects and explore public projects
            </T.Subtle>
          </div>
          <Button asChild>
            <Link href="/projects/new" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="public" className="space-y-6">
        <TabsList>
          <TabsTrigger value="public">Public Projects</TabsTrigger>
          <TabsTrigger value="private">My Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="public" className="space-y-4">
          <Suspense fallback={<DashboardSkeleton />}>
            <ItemsListContainer />
          </Suspense>
        </TabsContent>
        <TabsContent value="private" className="space-y-4">
          <Suspense fallback={<DashboardSkeleton />}>
            <ProjectsListContainer />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
