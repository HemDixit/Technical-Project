import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BarChart2, Search, Menu, X, LogIn, UserPlus } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import PotentialPlayers from './pages/PotentialPlayers';
import TrendingPlayers from './pages/TrendingPlayers';
import PlayerProfile from './pages/PlayerProfile';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`font-medium transition-colors ${
        isActive ? 'text-[#22c55e]' : 'text-gray-400 hover:text-[#22c55e]'
      }`}
    >
      {children}
    </Link>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-[#22c55e] bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1920')] bg-fixed bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-black before:bg-opacity-75 before:z-0">
        {/* Header */}
        <header className="bg-[#111111]/90 backdrop-blur-md border-b border-[#222222] px-4 sm:px-6 py-4 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#22c55e] rounded-lg flex items-center justify-center float-animation">
                  <BarChart2 size={32} className="text-black transform -rotate-12" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold neon-text">Insight11</h1>
              </Link>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Mobile menu button */}
              <button 
                className="sm:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Desktop navigation */}
              <nav className="hidden sm:flex items-center gap-6">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/trending-players">Trending Players</NavLink>
                <NavLink to="/potential-players">Potential Players</NavLink>
                
                <div className="h-6 w-px bg-[#222222]"></div>
                
                <Link 
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-black transition-all duration-300"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                
                <Link 
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22c55e] text-black hover:bg-[#16a34a] transition-all duration-300"
                >
                  <UserPlus size={18} />
                  <span>Register</span>
                </Link>
              </nav>
              
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-[#222222] transition-colors">
                  <Search size={20} className="text-[#22c55e]" />
                </button>
                <div className="w-8 h-8 rounded-full bg-[#222222] pulse-animation overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <nav className="sm:hidden mt-4 flex flex-col gap-4 pb-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/trending-players">Trending Players</NavLink>
              <NavLink to="/potential-players">Potential Players</NavLink>
              <div className="h-px bg-[#222222] my-2"></div>
              <Link 
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-black transition-all duration-300"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link 
                to="/register"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22c55e] text-black hover:bg-[#16a34a] transition-all duration-300"
              >
                <UserPlus size={18} />
                <span>Register</span>
              </Link>
            </nav>
          )}
        </header>

        <main className="relative z-10 p-4 sm:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trending-players" element={<TrendingPlayers />} />
            <Route path="/potential-players" element={<PotentialPlayers />} />
            <Route path="/player/:id" element={<PlayerProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;