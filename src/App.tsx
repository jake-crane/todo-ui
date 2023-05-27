import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Todos from './components/Todos';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Todos</h1>
      <Todos />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
