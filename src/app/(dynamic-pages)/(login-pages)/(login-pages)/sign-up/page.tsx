import { REGISTRATION_CLOSED } from '@/constants';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { SignUp } from './Signup';

const SearchParamsSchema = z.object({
  next: z.string().optional(),
  nextActionType: z.string().optional(),
});

export default async function SignUpPage(props: {
  searchParams: Promise<unknown>;
}) {
  if (REGISTRATION_CLOSED) {
    redirect('/registration-closed');
  }
  const searchParams = await props.searchParams;
  const { next, nextActionType } = SearchParamsSchema.parse(searchParams);
  return <SignUp next={next} nextActionType={nextActionType} />;
}
