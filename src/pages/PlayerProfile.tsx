import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  TrendingUp, 
  Award, 
  Clock, 
  Target, 
  Shield, 
  Goal, 
  Activity,
  ArrowLeft,
  Share2,
  Heart,
  ChevronRight
} from 'lucide-react';

function PlayerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock player database - in a real app, this would come from an API
  const playersDatabase = {
    // Trending Players
    "osimhen": {
      name: "Victor Osimhen",
      age: 24,
      position: "Striker",
      currentClub: "Napoli",
      rating: 92,
      marketTrend: "Rising",
      image: `https://media.api-sports.io/football/players/3269.png`,
      stats: {
        goals: 28,
        assists: 4,
        matchesPlayed: 32,
        minutesPlayed: 2880,
        shotAccuracy: 68,
        passAccuracy: 79,
        dribbleSuccess: 65,
        aerialDuelsWon: 72
      },
      predictions: {
        nextMatchScore: "Very Likely to Score",
        injuryRisk: "Low (12%)",
        expectedGoals: 0.82,
        expectedAssists: 0.35,
        predictedRating: 8.4
      }
    },
    "bellingham": {
      name: "Jude Bellingham",
      age: 20,
      position: "Midfielder",
      currentClub: "Real Madrid",
      rating: 95,
      marketTrend: "Skyrocketing",
      image: `https://media.api-sports.io/football/players/1101.png`,
      stats: {
        goals: 15,
        assists: 12,
        matchesPlayed: 34,
        minutesPlayed: 3060,
        shotAccuracy: 72,
        passAccuracy: 89,
        dribbleSuccess: 78,
        aerialDuelsWon: 65
      },
      predictions: {
        nextMatchScore: "Likely to Score",
        injuryRisk: "Very Low (8%)",
        expectedGoals: 0.45,
        expectedAssists: 0.52,
        predictedRating: 8.7
      }
    },
    // Potential Players
    "yamal": {
      name: "Lamine Yamal",
      age: 16,
      position: "Right Winger",
      currentClub: "Barcelona",
      rating: 94,
      growthRate: "Exceptional",
      image: `https://media.api-sports.io/football/players/401173.png`,
      stats: {
        goals: 8,
        assists: 7,
        matchesPlayed: 25,
        minutesPlayed: 1850,
        shotAccuracy: 65,
        passAccuracy: 84,
        dribbleSuccess: 82,
        aerialDuelsWon: 45
      },
      predictions: {
        developmentTrajectory: "Elite Potential",
        injuryRisk: "Low (15%)",
        expectedGrowth: "Rapid",
        keyAttributes: ["Dribbling", "Vision", "Acceleration"],
        predictedRating: 8.2
      }
    }
  };

  const player = playersDatabase[id];

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Player Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-[#22c55e] text-black rounded-md hover:bg-[#16a34a] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-[#22c55e] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <div className="flex gap-4">
          <button className="p-2 rounded-full hover:bg-[#222222] transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-[#222222] transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#111111] rounded-lg border border-[#222222] overflow-hidden mb-8">
        <div className="relative h-64 md:h-96">
          <img 
            src={player.image}
            alt={player.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl font-bold mb-2 neon-text">{player.name}</h1>
            <div className="flex items-center gap-4 text-gray-300">
              <span>{player.position}</span>
              <span>•</span>
              <span>{player.currentClub}</span>
              <span>•</span>
              <span>Age: {player.age}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#111111] p-6 rounded-lg border border-[#222222] hover-glow">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-[#22c55e] w-5 h-5" />
            <h3 className="text-lg font-medium">Rating</h3>
          </div>
          <p className="text-3xl font-bold neon-text">{player.rating}</p>
        </div>

        {player.stats && (
          <>
            <div className="bg-[#111111] p-6 rounded-lg border border-[#222222] hover-glow">
              <div className="flex items-center gap-3 mb-4">
                <Goal className="text-[#22c55e] w-5 h-5" />
                <h3 className="text-lg font-medium">Goals</h3>
              </div>
              <p className="text-3xl font-bold neon-text">{player.stats.goals}</p>
            </div>

            <div className="bg-[#111111] p-6 rounded-lg border border-[#222222] hover-glow">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-[#22c55e] w-5 h-5" />
                <h3 className="text-lg font-medium">Shot Accuracy</h3>
              </div>
              <p className="text-3xl font-bold neon-text">{player.stats.shotAccuracy}%</p>
            </div>

            <div className="bg-[#111111] p-6 rounded-lg border border-[#222222] hover-glow">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-[#22c55e] w-5 h-5" />
                <h3 className="text-lg font-medium">Pass Accuracy</h3>
              </div>
              <p className="text-3xl font-bold neon-text">{player.stats.passAccuracy}%</p>
            </div>
          </>
        )}
      </div>

      {/* Predictions */}
      <div className="bg-[#111111] rounded-lg border border-[#222222] p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 neon-text">AI Predictions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {player.predictions && Object.entries(player.predictions).map(([key, value]) => (
            <div key={key} className="bg-[#1a1a1a] p-4 rounded-lg">
              <h3 className="text-gray-400 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <p className="text-lg font-semibold">
                {Array.isArray(value) ? value.join(', ') : value.toString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-[#111111] rounded-lg border border-[#222222] p-6">
        <h2 className="text-2xl font-bold mb-6 neon-text">Performance Trends</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Interactive performance chart will be displayed here
        </div>
      </div>
    </div>
  );
}

export default PlayerProfile;