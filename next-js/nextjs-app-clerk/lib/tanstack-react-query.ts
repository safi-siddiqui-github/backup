// lib/react-query/query-client.ts
import { QueryClient } from "@tanstack/react-query";

// export const tanstackQueryCient = new QueryClient();

let browserQueryClient: QueryClient | undefined;

export function getTanstackQueryClient() {
  if (typeof window === "undefined") {
    // server (rarely used)
    return new QueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 30,
        },
      },
    });
  }

  return browserQueryClient;
}

/*
2. Why QueryClient feels similar (but is different)

React Query QueryClient is:

browser-side state manager
cache manager
request deduper

If you recreate it on every render → you lose cache.

But in Next.js App Router:

❌ WRONG (causes re-init every render)
function App() {
  const queryClient = new QueryClient(); // ❌ bad
  return <QueryClientProvider client={queryClient} />
}

3. Professional way (Next.js App Router)
✅ Create ONE global QueryClient (client-safe singleton)
lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // server (rarely used)
    return new QueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 30,
        },
      },
    });
  }

  return browserQueryClient;
}
 */
