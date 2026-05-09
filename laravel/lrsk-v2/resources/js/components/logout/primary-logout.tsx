import PrimaryButton from '@/components/button/primary-button';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useCallback } from 'react';

export default function PrimaryLogout() {
    const { post, processing } = useForm();

    const logout = useCallback(() => {
        post('logout');
    }, []);

    return (
        <PrimaryButton onClick={logout} addClasses="w-full flex items-center justify-center gap-1" disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Logout
        </PrimaryButton>
    );
}
