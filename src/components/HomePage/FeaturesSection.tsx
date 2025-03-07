
import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Moon, Activity, BarChart3, Shield, Scale } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm h-full border border-slate-100">
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <HeartPulse className="h-6 w-6 text-red-500" />,
      title: 'Heart Rate Monitoring',
      description: 'Track your heart rate in real-time and analyze patterns to optimize cardiovascular health.'
    },
    {
      icon: <Scale className="h-6 w-6 text-orange-500" />,
      title: 'BMI Tracking',
      description: 'Calculate and monitor your Body Mass Index to maintain a healthy weight range.'
    },
    {
      icon: <Moon className="h-6 w-6 text-indigo-500" />,
      title: 'Sleep Analysis',
      description: 'Monitor sleep patterns and quality to improve your rest and recovery.'
    },
    {
      icon: <Activity className="h-6 w-6 text-green-500" />,
      title: 'Activity Tracking',
      description: 'Record daily activities and exercise to maintain an active lifestyle.'
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
      title: 'Health Insights',
      description: 'Get personalized analytics and insights to optimize your health goals.'
    },
    {
      icon: <Shield className="h-6 w-6 text-slate-500" />,
      title: 'Privacy Focused',
      description: 'Your health data is encrypted and securely stored with privacy as our priority.'
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Powerful Health Tracking Features</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Experience comprehensive health monitoring with our intuitive tools designed to help you achieve your wellness goals.
            </p>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Feature 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
