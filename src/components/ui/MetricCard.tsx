
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon,
  className,
  footer,
  trend,
  trendValue,
  onClick
}) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-slate-500';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        duration: 0.3,
        delay: Math.random() * 0.2 // Slight random delay for staggered effect
      }}
    >
      <Card 
        className={cn(
          "overflow-hidden backdrop-blur-sm bg-white/80 border-slate-200/70 shadow-sm hover:shadow-md transition-all cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && (
            <motion.div 
              className="opacity-70"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon}
            </motion.div>
          )}
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-2xl font-semibold"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {value}
          </motion.div>
          {description && <CardDescription className="mt-2 text-xs">{description}</CardDescription>}
          {trend && trendValue && (
            <motion.div 
              className={`flex items-center mt-2 text-xs ${getTrendColor()}`}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span>{getTrendIcon()}</span>
              <span className="ml-1">{trendValue}</span>
            </motion.div>
          )}
        </CardContent>
        {footer && <CardFooter className="pt-0">{footer}</CardFooter>}
      </Card>
    </motion.div>
  );
};

export default MetricCard;
