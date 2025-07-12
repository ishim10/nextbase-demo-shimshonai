import { T } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Table as TableType } from '@/types';
import { Clock, ExternalLink, Lock, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface ProjectsListProps {
  projects: TableType<'private_items'>[];
  showActions?: boolean;
}

export const ProjectsList = ({
  projects,
  showActions = true,
}: ProjectsListProps) => {
  return (
    <div className="space-y-8">
      {showActions && (
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <T.H2>Projects</T.H2>
              <Badge variant="outline" className="h-6 flex items-center gap-1">
                <Lock className="h-3 w-3" /> Secure
              </Badge>
            </div>
            <T.Subtle>
              These projects are only visible to logged in users
            </T.Subtle>
          </div>
          <Link href="/projects/new">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Create New Project
            </Button>
          </Link>
        </div>
      )}

      {projects.length ? (
        <Card className="shadow-sm border-muted/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === 'Active' ? 'default' : 'secondary'
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(project.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/projects/${project.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>No Projects Available</CardTitle>
            <CardDescription>
              You haven't created any projects yet. Create your first one!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/projects/new">
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Create Your First Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
