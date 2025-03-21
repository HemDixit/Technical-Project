import React from 'react';
import { Star, TrendingUp, Award, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function PotentialPlayers() {
  const navigate = useNavigate();
  const potentialPlayers = [
    {
      id: "yamal",
      name: "Lamine Yamal",
      age: 16,
      position: "Right Winger",
      currentClub: "Barcelona",
      potentialRating: 94,
      growthRate: "Exceptional",
      image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: "zaire-emery",
      name: "Warren Zaïre-Emery",
      age: 17,
      position: "Midfielder",
      currentClub: "PSG",
      potentialRating: 92,
      growthRate: "Rapid",
      image: "https://images.unsplash.com/photo-1623776025811-fd139155a39b?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: "endrick",
      name: "Endrick",
      age: 17,
      position: "Striker",
      currentClub: "Palmeiras",
      potentialRating: 93,
      growthRate: "Exceptional",
      image: "https://images.unsplash.com/photo-1624956578878-21fe6b0a3b8b?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 neon-text">Potential Players</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {potentialPlayers.map((player, index) => (
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
                Rising Star
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
                  <span className="font-semibold">{player.potentialRating}</span>
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
                  <span className="font-semibold text-[#22c55e]">{player.growthRate}</span>
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

export default PotentialPlayers;