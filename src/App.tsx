import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { Suspense } from 'react';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: { suspense: true, refetchOnWindowFocus: false, retry: false },
        mutations: { retry: false }
    }
});

export default function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Router />
                </Suspense>
            </QueryClientProvider>
        </BrowserRouter>
    );
}
