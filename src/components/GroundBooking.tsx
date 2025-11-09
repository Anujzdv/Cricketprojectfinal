import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  ChevronLeft, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Calendar,
  IndianRupee,
  Map
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GroundBookingProps {
  onBack: () => void;
}

const grounds = [
  {
    id: 1,
    name: 'Central Cricket Ground',
    location: 'Bandra West, Mumbai',
    distance: '2.3 km',
    rating: 4.5,
    reviews: 128,
    price: 2500,
    image: "https://images.unsplash.com/photo-1702957317929-cd95c4fefbb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwZ3JvdW5kJTIwc3RhZGl1bSUyMGZpZWxkfGVufDF8fHx8MTc1ODEwMDk1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    facilities: ['Pavilion', 'Changing Rooms', 'Parking'],
    availability: 'Available',
    timeSlots: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM', '6:00 PM - 9:00 PM']
  },
  {
    id: 2,
    name: 'Sports Complex Arena',
    location: 'Andheri East, Mumbai',
    distance: '3.7 km',
    rating: 4.3,
    reviews: 95,
    price: 3000,
    image: "https://images.unsplash.com/photo-1702957317929-cd95c4fefbb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwZ3JvdW5kJTIwc3RhZGl1bSUyMGZpZWxkfGVufDF8fHx8MTc1ODEwMDk1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    facilities: ['Floodlights', 'Cafe', 'Equipment Rental'],
    availability: 'Limited',
    timeSlots: ['10:00 AM - 1:00 PM', '7:00 PM - 10:00 PM']
  },
  {
    id: 3,
    name: 'Elite Cricket Academy',
    location: 'Powai, Mumbai',
    distance: '5.2 km',
    rating: 4.8,
    reviews: 203,
    price: 4000,
    image: "https://images.unsplash.com/photo-1702957317929-cd95c4fefbb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwZ3JvdW5kJTIwc3RhZGl1bSUyMGZpZWxkfGVufDF8fHx8MTc1ODEwMDk1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    facilities: ['Professional Pitch', 'Video Analysis', 'Coach Available'],
    availability: 'Available',
    timeSlots: ['8:00 AM - 11:00 AM', '4:00 PM - 7:00 PM']
  }
];

export function GroundBooking({ onBack }: GroundBookingProps) {
  const [selectedGround, setSelectedGround] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [bookingForm, setBookingForm] = useState({
    date: '',
    timeSlot: '',
    players: '',
    teamName: '',
    contactNumber: ''
  });

  const handleBookGround = (ground: any) => {
    setSelectedGround(ground);
  };

  const handleConfirmBooking = () => {
    // Show confirmation
    alert('Booking request sent! You will receive confirmation shortly. Payment will be collected on-site.');
    setSelectedGround(null);
    setBookingForm({
      date: '',
      timeSlot: '',
      players: '',
      teamName: '',
      contactNumber: ''
    });
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating) 
              ? 'text-yellow-400 fill-current' 
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">
        {rating} ({grounds.find(g => g.rating === rating)?.reviews} reviews)
      </span>
    </div>
  );

  if (selectedGround) {
    return (
      <div className="pb-20">
        {/* Booking Form Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 pt-12">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => setSelectedGround(null)}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Book Ground</h1>
          </div>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={selectedGround.image}
                alt={selectedGround.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-medium text-gray-900">{selectedGround.name}</h2>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {selectedGround.location}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="px-6 py-6 space-y-6">
          <div>
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              value={bookingForm.teamName}
              onChange={(e) => setBookingForm({...bookingForm, teamName: e.target.value})}
              placeholder="Enter your team name"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="date">Match Date</Label>
            <Input
              id="date"
              type="date"
              value={bookingForm.date}
              onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="timeSlot">Time Slot</Label>
            <select
              id="timeSlot"
              value={bookingForm.timeSlot}
              onChange={(e) => setBookingForm({...bookingForm, timeSlot: e.target.value})}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            >
              <option value="">Select time slot</option>
              {selectedGround.timeSlots.map((slot: string) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="players">Number of Players</Label>
            <Input
              id="players"
              type="number"
              value={bookingForm.players}
              onChange={(e) => setBookingForm({...bookingForm, players: e.target.value})}
              placeholder="11"
              min="11"
              max="22"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              value={bookingForm.contactNumber}
              onChange={(e) => setBookingForm({...bookingForm, contactNumber: e.target.value})}
              placeholder="Enter contact number"
              className="mt-2"
            />
          </div>

          {/* Price Summary */}
          <Card className="p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Ground Fee (3 hours)</span>
              <span className="flex items-center">
                <IndianRupee className="w-4 h-4" />
                {selectedGround.price}
              </span>
            </div>
            <div className="flex items-center justify-between font-medium text-lg">
              <span>Total</span>
              <span className="flex items-center text-[#2E7D32]">
                <IndianRupee className="w-5 h-5" />
                {selectedGround.price}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Payment will be collected on-site
            </p>
          </Card>

          <Button 
            onClick={handleConfirmBooking}
            className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-3"
            disabled={!bookingForm.teamName || !bookingForm.date || !bookingForm.timeSlot || !bookingForm.players || !bookingForm.contactNumber}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 pt-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button 
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Book Ground</h1>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('map')}
            >
              <Map className="w-4 h-4 mr-1" />
              Map
            </Button>
          </div>
        </div>
      </div>

      {/* Grounds List */}
      <div className="px-6 py-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {grounds.length} grounds available near you
          </p>
        </div>

        <div className="space-y-4">
          {grounds.map((ground, index) => (
            <motion.div
              key={ground.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="h-48 bg-gray-200 relative">
                  <ImageWithFallback
                    src={ground.image}
                    alt={ground.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge 
                      className={`${
                        ground.availability === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {ground.availability}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{ground.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{ground.location} • {ground.distance}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-lg font-bold text-[#2E7D32]">
                        <IndianRupee className="w-4 h-4" />
                        {ground.price}
                      </div>
                      <p className="text-xs text-gray-600">per 3 hours</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    {renderStars(ground.rating)}
                  </div>

                  {/* Facilities */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {ground.facilities.map((facility) => (
                        <Badge key={facility} variant="secondary" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 mb-2 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Available Today:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {ground.timeSlots.map((slot) => (
                        <Badge key={slot} variant="outline" className="text-xs">
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleBookGround(ground)}
                      className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20]"
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Book Now
                    </Button>
                    <Button variant="outline" size="default">
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}