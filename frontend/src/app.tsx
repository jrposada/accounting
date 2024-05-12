import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FunctionComponent } from 'react';
import AppLayout from './ui/app-layout/app-layout';

const queryClient = new QueryClient();

const App: FunctionComponent = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppLayout />
        </QueryClientProvider>
    );
};

export default App;
