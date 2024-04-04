import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';

interface QueryClientProps {
  children: React.ReactNode
}

export const QueryProvider: React.FC<QueryClientProps> = ({ children }) => {

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 0 } }
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
};

