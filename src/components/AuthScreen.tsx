import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Mail, Phone, Activity, Eye, EyeOff } from 'lucide-react';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  role: 'player' | 'coach';
  playerRole?: string;
}

interface AuthScreenProps {
  onComplete: (userData: UserInfo) => void;
}

export function AuthScreen({ onComplete }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    name: '',
    userRole: 'player' as 'player' | 'coach',
    playerRole: 'all-rounder'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create user info object to pass back
    const userData: UserInfo = {
      name: formData.name || (isLogin ? 'User' : ''),
      email: formData.email,
      phone: formData.phone,
      role: formData.userRole,
      playerRole: formData.playerRole
    };
    
    onComplete(userData);
  };

  const handleGoogleAuth = () => {
    // For Google auth, we'll use default data since we don't have the actual Google user info
    const userData: UserInfo = {
      name: 'Google User',
      email: 'user@gmail.com',
      phone: '+91 98765 43210',
      role: formData.userRole,
      playerRole: formData.playerRole
    };
    
    onComplete(userData);
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] pt-12 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <Activity className="w-8 h-8 text-[#2E7D32]" />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-white text-center mb-2"
        >
          Welcome to CrickConnect
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/90 text-center"
        >
          {isLogin ? 'Sign in to continue' : 'Create your cricket profile'}
        </motion.p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Toggle buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-center rounded-md transition-all ${
                isLogin 
                  ? 'bg-white text-[#2E7D32] shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-center rounded-md transition-all ${
                !isLogin 
                  ? 'bg-white text-[#2E7D32] shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mb-6">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="mt-2"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative mt-2">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Enter your phone number"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter your password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="userRole">I am a</Label>
                  <select
                    id="userRole"
                    value={formData.userRole}
                    onChange={(e) => setFormData({...formData, userRole: e.target.value as 'player' | 'coach'})}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                  >
                    <option value="player">Player</option>
                    <option value="coach">Coach</option>
                  </select>
                </div>

                {formData.userRole === 'player' && (
                  <div>
                    <Label htmlFor="playerRole">Preferred Playing Role</Label>
                    <select
                      id="playerRole"
                      value={formData.playerRole}
                      onChange={(e) => setFormData({...formData, playerRole: e.target.value})}
                      className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                    >
                      <option value="batsman">Batsman</option>
                      <option value="bowler">Bowler</option>
                      <option value="all-rounder">All-Rounder</option>
                      <option value="wicket-keeper">Wicket Keeper</option>
                    </select>
                  </div>
                )}

                {formData.userRole === 'coach' && (
                  <div>
                    <Label htmlFor="experience">Coaching Experience</Label>
                    <select
                      id="experience"
                      className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                    >
                      <option value="beginner">Beginner (0-2 years)</option>
                      <option value="intermediate">Intermediate (3-5 years)</option>
                      <option value="experienced">Experienced (5+ years)</option>
                      <option value="professional">Professional Coach</option>
                    </select>
                  </div>
                )}
              </>
            )}

            <Button 
              type="submit"
              className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-3"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="my-6">
            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-gray-500">or continue with</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleGoogleAuth}
            variant="outline"
            className="w-full py-3 border-gray-300 hover:bg-gray-50 mb-4"
          >
            <div className="w-5 h-5 mr-3 bg-red-500 rounded" />
            Google
          </Button>

          {isLogin && (
            <p className="text-center text-gray-600">
              Forgot your password?{' '}
              <button className="text-[#2E7D32] hover:underline">
                Reset here
              </button>
            </p>
          )}

          {/* Bottom spacing to ensure content is not cut off */}
          <div className="h-8"></div>
        </motion.div>
      </div>
    </div>
  );
}