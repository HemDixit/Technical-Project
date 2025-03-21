import React from 'react';
import { Star, TrendingUp, Award, Clock, Users, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function TrendingPlayers() {
  const navigate = useNavigate();
  const trendingPlayers = [
    {
      id: "osimhen",
      name: "Victor Osimhen",
      age: 24,
      position: "Striker",
      currentClub: "Napoli",
      trendingRating: 92,
      marketTrend: "Rising",
      image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: "bellingham",
      name: "Jude Bellingham",
      age: 20,
      position: "Midfielder",
      currentClub: "Real Madrid",
      trendingRating: 95,
      marketTrend: "Skyrocketing",
      image: "https://images.unsplash.com/photo-1531547255897-f400dc1b7de2?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: "wirtz",
      name: "Florian Wirtz",
      age: 20,
      position: "Attacking Midfielder",
      currentClub: "Bayer Leverkusen",
      trendingRating: 91,
      marketTrend: "Rising",
      image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 neon-text">Trending Players</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trendingPlayers.map((player, index) => (
          <div 
            key={index} 
            className="bg-[#111111] rounded-lg border border-[#222222] hover-glow overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="relative">
              <img 
                src={player.image} 
                alt={player.name}
                className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute top-0 right-0 m-4 bg-[#22c55e] text-black px-3 py-1 rounded-full text-sm font-semibold">
                Hot Prospect
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1 neon-text">{player.name}</h3>
                  <p className="text-gray-400">{player.position}</p>
                </div>
                <div className="flex items-center bg-[#1a1a1a] px-3 py-1 rounded-full">
                  <Star className="text-[#22c55e] w-4 h-4 mr-1" />
                  <span className="font-semibold">{player.trendingRating}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="text-[#22c55e] w-4 h-4 mr-2" />
                  <span className="text-gray-400">Age: {player.age}</span>
                </div>
                <div className="flex items-center">
                  <Award className="text-[#22c55e] w-4 h-4 mr-2" />
                  <span className="text-gray-400">{player.currentClub}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="text-[#22c55e] w-4 h-4 mr-2" />
                  <span className="font-semibold text-[#22c55e]">{player.marketTrend}</span>
                </div>
                <button 
                  onClick={() => navigate(`/player/${player.id}`)}
                  className="group px-4 py-2 bg-[#22c55e] text-black rounded-md hover:bg-[#16a34a] transition-all duration-300 flex items-center"
                >
                  View Profile
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingPlayers;