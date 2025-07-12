import { T } from '@/components/ui/Typography';
import { CreatePrivateItemForm } from '../../dashboard/ClientPage';

export default function NewProjectPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <T.H1>Create New Project</T.H1>
        <T.Subtle>Add a new project that only you can access</T.Subtle>
      </div>
      <CreatePrivateItemForm />
    </div>
  );
}
