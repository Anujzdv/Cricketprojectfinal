import React from 'react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Users, MapPin, Trophy, ChevronRight, ChevronLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Users,
    title: "Find Players & Teams Near You",
    description: "Connect with cricket enthusiasts in your area. Find players based on skill level, position, and availability.",
    image: "https://images.unsplash.com/photo-1593766821405-f605e0f9535f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwcGxheWVycyUyMHRlYW0lMjBzcG9ydHxlbnwxfHx8fDE3NTgxMDA5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: MapPin,
    title: "Book Grounds & Academies",
    description: "Discover and book cricket grounds and academies near you. Check availability and book your perfect match venue.",
    image: "https://images.unsplash.com/photo-1702957317929-cd95c4fefbb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwZ3JvdW5kJTIwc3RhZGl1bSUyMGZpZWxkfGVufDF8fHx8MTc1ODEwMDk1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: Trophy,
    title: "Get Rated & Track Your Skills",
    description: "Build your cricket profile with coach ratings and skill tracking. Earn badges and climb the leaderboards.",
    image: "https://images.unsplash.com/photo-1687742909721-cb8dc3361e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwYmF0JTIwYmFsbCUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTgxMDA5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pt-12">
        <button 
          onClick={skipOnboarding}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          Skip
        </button>
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-[#2E7D32]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center h-full"
        >
          {/* Image */}
          <div className="w-full h-64 rounded-xl overflow-hidden mb-8 bg-gray-100">
            <ImageWithFallback
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Icon */}
          <div className="w-16 h-16 bg-[#2E7D32] rounded-full flex items-center justify-center mb-6">
            {slides[currentSlide].icon && 
              React.createElement(slides[currentSlide].icon, { className: "w-8 h-8 text-white" })
            }
          </div>

          {/* Text */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4 px-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed px-4">
            {slides[currentSlide].description}
          </p>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="p-6 pb-8">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          
          <Button
            onClick={nextSlide}
            className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white flex items-center px-8"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}