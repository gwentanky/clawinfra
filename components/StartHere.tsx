'use client';

import Link from 'next/link';
import Button from './ui/Button';
import AnimatedBackground from './AnimatedBackground';

export default function StartHere() {
  const useCases = [
    'AI Influencer Platforms',
    'Customer Support Agents',
    'Personal AI Assistants',
    'Gaming NPCs',
    'Virtual Therapists',
    'Content Creation Bots',
    'Trading Assistants',
    'Research Agents',
    'Social Media Managers',
    'Data Analysts',
    'Code Reviewers',
    'Product Recommendations',
    'Legal Advisors',
    'HR Assistants',
    'Sales Representatives',
    'Educational Tutors',
    'Healthcare Companions',
    'Travel Planners'
  ];

  return (
    <section id="use-cases" className="pt-20 pb-10 bg-light overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute w-full h-full">
        <AnimatedBackground />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        {/* Section Header */}
        <div className="">
          <h2 className="text-4xl md:text-6xl font-heading mb-6">
            Built for High-Performance<br />Production Workloads
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-4xl">
            From high-volume customer support to real-time trading systems, ClawInfra powers mission-critical AI agents at scale
          </p>
        </div>
      </div>

      {/* Scrolling Use Cases */}
      <div className="relative mb-16 z-10">
        <div className="flex animate-scroll-horizontal whitespace-nowrap">
          {/* First set */}
          {useCases.map((useCase, index) => (
            <div
              key={`first-${index}`}
              className="inline-flex items-center mx-3 px-8 py-4 border-2 border-primary/30 bg-card-bg hover:border-primary hover:shadow-md transition-all duration-300"
            >
              <span className="text-xl font-heading text-primary uppercase tracking-wide">
                {useCase}
              </span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {useCases.map((useCase, index) => (
            <div
              key={`second-${index}`}
              className="inline-flex items-center mx-3 px-8 py-4 border-2 border-primary/30 bg-card-bg hover:border-primary hover:shadow-md transition-all duration-300"
            >
              <span className="text-xl font-heading text-primary uppercase tracking-wide">
                {useCase}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-horizontal {
          animation: scroll-horizontal 60s linear infinite;
        }

        .animate-scroll-horizontal:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
