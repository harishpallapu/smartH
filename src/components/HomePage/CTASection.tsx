
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';

const CTASection: React.FC = () => {
  const { isLoggedIn } = useUser();

  return (
    <section className="py-20 bg-gradient-to-r from-health-blue to-health-indigo text-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Start Your Health Journey Today</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are taking control of their health with SmartHealth Dashboard.
          </p>
          {isLoggedIn ? (
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="rounded-full px-8 text-health-blue">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button size="lg" variant="secondary" className="rounded-full px-8 text-health-blue">
                Create Your Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
