
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dumbbell, Check, Clock, Calendar, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface WorkoutPlan {
  id: string;
  name: string;
  dayIndex: number;
  completed: boolean;
  exercises: {
    id: string;
    name: string;
    sets: number;
    reps: number;
    completed: boolean;
  }[];
}

const WorkoutTracker: React.FC = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay() - 1; // 0 = Monday in our array
  const [currentDayIndex, setCurrentDayIndex] = useState(today >= 0 ? today : 6);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  
  // Sample workout data
  const [workouts] = useState<WorkoutPlan[]>([
    {
      id: '1',
      name: 'Upper Body',
      dayIndex: 0, // Monday
      completed: true,
      exercises: [
        { id: '1-1', name: 'Push-ups', sets: 3, reps: 12, completed: true },
        { id: '1-2', name: 'Pull-ups', sets: 3, reps: 8, completed: true },
        { id: '1-3', name: 'Shoulder Press', sets: 3, reps: 10, completed: true }
      ]
    },
    {
      id: '2',
      name: 'Lower Body',
      dayIndex: 2, // Wednesday
      completed: today > 2,
      exercises: [
        { id: '2-1', name: 'Squats', sets: 3, reps: 15, completed: today > 2 },
        { id: '2-2', name: 'Lunges', sets: 3, reps: 12, completed: today > 2 },
        { id: '2-3', name: 'Deadlifts', sets: 3, reps: 8, completed: today > 2 }
      ]
    },
    {
      id: '3',
      name: 'Core Workout',
      dayIndex: 4, // Friday
      completed: today > 4,
      exercises: [
        { id: '3-1', name: 'Planks', sets: 3, reps: 30, completed: today > 4 },
        { id: '3-2', name: 'Russian Twists', sets: 3, reps: 20, completed: today > 4 },
        { id: '3-3', name: 'Leg Raises', sets: 3, reps: 15, completed: today > 4 }
      ]
    },
    {
      id: '4',
      name: 'Cardio',
      dayIndex: 5, // Saturday
      completed: today > 5,
      exercises: [
        { id: '4-1', name: 'Running', sets: 1, reps: 30, completed: today > 5 },
        { id: '4-2', name: 'Jump Rope', sets: 3, reps: 100, completed: today > 5 },
        { id: '4-3', name: 'Burpees', sets: 3, reps: 15, completed: today > 5 }
      ]
    }
  ]);
  
  const workoutsForSelectedDay = workouts.filter(workout => workout.dayIndex === currentDayIndex);
  const totalWorkoutsCompleted = workouts.filter(w => w.completed).length;
  const completionPercentage = (totalWorkoutsCompleted / workouts.length) * 100;
  
  const toggleWorkoutSelection = (workoutId: string) => {
    setSelectedWorkout(selectedWorkout === workoutId ? null : workoutId);
  };
  
  const selectedWorkoutItem = workouts.find(w => w.id === selectedWorkout);

  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 border border-slate-200/70">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Workout Tracker</CardTitle>
            <CardDescription>Track your fitness plan</CardDescription>
          </div>
          <Dumbbell className="h-6 w-6 text-green-500" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">Weekly Progress</p>
            <p className="text-2xl font-semibold">{totalWorkoutsCompleted} <span className="text-sm font-normal text-slate-500">of {workouts.length}</span></p>
          </div>
          <div className="w-16 h-16 relative">
            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke="#e2e8f0" 
                strokeWidth="10"
              />
              <motion.circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke="#22c55e" 
                strokeWidth="10"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * completionPercentage / 100) }}
                transition={{ duration: 1, ease: "easeInOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm font-medium">{Math.round(completionPercentage)}%</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((day, index) => {
            const hasWorkout = workouts.some(w => w.dayIndex === index);
            const isCompleted = workouts.some(w => w.dayIndex === index && w.completed);
            const isCurrentDay = currentDayIndex === index;
            
            return (
              <motion.button
                key={day}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentDayIndex(index)}
                className={`p-2 rounded-lg text-center ${
                  isCurrentDay 
                    ? 'bg-green-100 border-green-200 border' 
                    : hasWorkout 
                      ? 'bg-slate-50' 
                      : 'bg-white border border-slate-100'
                }`}
              >
                <p className="text-xs">{day}</p>
                <div className="h-6 w-6 mx-auto mt-1 flex items-center justify-center">
                  {hasWorkout ? (
                    isCompleted ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Dumbbell className="h-4 w-4 text-slate-400" />
                    )
                  ) : (
                    <span className="text-xs text-slate-300">-</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
        
        <div className="mt-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">
              {workoutsForSelectedDay.length > 0 
                ? `Workouts for ${daysOfWeek[currentDayIndex]}` 
                : `No workouts for ${daysOfWeek[currentDayIndex]}`}
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
            >
              <Calendar className="h-4 w-4 mr-1" />
              Plan
            </Button>
          </div>
          
          <AnimatePresence>
            {workoutsForSelectedDay.length > 0 ? (
              <motion.div className="space-y-2">
                {workoutsForSelectedDay.map((workout) => (
                  <motion.div
                    key={workout.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <div 
                      className={`bg-white p-3 rounded-lg border ${
                        selectedWorkout === workout.id 
                          ? 'border-green-200' 
                          : 'border-slate-100'
                      } cursor-pointer`}
                      onClick={() => toggleWorkoutSelection(workout.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{workout.name}</p>
                            {workout.completed && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Completed
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-slate-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>30 min</span>
                            <span className="mx-2">·</span>
                            <span>{workout.exercises.length} exercises</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <AnimatePresence>
                        {selectedWorkout === workout.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mt-3 pt-3 border-t border-slate-100"
                          >
                            <div className="space-y-3">
                              {workout.exercises.map((exercise) => (
                                <div key={exercise.id} className="flex justify-between items-center">
                                  <div>
                                    <p className="text-sm font-medium">{exercise.name}</p>
                                    <p className="text-xs text-slate-500">
                                      {exercise.sets} sets × {exercise.reps} {exercise.name === 'Running' ? 'min' : 'reps'}
                                    </p>
                                  </div>
                                  {exercise.completed ? (
                                    <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                                      <Check className="h-4 w-4 text-green-600" />
                                    </div>
                                  ) : (
                                    <Button size="sm" variant="outline" className="h-7 text-xs">
                                      Start
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 p-4 rounded-lg text-center"
              >
                <p className="text-sm text-slate-500">No workouts scheduled for this day</p>
                <Button size="sm" className="mt-2">
                  Add Workout
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutTracker;
