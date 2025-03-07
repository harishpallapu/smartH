
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { HeartPulse, Activity, Moon, Scale, Apple, Utensils, Droplet, User, Dumbbell } from 'lucide-react';
import MetricCard from '@/components/ui/MetricCard';
import BMICalculator from '@/components/HealthMetrics/BMICalculator';
import HeartRateMonitor from '@/components/HealthMetrics/HeartRateMonitor';
import SleepTracker from '@/components/HealthMetrics/SleepTracker';
import WaterIntakeTracker from '@/components/HealthMetrics/WaterIntakeTracker';
import NutritionTracker from '@/components/HealthMetrics/NutritionTracker';
import WorkoutTracker from '@/components/HealthMetrics/WorkoutTracker';
import { useUser } from '@/contexts/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const { user, isLoggedIn } = useUser();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  
  // Check URL query params for tab selection
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get('tab');
    if (tabParam && ['overview', 'heart', 'sleep', 'bmi', 'water', 'nutrition', 'workout', 'profile'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Early return if not logged in
  if (!isLoggedIn || !user) {
    return null;
  }

  // Simulated data merged with user data
  const userData = {
    name: user.name,
    steps: 8435,
    caloriesBurned: 340,
    waterIntake: 5,
    weight: user.weight || '68.2 kg',
    height: user.height || '175 cm',
    bmi: user.bmi || 22.3,
    age: user.age || 32,
    memberSince: user.memberSince || 'January 2023'
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold">Welcome back, {userData.name}</h1>
            <p className="text-slate-600 mt-1">Here's an overview of your health metrics</p>
          </motion.div>
        </div>
        
        {/* Dashboard Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-2 border-b border-slate-200 overflow-x-auto pb-px hide-scrollbar">
            {[
              { id: 'overview', label: 'Overview', icon: <Activity className="h-4 w-4" /> },
              { id: 'heart', label: 'Heart Rate', icon: <HeartPulse className="h-4 w-4" /> },
              { id: 'sleep', label: 'Sleep', icon: <Moon className="h-4 w-4" /> },
              { id: 'bmi', label: 'BMI', icon: <Scale className="h-4 w-4" /> },
              { id: 'water', label: 'Water', icon: <Droplet className="h-4 w-4" /> },
              { id: 'nutrition', label: 'Nutrition', icon: <Utensils className="h-4 w-4" /> },
              { id: 'workout', label: 'Workout', icon: <Dumbbell className="h-4 w-4" /> },
              { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  navigate(`/dashboard?tab=${tab.id}`);
                }}
                className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-health-blue text-health-blue'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Steps"
                  value={userData.steps}
                  icon={<Activity className="h-5 w-5 text-health-blue" />}
                  description="Daily Goal: 10,000 steps"
                  trend="up"
                  trendValue="12% from yesterday"
                />
                <MetricCard
                  title="Calories Burned"
                  value={`${userData.caloriesBurned} kcal`}
                  icon={<Apple className="h-5 w-5 text-health-teal" />}
                  description="Daily Goal: 500 kcal"
                  trend="neutral"
                  trendValue="Same as yesterday"
                />
                <MetricCard
                  title="Water Intake"
                  value={`${userData.waterIntake} glasses`}
                  icon={<Droplet className="h-5 w-5 text-blue-500" />}
                  description="Daily Goal: 8 glasses"
                  trend="down"
                  trendValue="1 less than yesterday"
                />
                <MetricCard
                  title="Meals Tracked"
                  value="3"
                  icon={<Utensils className="h-5 w-5 text-orange-400" />}
                  description="Breakfast, Lunch, Dinner"
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <HeartRateMonitor />
                </div>
                <div>
                  <SleepTracker />
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <WaterIntakeTracker />
                </div>
                <div>
                  <BMICalculator />
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <NutritionTracker />
                </div>
                <div>
                  <WorkoutTracker />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Heart Rate Tab */}
        {activeTab === 'heart' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6"
          >
            <HeartRateMonitor />
          </motion.div>
        )}
        
        {/* Sleep Tab */}
        {activeTab === 'sleep' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6"
          >
            <SleepTracker />
          </motion.div>
        )}
        
        {/* BMI Tab */}
        {activeTab === 'bmi' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6"
          >
            <BMICalculator />
          </motion.div>
        )}
        
        {/* Water Tab */}
        {activeTab === 'water' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6"
          >
            <WaterIntakeTracker />
          </motion.div>
        )}
        
        {/* Nutrition Tab */}
        {activeTab === 'nutrition' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6"
          >
            <NutritionTracker />
          </motion.div>
        )}
        
        {/* Workout Tab */}
        {activeTab === 'workout' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6"
          >
            <WorkoutTracker />
          </motion.div>
        )}
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-health-blue/10 flex items-center justify-center">
                  <User className="h-12 w-12 text-health-blue" />
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  Edit Profile
                </Button>
              </div>
              
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-slate-600">Member since {userData.memberSince}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <p className="text-sm text-slate-500 mb-1">Height</p>
                    <p className="text-lg font-medium">{userData.height}</p>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-4">
                    <p className="text-sm text-slate-500 mb-1">Weight</p>
                    <p className="text-lg font-medium">{userData.weight}</p>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-4">
                    <p className="text-sm text-slate-500 mb-1">BMI</p>
                    <p className="text-lg font-medium">{userData.bmi}</p>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-4">
                    <p className="text-sm text-slate-500 mb-1">Age</p>
                    <p className="text-lg font-medium">{userData.age}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-lg font-semibold mb-4">Health Goals</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Daily Steps</span>
                      <span className="text-health-blue font-medium">10,000 steps</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Water Intake</span>
                      <span className="text-health-blue font-medium">8 glasses</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sleep Duration</span>
                      <span className="text-health-blue font-medium">8 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
