import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart2, Users, Trophy, Star, Search, TrendingUp, Activity, Target } from 'lucide-react';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Mock player data - in a real app, this would come from an API
  const players = [
    { id: 1, name: "Erling Haaland", team: "Manchester City", position: "Striker", rating: "8.9" },
    { id: 2, name: "Jude Bellingham", team: "Real Madrid", position: "Midfielder", rating: "8.6" },
    { id: 3, name: "Kylian Mbappé", team: "PSG", position: "Forward", rating: "8.8" }
  ];

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayerSelect = (playerId: number) => {
    setShowResults(false);
    const selectedPlayer = players.find(p => p.id === playerId);
    
    // Add a brief delay for the animation
    setTimeout(() => {
      navigate(`/dashboard?player=${playerId}`);
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section with Search */}
      <section className="relative text-center py-16 mb-12">
        <div className="slide-in opacity-0" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 neon-text tracking-wider">
            Next-Gen Football Analytics
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto font-light">
            Advanced ML-powered insights for player performance, scouting, and match predictions
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 slide-in opacity-0" style={{ animationDelay: '0.4s' }}>
          <div className="relative">
            <div className="flex items-center bg-[#111111] border border-[#222222] rounded-lg p-2 transition-all duration-300 focus-within:border-[#22c55e] focus-within:shadow-lg focus-within:shadow-[#22c55e]/10">
              <Search className="text-[#22c55e] w-5 h-5 ml-2" />
              <input
                type="text"
                placeholder="Search for a player..."
                className="w-full px-4 py-2 bg-transparent text-gray-300 focus:outline-none font-medium"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
              />
            </div>

            {/* Search Results */}
            {showResults && searchQuery && (
              <div className="absolute w-full mt-2 bg-[#111111]/90 border border-[#222222] rounded-lg search-results z-50">
                {filteredPlayers.map(player => (
                  <div
                    key={player.id}
                    className="search-result-item p-4 cursor-pointer"
                    onClick={() => handlePlayerSelect(player.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="player-name text-lg mb-1">{player.name}</p>
                        <div className="flex items-center text-sm text-gray-400">
                          <span className="mr-3">{player.team}</span>
                          <span className="px-2 py-1 rounded-full bg-[#22c55e]/10 text-[#22c55e]">
                            {player.position}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="text-[#22c55e] w-4 h-4 mr-1" />
                        <span className="text-[#22c55e] font-semibold">{player.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Featured Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 slide-in opacity-0" style={{ animationDelay: '0.6s' }}>
          <div className="bg-[#111111] p-6 rounded-lg border border-[#222222] hover-glow">
            <div className="flex items-center justify-center mb-4">
              <Activity className="text-[#22c55e] w-8 h-8" />
            </div>
            <p className="text-3xl font-bold neon-text mb-2">95%</p>
            <p className="text-gray-400">Prediction Accuracy</p>
          </div>
          
          <div className="bg-[#111111] p-6 rounded-lg border border-[#222222] hover-glow">
            <div className="flex items-center justify-center mb-4">
              <Users className="text-[#22c55e] w-8 h-8" />
            </div>
            <p className="text-3xl font-bold neon-text mb-2">10K+</p>
            <p className="text-gray-400">Players Analyzed</p>
          </div>
          
          <div className="bg-[#111111] p-6 rounded-lg border border-[#222222] hover-glow">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="text-[#22c55e] w-8 h-8" />
            </div>
            <p className="text-3xl font-bold neon-text mb-2">500+</p>
            <p className="text-gray-400">Clubs</p>
          </div>
          
          <div className="bg-[#111111] p-6 rounded-lg border border-[#222222] hover-glow">
            <div className="flex items-center justify-center mb-4">
              <Target className="text-[#22c55e] w-8 h-8" />
            </div>
            <p className="text-3xl font-bold neon-text mb-2">50+</p>
            <p className="text-gray-400">Leagues</p>
          </div>
        </div>

        {/* Featured Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 slide-in opacity-0" style={{ animationDelay: '0.8s' }}>
          <div className="bg-[#111111] rounded-lg border border-[#222222] overflow-hidden hover-glow">
            <img 
              src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800"
              alt="Player Analysis"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Player Analysis</h3>
              <p className="text-gray-400 mb-4">Advanced statistics and performance metrics for players worldwide</p>
              <Link
                to="/dashboard"
                className="inline-block px-4 py-2 bg-[#22c55e] text-black rounded-md hover:bg-[#16a34a] transition-colors"
              >
                Explore Stats
              </Link>
            </div>
          </div>

          <div className="bg-[#111111] rounded-lg border border-[#222222] overflow-hidden hover-glow">
            <img 
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800"
              alt="Potential Players"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Rising Stars</h3>
              <p className="text-gray-400 mb-4">Discover the next generation of football talent</p>
              <Link
                to="/potential-players"
                className="inline-block px-4 py-2 bg-[#22c55e] text-black rounded-md hover:bg-[#16a34a] transition-colors"
              >
                View Players
              </Link>
            </div>
          </div>

          <div className="bg-[#111111] rounded-lg border border-[#222222] overflow-hidden hover-glow">
            <img 
              src="https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800"
              alt="Youth Development"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Youth Academy</h3>
              <p className="text-gray-400 mb-4">Track the progress of emerging youth talents</p>
              <Link
                to="/youth-players"
                className="inline-block px-4 py-2 bg-[#22c55e] text-black rounded-md hover:bg-[#16a34a] transition-colors"
              >
                Discover Talent
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;