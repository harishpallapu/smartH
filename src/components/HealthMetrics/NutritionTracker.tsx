
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Utensils, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type NutrientType = 'protein' | 'carbs' | 'fat';

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const NutritionTracker: React.FC = () => {
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  
  // Sample meals data
  const [meals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Breakfast',
      time: '7:30 AM',
      calories: 450,
      protein: 25,
      carbs: 45,
      fat: 15
    },
    {
      id: '2',
      name: 'Lunch',
      time: '12:30 PM',
      calories: 650,
      protein: 35,
      carbs: 60,
      fat: 22
    },
    {
      id: '3',
      name: 'Snack',
      time: '3:30 PM',
      calories: 150,
      protein: 5,
      carbs: 15,
      fat: 7
    }
  ]);
  
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);
  
  const nutrientData = [
    { name: 'Protein', value: totalProtein, color: '#10b981' },
    { name: 'Carbs', value: totalCarbs, color: '#3b82f6' },
    { name: 'Fat', value: totalFat, color: '#f59e0b' }
  ];
  
  const getNutrientColor = (type: NutrientType): string => {
    switch (type) {
      case 'protein': return 'bg-emerald-500';
      case 'carbs': return 'bg-blue-500';
      case 'fat': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };
  
  const toggleAddMeal = () => {
    setShowAddMeal(!showAddMeal);
    setSelectedMeal(null);
  };
  
  const handleMealClick = (meal: Meal) => {
    setSelectedMeal(meal);
    setShowAddMeal(false);
  };

  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 border border-slate-200/70">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Nutrition Tracker</CardTitle>
            <CardDescription>Monitor your daily intake</CardDescription>
          </div>
          <Utensils className="h-6 w-6 text-orange-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">Daily Calories</p>
            <p className="text-2xl font-semibold">{totalCalories} <span className="text-sm font-normal text-slate-500">kcal</span></p>
          </div>
          <div className="h-20 w-20">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={nutrientData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {nutrientData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}g`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Protein', value: `${totalProtein}g`, type: 'protein' as NutrientType },
            { label: 'Carbs', value: `${totalCarbs}g`, type: 'carbs' as NutrientType },
            { label: 'Fat', value: `${totalFat}g`, type: 'fat' as NutrientType }
          ].map((nutrient, index) => (
            <motion.div
              key={nutrient.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="bg-slate-50 p-2 rounded-lg text-center"
            >
              <div className={`h-2 w-12 mx-auto mb-1 rounded-full ${getNutrientColor(nutrient.type)}`} />
              <p className="text-xs text-slate-500">{nutrient.label}</p>
              <p className="text-sm font-medium">{nutrient.value}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Today's Meals</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={toggleAddMeal}
            >
              <Plus className="h-4 w-4 mr-1" />
              Log Meal
            </Button>
          </div>
          
          <AnimatePresence>
            {meals.map((meal, index) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleMealClick(meal)}
                className="bg-white p-3 rounded-lg border border-slate-100 mb-2 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{meal.name}</p>
                    <p className="text-xs text-slate-500">{meal.time} · {meal.calories} kcal</p>
                  </div>
                  <div className="flex space-x-1">
                    {['protein', 'carbs', 'fat'].map(type => (
                      <div 
                        key={type}
                        className={`h-2 w-2 rounded-full ${getNutrientColor(type as NutrientType)}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <AnimatePresence>
            {showAddMeal && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-50 p-3 rounded-lg mt-3">
                  <p className="text-sm text-center text-slate-500 mb-2">
                    The actual meal logging form would go here
                  </p>
                  <div className="flex justify-end">
                    <Button 
                      size="sm"
                      variant="outline"
                      className="mr-2"
                      onClick={toggleAddMeal}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={toggleAddMeal}
                    >
                      Add Meal
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {selectedMeal && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-50 p-3 rounded-lg mt-3">
                  <h4 className="font-medium mb-2">{selectedMeal.name} Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">Time</p>
                      <p>{selectedMeal.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Calories</p>
                      <p>{selectedMeal.calories} kcal</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Protein</p>
                      <p>{selectedMeal.protein}g</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Carbs</p>
                      <p>{selectedMeal.carbs}g</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Fat</p>
                      <p>{selectedMeal.fat}g</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button 
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedMeal(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionTracker;
