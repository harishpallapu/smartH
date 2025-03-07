
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Sunrise, Sunset } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SleepTracker: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const [sleepData] = useState(() => {
    return days.map(day => {
      const hours = 5 + Math.random() * 4; // Between 5 and 9 hours
      const quality = Math.floor(60 + Math.random() * 40); // Between 60 and 100%
      
      return {
        day,
        hours: parseFloat(hours.toFixed(1)),
        quality
      };
    });
  });
  
  const avgSleepHours = parseFloat((sleepData.reduce((acc, data) => acc + data.hours, 0) / sleepData.length).toFixed(1));
  const avgSleepQuality = Math.round(sleepData.reduce((acc, data) => acc + data.quality, 0) / sleepData.length);
  
  const getSleepQualityCategory = (quality: number) => {
    if (quality < 70) return { text: 'Poor', color: 'text-red-500' };
    if (quality < 80) return { text: 'Fair', color: 'text-yellow-500' };
    if (quality < 90) return { text: 'Good', color: 'text-green-500' };
    return { text: 'Excellent', color: 'text-blue-500' };
  };
  
  const qualityCategory = getSleepQualityCategory(avgSleepQuality);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md text-sm border border-slate-100">
          <p className="font-medium">{payload[0].payload.day}</p>
          <p className="text-health-blue">{payload[0].value} hours</p>
          <p className="text-slate-500">
            Quality: {payload[0].payload.quality}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 border border-slate-200/70">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Sleep Tracker</CardTitle>
            <CardDescription>Monitor your sleep patterns</CardDescription>
          </div>
          <Moon className="h-6 w-6 text-indigo-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 text-center"
          >
            <div className="opacity-60 mb-1">
              <Sunset className="h-5 w-5 mx-auto" />
            </div>
            <p className="text-xs text-slate-500 mb-1">Average Sleep</p>
            <p className="text-2xl font-semibold text-indigo-600">{avgSleepHours}h</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 text-center"
          >
            <div className="opacity-60 mb-1">
              <Sunrise className="h-5 w-5 mx-auto" />
            </div>
            <p className="text-xs text-slate-500 mb-1">Sleep Quality</p>
            <p className="text-2xl font-semibold text-indigo-600">{avgSleepQuality}%</p>
            <p className={`text-xs ${qualityCategory.color}`}>{qualityCategory.text}</p>
          </motion.div>
        </div>
        
        <div className="h-[180px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sleepData}
              margin={{
                top: 5,
                right: 5,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 10 }} 
                axisLine={false} 
              />
              <YAxis 
                domain={[0, 10]} 
                tick={{ fontSize: 10 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="hours" 
                fill="#8b5cf6" 
                radius={[4, 4, 0, 0]} 
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 pt-2 space-y-3">
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-xs text-slate-500 mb-1">Sleep Recommendations</p>
            <p className="text-sm">
              Adults should aim for 7-9 hours of quality sleep per night for optimal health.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Bedtime</p>
              <p className="text-sm font-medium">10:30 PM</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Wake Up</p>
              <p className="text-sm font-medium">6:30 AM</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepTracker;
