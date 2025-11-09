import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';
import { 
  ChevronLeft, 
  Star, 
  Save, 
  Trophy,
  Target,
  Shield,
  CheckCircle
} from 'lucide-react';

interface PlayerRatingPanelProps {
  onBack: () => void;
}

const matchesForRating = [
  {
    id: 1,
    matchDate: '2024-01-15',
    teams: 'Mumbai Warriors vs Chennai Lions',
    ground: 'Central Cricket Ground',
    result: 'Mumbai Warriors won by 45 runs',
    players: [
      { id: 1, name: 'Rajesh Kumar', role: 'All-Rounder', team: 'Mumbai Warriors' },
      { id: 2, name: 'Arjun Patel', role: 'Batsman', team: 'Mumbai Warriors' },
      { id: 3, name: 'Vikram Singh', role: 'Bowler', team: 'Mumbai Warriors' },
      { id: 4, name: 'Suresh Kumar', role: 'Batsman', team: 'Chennai Lions' },
      { id: 5, name: 'Ravi Sharma', role: 'All-Rounder', team: 'Chennai Lions' },
      { id: 6, name: 'Amit Patel', role: 'Wicket Keeper', team: 'Chennai Lions' }
    ]
  },
  {
    id: 2,
    matchDate: '2024-01-14',
    teams: 'Delhi Challengers vs Bangalore Tigers',
    ground: 'Sports Complex Arena',
    result: 'Delhi Challengers won by 6 wickets',
    players: [
      { id: 7, name: 'Rohit Gupta', role: 'Batsman', team: 'Delhi Challengers' },
      { id: 8, name: 'Kiran Kumar', role: 'Bowler', team: 'Delhi Challengers' },
      { id: 9, name: 'Manoj Singh', role: 'All-Rounder', team: 'Bangalore Tigers' },
      { id: 10, name: 'Praveen Reddy', role: 'Wicket Keeper', team: 'Bangalore Tigers' }
    ]
  }
];

interface PlayerRating {
  playerId: number;
  batting: number;
  bowling: number;
  fielding: number;
  overall: number;
  comments: string;
  badges: string[];
}

export function PlayerRatingPanel({ onBack }: PlayerRatingPanelProps) {
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [ratings, setRatings] = useState<{ [key: number]: PlayerRating }>({});
  const [submittedMatches, setSubmittedMatches] = useState<number[]>([]);

  const handleRatingChange = (playerId: number, category: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [category]: value,
        overall: category === 'overall' ? value : prev[playerId]?.overall || 3
      }
    }));
  };

  const handleCommentsChange = (playerId: number, comments: string) => {
    setRatings(prev => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        comments
      }
    }));
  };

  const assignBadge = (playerId: number, rating: PlayerRating) => {
    const badges = [];
    const avgSkill = (rating.batting + rating.bowling + rating.fielding) / 3;
    
    if (avgSkill >= 4.5) badges.push('Pro');
    else if (avgSkill >= 3.5) badges.push('Weekend Warrior');
    else badges.push('Rookie');
    
    if (rating.batting >= 4.5) badges.push('Batting Star');
    if (rating.bowling >= 4.5) badges.push('Strike Master');
    if (rating.fielding >= 4.5) badges.push('Safe Hands');
    
    return badges;
  };

  const submitRatings = (matchId: number) => {
    const match = matchesForRating.find(m => m.id === matchId);
    if (!match) return;

    // Assign badges based on ratings
    const updatedRatings = { ...ratings };
    match.players.forEach(player => {
      if (updatedRatings[player.id]) {
        updatedRatings[player.id].badges = assignBadge(player.id, updatedRatings[player.id]);
      }
    });

    setRatings(updatedRatings);
    setSubmittedMatches(prev => [...prev, matchId]);
    setSelectedMatch(null);
    
    alert('Player ratings submitted successfully! Players will be notified and leaderboard will be updated.');
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingIcon = (category: string) => {
    switch (category) {
      case 'batting': return Target;
      case 'bowling': return Trophy;
      case 'fielding': return Shield;
      default: return Star;
    }
  };

  if (selectedMatch) {
    const match = matchesForRating.find(m => m.id === selectedMatch);
    if (!match) return null;

    return (
      <div className="pb-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 pt-12">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => setSelectedMatch(null)}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Rate Players</h1>
              <p className="text-sm text-gray-600">{match.teams}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>{match.matchDate}</strong> • {match.ground}
            </p>
            <p className="text-sm text-green-600 mt-1">{match.result}</p>
          </div>
        </div>

        {/* Players Rating Form */}
        <div className="px-6 py-6">
          <div className="space-y-6">
            {match.players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">{player.name}</h3>
                      <p className="text-sm text-gray-600">{player.role} • {player.team}</p>
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  </div>

                  <div className="space-y-4">
                    {/* Batting Rating */}
                    <div>
                      <div className="flex items-center mb-2">
                        <Target className="w-4 h-4 mr-2 text-blue-500" />
                        <Label>Batting Performance</Label>
                        <span className={`ml-auto text-sm font-medium ${getRatingColor(ratings[player.id]?.batting || 3)}`}>
                          {ratings[player.id]?.batting || 3}/5
                        </span>
                      </div>
                      <Slider
                        value={[ratings[player.id]?.batting || 3]}
                        onValueChange={(value) => handleRatingChange(player.id, 'batting', value[0])}
                        max={5}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                    </div>

                    {/* Bowling Rating */}
                    <div>
                      <div className="flex items-center mb-2">
                        <Trophy className="w-4 h-4 mr-2 text-orange-500" />
                        <Label>Bowling Performance</Label>
                        <span className={`ml-auto text-sm font-medium ${getRatingColor(ratings[player.id]?.bowling || 3)}`}>
                          {ratings[player.id]?.bowling || 3}/5
                        </span>
                      </div>
                      <Slider
                        value={[ratings[player.id]?.bowling || 3]}
                        onValueChange={(value) => handleRatingChange(player.id, 'bowling', value[0])}
                        max={5}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                    </div>

                    {/* Fielding Rating */}
                    <div>
                      <div className="flex items-center mb-2">
                        <Shield className="w-4 h-4 mr-2 text-green-500" />
                        <Label>Fielding Performance</Label>
                        <span className={`ml-auto text-sm font-medium ${getRatingColor(ratings[player.id]?.fielding || 3)}`}>
                          {ratings[player.id]?.fielding || 3}/5
                        </span>
                      </div>
                      <Slider
                        value={[ratings[player.id]?.fielding || 3]}
                        onValueChange={(value) => handleRatingChange(player.id, 'fielding', value[0])}
                        max={5}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                    </div>

                    {/* Overall Rating */}
                    <div>
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        <Label>Overall Performance</Label>
                        <span className={`ml-auto text-sm font-medium ${getRatingColor(ratings[player.id]?.overall || 3)}`}>
                          {ratings[player.id]?.overall || 3}/5
                        </span>
                      </div>
                      <Slider
                        value={[ratings[player.id]?.overall || 3]}
                        onValueChange={(value) => handleRatingChange(player.id, 'overall', value[0])}
                        max={5}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                    </div>

                    {/* Comments */}
                    <div>
                      <Label htmlFor={`comments-${player.id}`}>Comments (Optional)</Label>
                      <Textarea
                        id={`comments-${player.id}`}
                        placeholder="Add specific feedback about this player's performance..."
                        value={ratings[player.id]?.comments || ''}
                        onChange={(e) => handleCommentsChange(player.id, e.target.value)}
                        className="mt-2 min-h-[80px]"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 sticky bottom-6">
            <Button 
              onClick={() => submitRatings(match.id)}
              className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-3"
            >
              <Save className="w-4 h-4 mr-2" />
              Submit All Ratings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 pt-12">
        <div className="flex items-center mb-4">
          <button 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Player Ratings</h1>
        </div>

        <p className="text-gray-600">Rate player performance after each match to update their profiles and leaderboard standings.</p>
      </div>

      {/* Matches List */}
      <div className="px-6 py-6">
        <div className="space-y-4">
          {matchesForRating.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-4 hover:shadow-lg transition-shadow ${
                submittedMatches.includes(match.id) ? 'opacity-60' : ''
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{match.teams}</h3>
                      {submittedMatches.includes(match.id) && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{match.matchDate} • {match.ground}</p>
                    <p className="text-sm text-green-600 mt-1">{match.result}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Players to rate: {match.players.length}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {match.players.slice(0, 3).map((player) => (
                      <Badge key={player.id} variant="outline" className="text-xs">
                        {player.name}
                      </Badge>
                    ))}
                    {match.players.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{match.players.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {!submittedMatches.includes(match.id) ? (
                  <Button 
                    onClick={() => setSelectedMatch(match.id)}
                    className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]"
                    size="sm"
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Rate Players
                  </Button>
                ) : (
                  <div className="flex items-center justify-center text-green-600 text-sm py-2">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span>Ratings submitted</span>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {matchesForRating.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matches to rate</h3>
            <p className="text-gray-600">Completed matches will appear here for player rating.</p>
          </div>
        )}
      </div>
    </div>
  );
}