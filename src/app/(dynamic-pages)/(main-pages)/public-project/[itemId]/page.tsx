import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { T } from '@/components/ui/Typography';
import { getItem } from '@/data/anon/items';
import { ArrowLeft, Calendar, FolderOpen } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

async function PublicProject({ itemId }: { itemId: string }) {
  const item = await getItem(itemId);

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/public-projects">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Public Projects
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            <T.H1>{item.name}</T.H1>
          </div>
          <T.Subtle>{item.description}</T.Subtle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <T.Small className="text-muted-foreground">
                Created on {new Date(item.created_at).toLocaleDateString()}
              </T.Small>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/public-projects">
            <Button variant="outline">Back to Public Projects</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

function PublicProjectSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Skeleton className="h-10 w-32" />
      </div>
      <Card>
        <CardHeader>
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-48" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  );
}

export default async function PublicProjectPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params;

  return (
    <Suspense fallback={<PublicProjectSkeleton />}>
      <PublicProject itemId={itemId} />
    </Suspense>
  );
}
