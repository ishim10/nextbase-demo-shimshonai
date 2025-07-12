import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { T } from '@/components/ui/Typography';
import { Database, PlusCircle, Upload } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

// Mock data for datasets - replace with actual data fetching
const mockDatasets = [
  {
    id: '1',
    name: 'Customer Analytics Dataset',
    project: { id: '1', name: 'Marketing Campaign' },
    uploadedDate: '2024-01-15T10:30:00Z',
    uploadedBy: 'john.doe@example.com',
  },
  {
    id: '2',
    name: 'Sales Performance Data',
    project: { id: '2', name: 'Q4 Analysis' },
    uploadedDate: '2024-01-10T14:20:00Z',
    uploadedBy: 'jane.smith@example.com',
  },
  {
    id: '3',
    name: 'User Behavior Metrics',
    project: { id: '1', name: 'Marketing Campaign' },
    uploadedDate: '2024-01-08T09:15:00Z',
    uploadedBy: 'john.doe@example.com',
  },
];

function DatasetsListSkeleton() {
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

async function DatasetsListWrapper() {
  // In a real implementation, you would fetch datasets from the database
  // const datasets = await getAllDatasets();
  const datasets = mockDatasets;

  return (
    <div className="space-y-8">
      {datasets.length ? (
        <Card className="shadow-sm border-muted/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Dataset Name</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Uploaded Date</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell className="font-medium">{dataset.name}</TableCell>
                  <TableCell>
                    <Link
                      href={`/projects/${dataset.project.id}`}
                      className="text-primary hover:underline"
                    >
                      {dataset.project.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(dataset.uploadedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {dataset.uploadedBy}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Database className="h-3.5 w-3.5" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-8 w-8 text-muted-foreground" />
              <div>
                <T.H3>No Datasets Available</T.H3>
                <T.Subtle>
                  You haven't uploaded any datasets yet. Upload your first one!
                </T.Subtle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" /> Upload Your First Dataset
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function DatasetsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center gap-3">
        <T.H1>Datasets</T.H1>
        <Badge variant="outline" className="h-6 flex items-center gap-1">
          <Database className="h-3 w-3" /> Data
        </Badge>
      </div>
      <T.Subtle className="mb-8">
        Manage and view all your uploaded datasets
      </T.Subtle>

      <div className="flex justify-end mb-8">
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" /> Upload New Dataset
        </Button>
      </div>

      <Suspense fallback={<DatasetsListSkeleton />}>
        <DatasetsListWrapper />
      </Suspense>
    </div>
  );
}
