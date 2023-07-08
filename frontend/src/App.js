import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import GameRoom from './components/GameRoom';
import HomePage from './components/HomePage';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter as Router, Route, Link, Routes,  Outlet  } from 'react-router-dom';


const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Navigation/>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/MathProblems/:id" element={<GameRoom />}/>
          </Routes>
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
