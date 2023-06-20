import logo from './logo.svg';
import './App.css';
import Navigation from './components/navigation';
import MathProblems from './components/mathProblems';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navigation/>
        <MathProblems/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
