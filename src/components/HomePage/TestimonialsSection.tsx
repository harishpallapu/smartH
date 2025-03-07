
import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, title }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 h-full">
      <div className="mb-4 text-health-blue">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
        </svg>
      </div>
      <p className="text-slate-700 mb-6">{quote}</p>
      <div className="mt-auto">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-slate-500">{title}</p>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "The sleep tracking feature has helped me establish a much healthier sleep routine. I'm more productive than ever.",
      name: "Alex Morgan",
      title: "Software Engineer"
    },
    {
      quote: "Being able to monitor my heart rate throughout the day has been invaluable for my fitness journey. Highly recommend!",
      name: "Sarah Johnson",
      title: "Fitness Instructor"
    },
    {
      quote: "The BMI tracker helped me set realistic goals and track my progress. I've lost 15 pounds and feel amazing!",
      name: "Michael Chen",
      title: "Marketing Director"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Hear from people who have transformed their health with our platform.
            </p>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Testimonial
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
