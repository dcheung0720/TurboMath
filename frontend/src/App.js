import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import MathProblems from './components/MathProblems';
import GameRoom from './components/GameRoom';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navigation/>
        <MathProblems/>
        <GameRoom/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
