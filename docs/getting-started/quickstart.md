# Quickstart

Build your first ClawInfra-enhanced OpenClaw agent in minutes!

## Prerequisites

- ClawInfra SDK installed (see [Installation](installation.md))
- OpenClaw installed
- API keys configured in `.env`

## Step 1: Create Your First Enhanced Agent

Let's create a simple agent and enhance it with ClawInfra's personality and memory features.

### Basic Setup

Create a new file `agent.ts`:

```typescript
import { ClawInfra } from '@clawinfra/sdk';
import { OpenClaw } from 'openclaw';

// Initialize your OpenClaw agent
const baseAgent = new OpenClaw({
  model: 'claude-3-sonnet',
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Enhance it with ClawInfra
const enhancedAgent = new ClawInfra(baseAgent, {
  personality: {
    name: 'Alex',
    traits: ['helpful', 'friendly', 'professional'],
    voice: 'casual yet knowledgeable',
    emotionalRange: 'moderate'
  },
  memory: {
    enabled: true,
    provider: 'pinecone',
    apiKey: process.env.PINECONE_API_KEY
  },
  cache: {
    enabled: true,
    ttl: 3600 // 1 hour cache
  }
});

// Start chatting
async function main() {
  const response = await enhancedAgent.chat({
    userId: 'user-123',
    message: 'Hello! What can you help me with?'
  });

  console.log('Agent:', response.text);
}

main();
```

### Run Your Agent

```bash
npx tsx agent.ts
```

Expected output:
```
Agent: Hey there! I'm Alex, and I'm here to help you with whatever you need. Whether it's answering questions, helping with tasks, or just having a conversation, I'm all ears! What would you like to explore today?
```

## Step 2: Test Memory Persistence

Let's verify that the agent remembers past conversations:

```typescript
async function testMemory() {
  // First conversation
  const response1 = await enhancedAgent.chat({
    userId: 'user-123',
    message: 'My name is Sarah and I love TypeScript.'
  });
  console.log('Agent:', response1.text);

  // Second conversation (agent should remember Sarah)
  const response2 = await enhancedAgent.chat({
    userId: 'user-123',
    message: 'What programming language do I like?'
  });
  console.log('Agent:', response2.text);
  // Expected: "You mentioned you love TypeScript!"
}

testMemory();
```

## Step 3: Configure Advanced Features

### Enable Analytics

Track conversation quality and performance:

```typescript
const enhancedAgent = new ClawInfra(baseAgent, {
  personality: { /* ... */ },
  memory: { /* ... */ },
  analytics: {
    enabled: true,
    trackMetrics: true,
    customEvents: ['user_engagement', 'conversion']
  }
});

// Access analytics
const metrics = await enhancedAgent.analytics.getMetrics({
  userId: 'user-123',
  timeRange: '7d'
});

console.log('Conversation count:', metrics.conversationCount);
console.log('Average response time:', metrics.avgResponseTime);
console.log('User satisfaction:', metrics.satisfactionScore);
```

### Add Custom Plugins

Extend your agent with custom capabilities:

```typescript
import { createPlugin } from '@clawinfra/sdk';

const weatherPlugin = createPlugin({
  name: 'weather',
  description: 'Get weather information',
  async execute({ location }) {
    // Your weather API integration
    const weather = await fetch(`https://api.weather.com/${location}`);
    return weather.json();
  }
});

const enhancedAgent = new ClawInfra(baseAgent, {
  personality: { /* ... */ },
  plugins: [weatherPlugin]
});
```

## Step 4: Multi-User Support

Handle multiple users with isolated memory:

```typescript
async function handleMultipleUsers() {
  // User 1
  await enhancedAgent.chat({
    userId: 'alice-123',
    message: 'I prefer dark mode'
  });

  // User 2
  await enhancedAgent.chat({
    userId: 'bob-456',
    message: 'I prefer light mode'
  });

  // Check user preferences
  const aliceResponse = await enhancedAgent.chat({
    userId: 'alice-123',
    message: 'What mode do I prefer?'
  });
  console.log(aliceResponse.text); // "You prefer dark mode"

  const bobResponse = await enhancedAgent.chat({
    userId: 'bob-456',
    message: 'What mode do I prefer?'
  });
  console.log(bobResponse.text); // "You prefer light mode"
}
```

## Complete Example: Customer Support Agent

Here's a full example combining all features:

```typescript
import { ClawInfra } from '@clawinfra/sdk';
import { OpenClaw } from 'openclaw';

// Initialize OpenClaw
const baseAgent = new OpenClaw({
  model: 'claude-3-sonnet',
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Create enhanced customer support agent
const supportAgent = new ClawInfra(baseAgent, {
  personality: {
    name: 'Riley',
    traits: ['empathetic', 'patient', 'knowledgeable', 'professional'],
    voice: 'warm and supportive',
    emotionalRange: 'expressive'
  },
  memory: {
    enabled: true,
    provider: 'pinecone',
    apiKey: process.env.PINECONE_API_KEY,
    maxContext: 50, // Remember last 50 messages
    similarityThreshold: 0.7
  },
  cache: {
    enabled: true,
    provider: 'redis',
    ttl: 1800 // 30 minutes
  },
  analytics: {
    enabled: true,
    trackMetrics: true,
    customEvents: ['ticket_created', 'issue_resolved']
  }
});

async function handleCustomerInquiry() {
  console.log('--- Customer Support Session ---\n');

  // Customer reaches out
  const greeting = await supportAgent.chat({
    userId: 'customer-789',
    message: 'Hi, I\'m having trouble with my account login.'
  });
  console.log('Riley:', greeting.text);

  // Follow-up question
  const followup = await supportAgent.chat({
    userId: 'customer-789',
    message: 'I get an error saying "Invalid credentials"'
  });
  console.log('Riley:', followup.text);

  // Track custom event
  await supportAgent.analytics.trackEvent({
    userId: 'customer-789',
    event: 'ticket_created',
    metadata: { issue: 'login_error' }
  });

  // Resolution
  const resolution = await supportAgent.chat({
    userId: 'customer-789',
    message: 'I reset my password and it works now!'
  });
  console.log('Riley:', resolution.text);

  await supportAgent.analytics.trackEvent({
    userId: 'customer-789',
    event: 'issue_resolved',
    metadata: { resolution: 'password_reset' }
  });

  // View session metrics
  const sessionMetrics = await supportAgent.analytics.getSession({
    userId: 'customer-789'
  });

  console.log('\n--- Session Metrics ---');
  console.log('Messages exchanged:', sessionMetrics.messageCount);
  console.log('Time to resolution:', sessionMetrics.duration);
  console.log('Sentiment:', sessionMetrics.sentiment);
}

handleCustomerInquiry();
```

## Configuration Options

### Personality Configuration

```typescript
personality: {
  name: string;                    // Agent's name
  traits: string[];                // Behavioral traits
  voice: string;                   // Communication style
  emotionalRange: 'subtle' | 'moderate' | 'expressive';
  background?: string;             // Backstory
  goals?: string[];                // Objectives
}
```

### Memory Configuration

```typescript
memory: {
  enabled: boolean;
  provider: 'pinecone' | 'weaviate' | 'qdrant';
  apiKey?: string;
  maxContext?: number;             // Max messages to remember
  similarityThreshold?: number;    // 0-1, memory recall threshold
  retentionDays?: number;          // How long to keep memories
}
```

### Cache Configuration

```typescript
cache: {
  enabled: boolean;
  provider: 'redis' | 'memory';
  ttl: number;                     // Time to live in seconds
  url?: string;                    // Redis URL (if using Redis)
}
```

### Analytics Configuration

```typescript
analytics: {
  enabled: boolean;
  trackMetrics: boolean;
  customEvents?: string[];
  sampleRate?: number;             // 0-1, percentage to track
}
```

## Next Steps

Now that you've built your first enhanced agent, explore:

- [Customize an Agent](../guides/customize-agent.md) - Deep dive into caching and optimization
- [Memory and State](../agents/memory-state.md) - Advanced memory management
- [Create a Plugin](../guides/create-plugin.md) - Build custom capabilities
- [Deployment](../guides/deployment.md) - Deploy to production
- [API Reference](../api-reference/overview.md) - Complete API documentation

## Common Patterns

### Pattern 1: Personal Assistant

```typescript
const assistant = new ClawInfra(baseAgent, {
  personality: {
    name: 'Ada',
    traits: ['organized', 'proactive', 'detail-oriented'],
    voice: 'efficient and friendly'
  },
  memory: { enabled: true, provider: 'pinecone' },
  plugins: [calendarPlugin, emailPlugin, taskPlugin]
});
```

### Pattern 2: AI Influencer

```typescript
const influencer = new ClawInfra(baseAgent, {
  personality: {
    name: 'Luna',
    traits: ['creative', 'engaging', 'trendy', 'authentic'],
    voice: 'casual and energetic',
    emotionalRange: 'expressive'
  },
  memory: {
    enabled: true,
    provider: 'pinecone',
    rememberUsers: true
  },
  plugins: [socialMediaPlugin, contentGenerationPlugin]
});
```

### Pattern 3: Research Assistant

```typescript
const researcher = new ClawInfra(baseAgent, {
  personality: {
    name: 'Dr. Hayes',
    traits: ['analytical', 'thorough', 'methodical', 'curious'],
    voice: 'academic and precise'
  },
  memory: {
    enabled: true,
    provider: 'weaviate',
    maxContext: 100
  },
  plugins: [webSearchPlugin, pdfReaderPlugin, citationPlugin]
});
```

## Troubleshooting

### Agent doesn't remember past conversations

Check that memory is properly configured:
```typescript
memory: {
  enabled: true,  // Make sure this is true
  provider: 'pinecone',
  apiKey: process.env.PINECONE_API_KEY  // Verify API key is set
}
```

### Slow response times

Enable caching to improve performance:
```typescript
cache: {
  enabled: true,
  provider: 'redis',
  ttl: 3600
}
```

### Personality seems inconsistent

Increase the personality strength and provide more specific traits:
```typescript
personality: {
  name: 'Alex',
  traits: ['helpful', 'patient', 'knowledgeable', 'friendly'],
  voice: 'warm and approachable, uses casual language',
  emotionalRange: 'moderate'
}
```

## Need Help?

- [Discord Community](https://discord.gg/clawinfra)
- [GitHub Discussions](https://github.com/gwentanky/clawinfra/sdk/discussions)
- [API Reference](../api-reference/overview.md)
- [Email Support](mailto:support@clawinfra.dev)
