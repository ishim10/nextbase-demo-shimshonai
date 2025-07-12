import { T } from '@/components/ui/Typography';
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
import { Clock, ExternalLink, FolderOpen } from 'lucide-react';
import Link from 'next/link';

interface PublicProjectsListProps {
  items: TableType<'items'>[];
  showActions?: boolean;
}

export const PublicProjectsList = ({
  items,
  showActions = true,
}: PublicProjectsListProps) => {
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            <T.H2>Public Projects</T.H2>
          </CardTitle>
          <CardDescription>No public projects available yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <T.H3>No Public Projects</T.H3>
            <T.P className="text-muted-foreground mb-4">
              There are no public projects available at the moment.
            </T.P>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {showActions && (
        <CardHeader>
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            <T.H2>Public Projects</T.H2>
          </div>
          <CardDescription>
            Browse and explore public projects shared by the community
          </CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-sm">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/public-project/${item.id}`}>
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
      </CardContent>
    </Card>
  );
};
