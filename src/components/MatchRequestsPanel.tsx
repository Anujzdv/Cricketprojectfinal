import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  ChevronLeft, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  MapPin,
  Calendar
} from 'lucide-react';

interface MatchRequestsPanelProps {
  onBack: () => void;
}

const matchRequests = [
  {
    id: 1,
    teamName: 'Mumbai Warriors',
    captain: 'Rajesh Kumar',
    captainPhone: '+91 98765 43210',
    players: 11,
    ground: 'Central Cricket Ground',
    date: '2024-01-20',
    time: '3:00 PM - 6:00 PM',
    status: 'pending',
    requestTime: '2 hours ago',
    message: 'Looking for a competitive match this weekend.'
  },
  {
    id: 2,
    teamName: 'Delhi Challengers',
    captain: 'Arjun Patel',
    captainPhone: '+91 87654 32109',
    players: 11,
    ground: 'Sports Complex Arena',
    date: '2024-01-21',
    time: '10:00 AM - 1:00 PM',
    status: 'pending',
    requestTime: '5 hours ago',
    message: 'First match of the season, hoping for good weather!'
  },
  {
    id: 3,
    teamName: 'Bangalore Tigers',
    captain: 'Vikram Singh',
    captainPhone: '+91 76543 21098',
    players: 11,
    ground: 'Elite Cricket Academy',
    date: '2024-01-19',
    time: '4:00 PM - 7:00 PM',
    status: 'approved',
    requestTime: '1 day ago',
    message: 'Regular weekend match with experienced players.'
  },
  {
    id: 4,
    teamName: 'Chennai Lions',
    captain: 'Suresh Kumar',
    captainPhone: '+91 65432 10987',
    players: 11,
    ground: 'Marina Cricket Ground',
    date: '2024-01-22',
    time: '2:00 PM - 5:00 PM',
    status: 'rejected',
    requestTime: '3 days ago',
    message: 'Weekend tournament preparation match.'
  }
];

export function MatchRequestsPanel({ onBack }: MatchRequestsPanelProps) {
  const [requests, setRequests] = useState(matchRequests);

  const handleApproveMatch = (matchId: number) => {
    setRequests(prev => prev.map(req => 
      req.id === matchId 
        ? { ...req, status: 'approved' }
        : req
    ));
    // In a real app, this would send a notification to the team
    alert('Match approved! Team has been notified and match is scheduled.');
  };

  const handleRejectMatch = (matchId: number) => {
    setRequests(prev => prev.map(req => 
      req.id === matchId 
        ? { ...req, status: 'rejected' }
        : req
    ));
    alert('Match rejected. Team has been notified.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

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
          <h1 className="text-xl font-bold text-gray-900">Match Requests</h1>
        </div>

        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
            <span>{pendingRequests.length} Pending</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            <span>{requests.filter(r => r.status === 'approved').length} Approved</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-yellow-500" />
              Pending Approval ({pendingRequests.length})
            </h2>
            
            <div className="space-y-4">
              {pendingRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 border-l-4 border-l-yellow-400">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{request.teamName}</h3>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600">Captain: {request.captain}</p>
                        <p className="text-sm text-gray-500">Requested {request.requestTime}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{request.date}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{request.time}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Users className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{request.players} players</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{request.ground}</span>
                        </div>
                      </div>
                    </div>

                    {request.message && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 italic">"{request.message}"</p>
                      </div>
                    )}

                    <div className="flex space-x-3">
                      <Button 
                        onClick={() => handleApproveMatch(request.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve Match
                      </Button>
                      <Button 
                        onClick={() => handleRejectMatch(request.id)}
                        variant="outline" 
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Processed Requests */}
        {processedRequests.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Recent Decisions ({processedRequests.length})
            </h2>
            
            <div className="space-y-3">
              {processedRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 opacity-80">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">{request.teamName}</h4>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {request.date} • {request.ground}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{request.requestTime}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {requests.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No match requests</h3>
            <p className="text-gray-600">New match requests will appear here for your approval.</p>
          </div>
        )}
      </div>
    </div>
  );
}