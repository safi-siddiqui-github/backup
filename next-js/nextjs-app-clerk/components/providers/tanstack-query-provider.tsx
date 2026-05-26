"use client";

import { getTanstackQueryClient } from "@/lib/tanstack-react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export function TanstackQueryProvider({ children }: { children?: ReactNode }) {
  const queryClient = getTanstackQueryClient();

  // const [queryClient] = useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           staleTime: Infinity,
  //           refetchOnWindowFocus: false,
  //           retry: 1,
  //         },
  //       },
  //     }),
  // );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
