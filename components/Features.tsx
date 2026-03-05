'use client';

import { Brain, Database, Zap, Puzzle, Shield, BarChart3, Users } from 'lucide-react';

export default function Architecture() {
  const features = [
    {
      title: 'Personality & Character Engine',
      description: 'Deep customization beyond basic prompts. Create unique personalities with behavioral traits, emotions, and communication styles that remain consistent across all interactions.',
      icon: Brain,
      color: 'primary'
    },
    {
      title: 'Long-Term Memory & State',
      description: 'Persistent conversation history and context-aware retrieval. Agents remember past interactions, learn user preferences, and build meaningful relationships over time.',
      icon: Database,
      color: 'primary'
    },
    {
      title: 'Performance Optimization',
      description: 'Intelligent caching, request batching, and edge deployment reduce latency by 50%+ and cut API costs by 40-60%. Sub-100ms added latency at scale.',
      icon: Zap,
      color: 'primary'
    },
    {
      title: 'Analytics & Observability',
      description: 'Real-time performance monitoring, conversation quality metrics, cost tracking, user engagement analytics, and comprehensive debugging infrastructure.',
      icon: BarChart3,
      color: 'primary'
    },
    {
      title: 'Multi-Agent Coordination',
      description: 'Agent-to-agent communication protocols, workflow orchestration, role-based hierarchies, shared knowledge pools, and collaborative task execution.',
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Security & Compliance',
      description: 'Rate limiting, abuse prevention, PII detection and redaction, audit logs, compliance reporting, access control, and data encryption.',
      icon: Shield,
      color: 'primary'
    }
  ];

  return (
    <section className="py-24 bg-background" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl mb-6 font-heading">
            Enterprise-Grade Features<br />Out of the Box
          </h2>
          <p className="text-xl text-foreground/70 max-w-4xl mx-auto">
            Drop-in enhancement layer that transforms basic OpenClaw agents into production-ready systems with minimal code changes
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative p-8 bg-card-bg border-2 border-border hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                <div className="mb-6">
                  <div className="inline-flex p-3 bg-primary/10 border-2 border-primary/20 text-primary">
                    <Icon className="w-7 h-7" strokeWidth={2} />
                  </div>
                </div>

                <h3 className="text-xl mb-3 font-heading uppercase tracking-wide text-foreground">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 border-2 border-border bg-card-bg shadow-sm">
            <div className="text-5xl font-heading text-primary mb-2">&lt; 100ms</div>
            <div className="text-lg text-foreground/70">Response Time</div>
          </div>
          <div className="text-center p-8 border-2 border-border bg-card-bg shadow-sm">
            <div className="text-5xl font-heading text-primary mb-2">30 - 50%</div>
            <div className="text-lg text-foreground/70">Cost Reduction</div>
          </div>
          <div className="text-center p-8 border-2 border-border bg-card-bg shadow-sm">
            <div className="text-5xl font-heading text-primary mb-2">Simple & Fast</div>
            <div className="text-lg text-foreground/70">Integration</div>
          </div>
        </div>
      </div>
    </section>
  );
}
