import { AppRoutes } from '@/lib/general/routes';
import { Button } from '@/shadcn/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Auth App</CardTitle>
            <CardDescription>Sign In / Sign Up</CardDescription>
            <CardAction>
              <Button asChild>
                <Link href={AppRoutes.authPage}>Visit</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Showcasing authentication system</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
