import MainLayout from './main-layout';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainLayout>
            <div className="flex min-h-screen items-center justify-center">{children}</div>
        </MainLayout>
    );
}
