import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { T } from '@/components/ui/Typography';
import { getPrivateItem } from '@/data/anon/privateItems';
import { ArrowLeft, Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

async function ProjectDetails({ projectId }: { projectId: string }) {
  const project = await getPrivateItem(projectId);

  return (
    <Card className="shadow-md border-t-4 border-t-primary">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> <span>Back to Projects</span>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <T.H2 className="mb-2">{project.name}</T.H2>
            <Badge
              variant={project.status === 'Active' ? 'default' : 'secondary'}
            >
              {project.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <T.Small className="text-muted-foreground">Description</T.Small>
            <T.P className="mt-2">{project.description}</T.P>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="h-4 w-4" />
              <span>
                Created on {new Date(project.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="h-4 w-4" />
              <span>
                Last updated {new Date(project.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" asChild>
          <Link href="/projects">Back to Projects</Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" /> Edit Project
          </Button>
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" /> Delete Project
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Loading skeleton component
function ProjectDetailsSkeleton() {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-32 mb-4" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-72 mb-2" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Skeleton className="h-10 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-36" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default async function ProjectDetailsPage(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const params = await props.params;
  const { id } = params;

  try {
    return (
      <div className="container mx-auto max-w-4xl py-8">
        <Suspense fallback={<ProjectDetailsSkeleton />}>
          <ProjectDetails projectId={id} />
        </Suspense>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
