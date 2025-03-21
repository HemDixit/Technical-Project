import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Goal, Activity, Target, Shield, Crosshair, Save, Star, Trophy, Asterisk as Assist, Search } from 'lucide-react';
import { searchPlayers } from '../services/footballApi';

function AnimatedStat({ value, duration = 1500, label, icon: Icon, index = 0 }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const statRef = useRef(null);

  useEffect(() => {
    // Add a staggered delay based on index
    const timeout = setTimeout(() => {
      setIsActive(true);
    }, index * 100);
    
    return () => clearTimeout(timeout);
  }, [index]);

  useEffect(() => {
    if (value > 0 && !isAnimating) {
      setIsAnimating(true);
      const steps = 60;
      const increment = value / steps;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep < steps) {
          setCurrentValue(prev => {
            const next = prev + increment;
            return next > value ? value : next;
          });
          currentStep++;
        } else {
          setCurrentValue(value);
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [value, duration, isAnimating]);

  // Reset animation state when value changes to 0
  useEffect(() => {
    if (value === 0) {
      setCurrentValue(0);
      setIsAnimating(false);
    }
  }, [value]);

  const formattedValue = typeof value === 'string' ? value : 
    Number.isInteger(currentValue) ? currentValue.toFixed(0) : currentValue.toFixed(2);

  // Calculate animation progress for dynamic styling
  const progress = value > 0 ? (currentValue / value) : 0;
  const borderColor = `rgba(34, 197, 94, ${0.3 + progress * 0.5})`;
  const glowIntensity = progress * 8;
  const bgOpacity = 0.05 + (progress * 0.1);

  return (
    <div 
      ref={statRef}
      className={`bg-[#111111] p-4 rounded-lg border border-[#222222] transition-all duration-500 overflow-hidden ${
        isActive ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
      }`}
      style={{
        borderColor: isAnimating ? borderColor : '',
        boxShadow: isAnimating ? `0 0 ${glowIntensity}px rgba(34, 197, 94, ${progress * 0.3})` : '',
        transitionDelay: `${index * 100}ms`,
        background: isAnimating ? `linear-gradient(135deg, #111111 0%, rgba(34, 197, 94, ${bgOpacity}) 50%, #111111 100%)` : ''
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`text-[#22c55e] ${isAnimating ? 'icon-bounce' : ''}`}>
          <Icon size={24} />
        </div>
        <h3 className="text-sm font-medium text-gray-300">{label}</h3>
      </div>
      <p 
        className={`text-2xl font-semibold transition-all duration-300 ${
          isAnimating ? 'stat-glow scale-110' : ''
        }`}
        style={{
          color: `rgba(34, 197, 94, ${0.7 + progress * 0.3})`,
          textShadow: isAnimating ? `0 0 ${glowIntensity}px rgba(34, 197, 94, ${progress * 0.5})` : ''
        }}
      >
        {formattedValue}
      </p>
      
      {/* Progress bar for numerical stats */}
      {typeof value === 'number' && !isNaN(value) && value > 0 && (
        <div className="w-full h-1 bg-[#222222] mt-3 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#22c55e] rounded-full"
            style={{ 
              width: `${(currentValue / (typeof value === 'number' ? (value > 100 ? value : 100) : 100)) * 100}%`,
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>
      )}
    </div>
  );
}

function Dashboard() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('idle');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    scoringChance: 0,
    injuryRisk: 'Low (0%)',
    passingAccuracy: 0,
    expectedGoals: 0,
    predictedTackles: 0,
    shootingAccuracy: 0,
    savesPerMatch: 0,
    playerRating: 0,
    winProbability: 0,
    expectedAssists: 0
  });

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setShowResults(query.length > 0);
    
    if (!query) {
      resetStats();
      setSelectedPlayer(null);
      setSearchResults([]);
      return;
    }

    if (query.length >= 3) {
      setIsLoading(true);
      try {
        const players = await searchPlayers(query);
        setSearchResults(players);
      } catch (error) {
        console.error('Error searching players:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePlayerSelect = (player) => {
    setSearchQuery(player.player.name);
    setShowResults(false);
    setSelectedPlayer(player);
    
    // Convert API stats to our format
    const playerStats = {
      scoringChance: Math.round(player.statistics[0].goals.total || 0 * 10),
      injuryRisk: 'Low (8%)',
      passingAccuracy: Math.round(player.statistics[0].passes.accuracy || 0),
      expectedGoals: player.statistics[0].goals.total || 0,
      predictedTackles: player.statistics[0].tackles.total || 0,
      shootingAccuracy: Math.round(player.statistics[0].shots.on || 0),
      savesPerMatch: player.statistics[0].goals.saves || 0,
      playerRating: parseFloat(player.statistics[0].games.rating || 0),
      winProbability: Math.round(Math.random() * 30 + 60), // Example calculation
      expectedAssists: player.statistics[0].goals.assists || 0
    };

    resetStats();
    animateNewStats(playerStats);
  };

  const resetStats = () => {
    setAnimationPhase('resetting');
    setStats({
      scoringChance: 0,
      injuryRisk: 'Low (0%)',
      passingAccuracy: 0,
      expectedGoals: 0,
      predictedTackles: 0,
      shootingAccuracy: 0,
      savesPerMatch: 0,
      playerRating: 0,
      winProbability: 0,
      expectedAssists: 0
    });
  };

  const animateNewStats = (playerStats) => {
    setAnimationPhase('animating');
    setTimeout(() => {
      setStats(playerStats);
      setTimeout(() => {
        setAnimationPhase('idle');
      }, 2000);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Search Section */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div 
              className={`flex items-center bg-[#111111] border rounded-lg p-2 transition-all duration-500 ${
                isSearchFocused 
                  ? 'border-[#22c55e] shadow-lg shadow-[#22c55e]/20' 
                  : 'border-[#222222]'
              }`}
            >
              <Search className={`w-5 h-5 ml-2 transition-colors duration-300 ${
                isSearchFocused ? 'text-[#22c55e]' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search for a player..."
                className="w-full px-4 py-2 bg-transparent text-gray-300 focus:outline-none font-medium"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {isLoading && (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#22c55e] border-t-transparent" />
              )}
            </div>
            
            {showResults && searchResults.length > 0 && (
              <div className="absolute w-full mt-2 bg-[#111111]/90 border border-[#222222] rounded-lg search-results z-10 backdrop-blur-md">
                {searchResults.map((player, index) => (
                  <div
                    key={player.player.id}
                    className="p-4 cursor-pointer hover:bg-[#22c55e]/10 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handlePlayerSelect(player)}
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={player.player.photo} 
                        alt={player.player.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{player.player.name}</p>
                        <p className="text-sm text-gray-400">{player.statistics[0]?.team?.name}</p>
                      </div>
                      {player.statistics[0]?.games?.rating && (
                        <div className="ml-auto flex items-center bg-[#1a1a1a] px-2 py-1 rounded-full text-xs">
                          <Star className="text-[#22c55e] w-3 h-3 mr-1" />
                          <span>{parseFloat(player.statistics[0].games.rating).toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Player Header */}
      <div 
        className={`mb-8 p-6 bg-[#111111] rounded-lg border border-[#222222] slide-in ${
          selectedPlayer && animationPhase === 'animating' ? 'border-pulse' : ''
        }`}
      >
        {selectedPlayer ? (
          <div className="flex items-center gap-6">
            <img 
              src={selectedPlayer.player.photo}
              alt={selectedPlayer.player.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#22c55e]"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2 neon-text">{selectedPlayer.player.name}</h1>
              <p className="text-gray-400">
                {selectedPlayer.statistics[0]?.team?.name} • {selectedPlayer.player.age} years
              </p>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2 neon-text">Player Dashboard</h1>
            <p className="text-gray-400">Search for a player to view their statistics and predictions</p>
          </>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6 staggered-animation">
        <AnimatedStat 
          value={stats.scoringChance}
          label="Scoring Chance"
          icon={Goal}
          index={0}
        />
        <AnimatedStat 
          value={stats.injuryRisk}
          label="Injury Risk"
          icon={Activity}
          index={1}
        />
        <AnimatedStat 
          value={stats.passingAccuracy}
          label="Passing Accuracy"
          icon={Target}
          index={2}
        />
        <AnimatedStat 
          value={stats.expectedGoals}
          label="Expected Goals"
          icon={Goal}
          index={3}
        />
        <AnimatedStat 
          value={stats.predictedTackles}
          label="Predicted Tackles"
          icon={Shield}
          index={4}
        />
        <AnimatedStat 
          value={stats.shootingAccuracy}
          label="Shooting Accuracy"
          icon={Crosshair}
          index={5}
        />
        <AnimatedStat 
          value={stats.savesPerMatch}
          label="Saves per Match"
          icon={Save}
          index={6}
        />
        <AnimatedStat 
          value={stats.playerRating}
          label="Player Rating"
          icon={Star}
          index={7}
        />
        <AnimatedStat 
          value={stats.winProbability}
          label="Win Probability"
          icon={Trophy}
          index={8}
        />
        <AnimatedStat 
          value={stats.expectedAssists}
          label="Expected Assists"
          icon={Assist}
          index={9}
        />
      </div>

      {/* Performance Chart */}
      <div 
        className={`bg-[#111111] p-6 rounded-lg border border-[#222222] hover-glow mt-6 fade-in ${
          selectedPlayer && animationPhase === 'animating' ? 'gradient-bg' : ''
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Performance Trends</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          {selectedPlayer ? 
            `Interactive performance chart for ${selectedPlayer.player.name} will be displayed here` :
            "Search for a player to view performance trends"
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;