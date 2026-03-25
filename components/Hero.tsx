'use client';

import Link from 'next/link';
import Button from './ui/Button';
import { CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url(/background.png)' }}
      />

      <div className="max-w-7xl lg:w-7xl px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Flex Container */}
        <div className="flex flex-col gap-12 pt-6">
          {/* Left Side - Text Content */}
          <div className="flex-1">
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl max-w-5xl md:text-7xl mb-6 font-heading leading-tighter ">
              Production Infrastructure For <span className='text-primary'>OpenClaw AI Agents</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl mb-8 max-w-4xl text-foreground/80 leading-relaxed">
              Enterprise-grade infrastructure that reduces costs by <span className="text-primary">30-50%</span>, delivers <span className="text-primary">sub-100ms latency</span>, and scales to <span className="text-primary">100+ agents</span>. 6WWYc7joLRD2ZAHcw8UXr6C3kUShq8ezGETCzdRbBAGS
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://docs.clawinfra.dev" target="_blank">
                <Button variant="primary" size="lg">
                  Start building
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link href="https://github.com/gwentanky/clawinfra" target="_blank">
                <Button variant="outline" size="lg">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-fit max-w-6xl">
            <div className="py-6">
              <div className="flex items-center gap-4 justify-center flex-wrap lg:flex-nowrap">
                {/* Application Layer */}
                <div className="border-2 border-border bg-card-bg px-6 py-8 transition-all duration-300 hover:shadow-md min-w-[160px]">
                  <p className="text-base font-mono text-foreground/60 text-center whitespace-nowrap">Your OpenClaw Agents</p>
                </div>

                {/* Arrow Right */}
                <div className="flex items-center">
                  <svg className="w-8 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>

                {/* ClawInfra */}
                <div className="border-2 border-primary bg-primary/10 p-6 shadow-md min-w-[200px]">
                  <p className="text-xl text-primary mb-3 font-heading text-center whitespace-nowrap">ClawInfra</p>
                  <div className="space-y-0.5 text-sm text-foreground/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle className='w-3 h-3' />
                      <span>Intelligent Cache Layer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className='w-3 h-3' />
                      <span>Request Optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className='w-3 h-3' />
                      <span>Auto-Scaling Pool</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className='w-3 h-3' />
                      <span>Observability Platform</span>
                    </div>
                  </div>
                </div>

                {/* Arrow Right */}
                <div className="flex items-center">
                  <svg className="w-8 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>

                {/* OpenClaw Layer */}
                <div className="border-2 border-border bg-card-bg px-6 py-8 transition-all duration-300 hover:shadow-md min-w-[160px]">
                  <p className="text-base font-mono text-foreground/60 text-center whitespace-nowrap">Supercharged Agents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
