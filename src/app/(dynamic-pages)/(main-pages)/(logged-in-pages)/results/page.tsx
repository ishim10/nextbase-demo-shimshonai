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
import { BarChart3, Eye, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

// Mock data for results - replace with actual data fetching
const mockResults = [
  {
    id: '1',
    name: 'Churn Prediction Results',
    project: { id: '1', name: 'Marketing Campaign' },
    modelName: 'XGBoost Classifier',
    dateGenerated: '2024-07-10T15:00:00Z',
    status: 'Completed',
  },
  {
    id: '2',
    name: 'Sales Forecast Q4',
    project: { id: '2', name: 'Q4 Analysis' },
    modelName: 'Prophet',
    dateGenerated: '2024-07-09T11:20:00Z',
    status: 'Pending',
  },
  {
    id: '3',
    name: 'User Segmentation',
    project: { id: '1', name: 'Marketing Campaign' },
    modelName: 'KMeans Clustering',
    dateGenerated: '2024-07-08T09:15:00Z',
    status: 'Failed',
  },
];

function ResultsListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-48" />
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

function statusColor(status: string) {
  switch (status) {
    case 'Completed':
      return 'default';
    case 'Pending':
      return 'outline';
    case 'Failed':
      return 'destructive';
    default:
      return 'secondary';
  }
}

async function ResultsListWrapper() {
  // In a real implementation, you would fetch results from the database
  // const results = await getAllResults();
  const results = mockResults;

  return (
    <div className="space-y-8">
      {results.length ? (
        <Card className="shadow-sm border-muted/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Result Name</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Model Name</TableHead>
                <TableHead>Date Generated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.name}</TableCell>
                  <TableCell>
                    <Link
                      href={`/projects/${result.project.id}`}
                      className="text-primary hover:underline"
                    >
                      {result.project.name}
                    </Link>
                  </TableCell>
                  <TableCell>{result.modelName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(result.dateGenerated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColor(result.status)}>
                      {result.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3.5 w-3.5" /> View
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
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
              <div>
                <T.H3>No Results Available</T.H3>
                <T.Subtle>
                  You haven't generated any results yet. Create your first one!
                </T.Subtle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Create Your First Result
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function ResultsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center gap-3">
        <T.H1>Results</T.H1>
        <Badge variant="outline" className="h-6 flex items-center gap-1">
          <BarChart3 className="h-3 w-3" /> Model Results
        </Badge>
      </div>
      <T.Subtle className="mb-8">
        View and manage all your model results
      </T.Subtle>

      <div className="flex justify-end mb-8">
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" /> Create New Result
        </Button>
      </div>

      <Suspense fallback={<ResultsListSkeleton />}>
        <ResultsListWrapper />
      </Suspense>
    </div>
  );
}
