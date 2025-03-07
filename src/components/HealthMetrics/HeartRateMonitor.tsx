
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HeartRateMonitor: React.FC = () => {
  const [heartRate, setHeartRate] = useState<number>(72);
  const [heartRateData, setHeartRateData] = useState<{ time: string; value: number }[]>([]);
  const [isBeating, setIsBeating] = useState<boolean>(false);

  // Simulate heart rate monitoring
  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0');
      const baseValue = 70;
      const randomVariation = Math.floor(Math.random() * 20) - 10; // -10 to +10
      return {
        time: `${hour}:00`,
        value: baseValue + randomVariation
      };
    });
    
    setHeartRateData(initialData);

    // Simulate changing heart rate every 3 seconds
    const interval = setInterval(() => {
      setIsBeating(true);
      
      // Random heart rate between 65-85
      const newHeartRate = Math.floor(Math.random() * 20) + 65;
      setHeartRate(newHeartRate);
      
      // Update the chart data
      setHeartRateData(prevData => {
        const newTime = new Date();
        const timeString = `${newTime.getHours().toString().padStart(2, '0')}:${newTime.getMinutes().toString().padStart(2, '0')}`;
        
        // Add new data point and remove oldest if we have more than 24 points
        const newData = [...prevData, { time: timeString, value: newHeartRate }];
        if (newData.length > 24) {
          newData.shift();
        }
        return newData;
      });
      
      // Reset beating animation
      setTimeout(() => {
        setIsBeating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getHeartRateCategory = (rate: number) => {
    if (rate < 60) return { text: 'Resting', color: 'text-blue-500' };
    if (rate < 70) return { text: 'Normal', color: 'text-green-500' };
    if (rate < 85) return { text: 'Elevated', color: 'text-yellow-500' };
    return { text: 'High', color: 'text-red-500' };
  };

  const category = getHeartRateCategory(heartRate);

  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 border border-slate-200/70">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Heart Rate</CardTitle>
            <CardDescription>Real-time monitoring</CardDescription>
          </div>
          <motion.div
            animate={isBeating ? { scale: 1.3 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Heart className="h-6 w-6 text-red-500" fill={isBeating ? "rgba(239, 68, 68, 0.8)" : "rgba(239, 68, 68, 0.2)"} />
          </motion.div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 mt-2 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={heartRate}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex flex-col items-center justify-center"
            >
              <span className="text-4xl font-bold flex items-center">
                {heartRate}
                <span className="text-lg ml-1">bpm</span>
              </span>
              <span className={`text-sm font-medium ${category.color}`}>{category.text}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="h-[180px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={heartRateData}
              margin={{
                top: 5,
                right: 5,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10 }} 
                interval={Math.ceil(heartRateData.length / 6)} 
                axisLine={false} 
              />
              <YAxis 
                domain={[50, 100]} 
                tick={{ fontSize: 10 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  border: 'none' 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0ea5e9" 
                strokeWidth={2} 
                dot={false} 
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-2 pt-2 grid grid-cols-2 gap-3">
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-xs text-slate-500 mb-1">Daily Average</p>
            <p className="text-sm font-medium">
              {Math.round(heartRateData.reduce((acc, item) => acc + item.value, 0) / heartRateData.length)} bpm
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-xs text-slate-500 mb-1">Resting Rate</p>
            <p className="text-sm font-medium">
              {Math.min(...heartRateData.map(item => item.value))} bpm
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeartRateMonitor;
