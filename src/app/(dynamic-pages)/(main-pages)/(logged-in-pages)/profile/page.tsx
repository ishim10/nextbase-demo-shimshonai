import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { T } from '@/components/ui/Typography';
import { getCachedLoggedInVerifiedSupabaseUser } from '@/rsc-data/supabase';
import { Calendar, Database, Lock, User } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ProfileActions } from './ProfileActions';

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}

function getInitials(name: string | null): string {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

async function ProfileContent() {
  const userData = await getCachedLoggedInVerifiedSupabaseUser();

  if (!userData) {
    redirect('/login');
  }

  const user = userData.user;

  // Mock data for missing fields
  const mockData = {
    fullName:
      user.user_metadata?.full_name || user.user_metadata?.name || 'User',
    dateJoined: user.created_at
      ? new Date(user.created_at)
      : new Date('2024-01-01'),
    lastLogin: user.last_sign_in_at
      ? new Date(user.last_sign_in_at)
      : new Date(),
    totalProjects: 3,
    totalDatasets: 5,
  };

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-lg font-semibold">
                {getInitials(mockData.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <T.H2>{mockData.fullName}</T.H2>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className="h-6 flex items-center gap-1"
                >
                  <User className="h-3 w-3" /> Active
                </Badge>
                <T.Subtle>{user.email}</T.Subtle>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <T.Small className="text-muted-foreground">Date Joined</T.Small>
                <T.P>
                  {mockData.dateJoined.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </T.P>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <T.Small className="text-muted-foreground">Last Login</T.Small>
                <T.P>
                  {mockData.lastLogin.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </T.P>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <T.H4>Total Projects</T.H4>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <T.H2>{mockData.totalProjects}</T.H2>
            <T.Small className="text-muted-foreground">
              Active projects in your workspace
            </T.Small>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <T.H4>Total Datasets</T.H4>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <T.H2>{mockData.totalDatasets}</T.H2>
            <T.Small className="text-muted-foreground">
              Datasets uploaded to your account
            </T.Small>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <ProfileActions />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <T.H1>Profile</T.H1>
        <T.Subtle>
          Manage your account settings and view your information
        </T.Subtle>
      </div>

      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
