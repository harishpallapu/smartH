
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [color, setColor] = useState<string>('text-slate-700');

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(1)));
      
      // Set category and color based on BMI
      if (bmiValue < 18.5) {
        setCategory('Underweight');
        setColor('text-blue-500');
      } else if (bmiValue < 25) {
        setCategory('Normal weight');
        setColor('text-green-500');
      } else if (bmiValue < 30) {
        setCategory('Overweight');
        setColor('text-yellow-500');
      } else {
        setCategory('Obese');
        setColor('text-red-500');
      }
    }
  };

  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 border border-slate-200/70">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">BMI Calculator</CardTitle>
            <CardDescription>Calculate your Body Mass Index</CardDescription>
          </div>
          <Scale className="h-6 w-6 text-health-blue opacity-80" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="mb-6 mt-2 text-center">
            <motion.div
              key={bmi}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex flex-col items-center justify-center"
            >
              <span className="text-4xl font-bold mb-1">{bmi}</span>
              <span className={`text-sm font-medium ${color}`}>{category}</span>
            </motion.div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Height</label>
                <span className="text-sm text-slate-500">{height} cm</span>
              </div>
              <Slider
                value={[height]}
                min={120}
                max={220}
                step={1}
                onValueChange={(val) => setHeight(val[0])}
                className="py-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Weight</label>
                <span className="text-sm text-slate-500">{weight} kg</span>
              </div>
              <Slider
                value={[weight]}
                min={30}
                max={150}
                step={1}
                onValueChange={(val) => setWeight(val[0])}
                className="py-2"
              />
            </div>

            <div className="pt-2 grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">Normal BMI Range</p>
                <p className="text-sm font-medium">18.5 - 24.9</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">Healthy Weight</p>
                <p className="text-sm font-medium">{Math.round((height/100) * (height/100) * 21.7)} - {Math.round((height/100) * (height/100) * 24.9)} kg</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMICalculator;
