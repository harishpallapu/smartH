
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HomePage/HeroSection';
import FeaturesSection from '@/components/HomePage/FeaturesSection';
import CTASection from '@/components/HomePage/CTASection';
import TestimonialsSection from '@/components/HomePage/TestimonialsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
