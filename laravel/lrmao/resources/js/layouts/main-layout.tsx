import { Toaster } from '@/components/ui/sonner';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { status } = usePage<SharedData>().props;
    useEffect(() => {
        if (status) {
            toast(status);
        }
    }, [status]);

    return (
        <div>
            {children}
            <Toaster />
        </div>
    );
}
