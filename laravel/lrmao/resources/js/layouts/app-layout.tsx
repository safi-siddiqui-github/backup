import { type ReactNode } from 'react';
import MainLayout from './main-layout';

// interface AppLayoutProps {
//     children: ReactNode;
//     breadcrumbs?: BreadcrumbItem[];
// }

export default ({ children }: { children: ReactNode }) => (
    <MainLayout>
        <div className="">{children}</div>
    </MainLayout>
);
// export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
//     <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
//         {children}
//     </AppLayoutTemplate>
// );
