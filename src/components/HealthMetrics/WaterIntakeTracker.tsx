
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplet, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WaterIntakeTracker: React.FC = () => {
  const [glasses, setGlasses] = useState(3);
  const [lastAction, setLastAction] = useState<'add' | 'remove' | null>(null);
  const dailyGoal = 8;

  const addGlass = () => {
    setLastAction('add');
    setGlasses(prev => Math.min(prev + 1, 12));
  };

  const removeGlass = () => {
    setLastAction('remove');
    setGlasses(prev => Math.max(prev - 1, 0));
  };

  const progressPercentage = (glasses / dailyGoal) * 100;

  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 border border-slate-200/70">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Water Intake</CardTitle>
            <CardDescription>Track your daily hydration</CardDescription>
          </div>
          <Droplet className="h-6 w-6 text-blue-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
            
            <svg viewBox="0 0 100 100" className="absolute inset-0 rotate-90 transform">
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progressPercentage / 100 }}
                transition={{ duration: 1, type: "spring" }}
                cx="50"
                cy="50"
                r="46"
                strokeWidth="8"
                stroke="#3b82f6"
                fill="none"
                strokeLinecap="round"
                className="drop-shadow-md"
              />
            </svg>
            
            <motion.div 
              className="absolute inset-0 flex items-center justify-center text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <p className="text-3xl font-bold text-blue-500">{glasses}</p>
                <p className="text-xs text-slate-500">of {dailyGoal} glasses</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="flex justify-between gap-4 mb-6">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={removeGlass}
            disabled={glasses <= 0}
            className="flex-1 border-slate-200"
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={addGlass}
            className="flex-1 border-slate-200"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="relative h-12 bg-slate-100 rounded-lg overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
              {progressPercentage.toFixed(0)}% of daily goal
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={lastAction}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-50 p-3 rounded-lg"
            >
              {lastAction === 'add' ? (
                <p className="text-sm text-blue-700">Great job staying hydrated! 💧</p>
              ) : lastAction === 'remove' ? (
                <p className="text-sm text-slate-700">Adjusted your water intake.</p>
              ) : (
                <p className="text-sm text-slate-700">
                  Try to drink 8 glasses of water each day for optimal health.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterIntakeTracker;
