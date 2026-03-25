# Add Multiple Agents

Learn how to run and manage multiple AI agents simultaneously in your ClawInfra project.

## Overview

ClawInfra allows you to create and run multiple agents concurrently, each with their own unique personality, capabilities, and goals. This is useful for:

- Running specialized agents for different tasks
- A/B testing different agent configurations
- Building multi-agent collaboration systems
- Separating production and development agents

## Creating Multiple Agents

### Using the API

Create multiple agents by making separate API calls:

```javascript
const axios = require('axios');

const API_BASE = 'https://api.clawinfra.xyz/v1';
const API_KEY = process.env.CLAW_API_KEY;

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

async function createMultipleAgents() {
  // Agent 1: DeFi Expert
  const defiAgent = await client.post('/agents', {
    name: 'DeFi Oracle',
    bio: ['Expert in DeFi protocols and yield farming'],
    personality: {
      traits: ['analytical', 'data-driven', 'patient'],
      style: 'technical and precise'
    },
    modelProvider: 'openai',
    model: 'gpt-4',
    plugins: [
      { name: '@clawinfra/plugin-evm', enabled: true }
    ]
  });

  // Agent 2: Social Media Manager
  const socialAgent = await client.post('/agents', {
    name: 'Social Butterfly',
    bio: ['Community engagement specialist'],
    personality: {
      traits: ['friendly', 'enthusiastic', 'creative'],
      style: 'casual and engaging'
    },
    clients: ['discord', 'twitter'],
    modelProvider: 'anthropic',
    model: 'claude-3-sonnet'
  });

  // Agent 3: Research Assistant
  const researchAgent = await client.post('/agents', {
    name: 'Research Bot',
    bio: ['I gather and analyze information from various sources'],
    personality: {
      traits: ['thorough', 'objective', 'organized'],
      style: 'professional and detailed'
    },
    plugins: [
      { name: '@clawinfra/plugin-web-scraper', enabled: true }
    ],
    modelProvider: 'openai',
    model: 'gpt-4'
  });

  return {
    defi: defiAgent.data.data,
    social: socialAgent.data.data,
    research: researchAgent.data.data
  };
}

createMultipleAgents().then(agents => {
  console.log('Created agents:', agents);
});
```

## Agent Specialization Strategies

### 1. Task-Based Specialization

Assign specific tasks to each agent:

```javascript
const agents = {
  // Trading agent
  trader: {
    name: 'TradeBot',
    knowledge: ['Technical analysis', 'Market indicators', 'Risk management'],
    plugins: [
      { name: '@clawinfra/plugin-evm', enabled: true },
      { name: '@clawinfra/plugin-solana', enabled: true }
    ]
  },

  // Content agent
  content: {
    name: 'ContentBot',
    knowledge: ['Social media trends', 'Content strategy', 'Engagement tactics'],
    clients: ['twitter', 'discord'],
    plugins: [
      { name: '@clawinfra/plugin-images', enabled: true }
    ]
  },

  // Support agent
  support: {
    name: 'SupportBot',
    knowledge: ['Product features', 'Troubleshooting', 'Customer service'],
    clients: ['discord', 'telegram'],
    settings: {
      discord: {
        channels: ['support', 'help'],
        respondToMentions: true
      }
    }
  }
};
```

### 2. Platform-Based Specialization

Deploy agents for specific platforms:

```javascript
// Discord agent
const discordAgent = await client.post('/agents', {
  name: 'Discord Helper',
  clients: ['discord'],
  settings: {
    discord: {
      channels: ['general', 'help', 'announcements'],
      respondToMentions: true,
      respondToDMs: true,
      moderationEnabled: true
    }
  }
});

// Twitter agent
const twitterAgent = await client.post('/agents', {
  name: 'Twitter Influencer',
  clients: ['twitter'],
  settings: {
    twitter: {
      enableReplies: true,
      enableMentions: true,
      postFrequency: '2h',
      autoLike: true
    }
  }
});

// Telegram agent
const telegramAgent = await client.post('/agents', {
  name: 'Telegram Community Manager',
  clients: ['telegram'],
  settings: {
    telegram: {
      groupIds: ['@yourgroup'],
      respondToCommands: true
    }
  }
});
```

## Managing Multiple Agents

### List All Your Agents

```javascript
async function listAllAgents() {
  const response = await client.get('/agents');
  const agents = response.data.data.agents;

  agents.forEach(agent => {
    console.log(`${agent.name} (${agent.id})`);
    console.log(`  Status: ${agent.status}`);
    console.log(`  Clients: ${agent.clients.join(', ')}`);
    console.log(`  Model: ${agent.model}`);
    console.log('---');
  });

  return agents;
}
```

### Update Specific Agents

```javascript
async function updateAgentByName(name, updates) {
  // First, find the agent
  const allAgents = await client.get('/agents');
  const agent = allAgents.data.data.agents.find(a => a.name === name);

  if (!agent) {
    throw new Error(`Agent ${name} not found`);
  }

  // Update the agent
  const response = await client.patch(`/agents/${agent.id}`, updates);
  return response.data;
}

// Usage
await updateAgentByName('DeFi Oracle', {
  knowledge: [
    'Expert in DeFi protocols',
    'Understanding of yield farming strategies',
    'Knowledge of liquidity pools and AMMs'
  ]
});
```

## Multi-Agent Coordination

### Sequential Workflow

Route tasks through multiple agents:

```javascript
async function multiAgentWorkflow(query) {
  // Step 1: Research agent gathers data
  const researchResponse = await client.post(
    `/agents/${researchAgentId}/messages`,
    {
      text: `Research this topic: ${query}`,
      userId: 'workflow_system'
    }
  );

  const researchData = researchResponse.data.data.response;

  // Step 2: Analysis agent processes the data
  const analysisResponse = await client.post(
    `/agents/${analysisAgentId}/messages`,
    {
      text: `Analyze this data: ${researchData}`,
      userId: 'workflow_system'
    }
  );

  const analysis = analysisResponse.data.data.response;

  // Step 3: Content agent creates a summary
  const contentResponse = await client.post(
    `/agents/${contentAgentId}/messages`,
    {
      text: `Create an engaging summary: ${analysis}`,
      userId: 'workflow_system'
    }
  );

  return contentResponse.data.data.response;
}
```

### Parallel Processing

Process tasks with multiple agents simultaneously:

```javascript
async function parallelAgentProcessing(tasks) {
  const promises = tasks.map(task =>
    client.post(`/agents/${task.agentId}/messages`, {
      text: task.message,
      userId: 'parallel_system'
    })
  );

  const results = await Promise.all(promises);
  return results.map(r => r.data.data.response);
}

// Usage
const tasks = [
  { agentId: 'agent_1', message: 'Analyze Ethereum gas prices' },
  { agentId: 'agent_2', message: 'Check Solana network status' },
  { agentId: 'agent_3', message: 'Review latest DeFi news' }
];

const results = await parallelAgentProcessing(tasks);
```

## Agent Communication Patterns

### Hub and Spoke Pattern

Central coordinator agent delegates to specialized agents:

```javascript
async function hubAndSpoke(userQuery) {
  // Hub agent decides which specialist to route to
  const hubResponse = await client.post(
    `/agents/${hubAgentId}/messages`,
    {
      text: `Route this query to the appropriate specialist: ${userQuery}`,
      userId: 'user_123',
      context: {
        availableAgents: ['defi', 'nft', 'social', 'technical']
      }
    }
  );

  // Parse hub decision and route to specialist
  const specialist = determineSpecialist(hubResponse.data.data.response);

  const specialistResponse = await client.post(
    `/agents/${specialist.id}/messages`,
    {
      text: userQuery,
      userId: 'user_123'
    }
  );

  return specialistResponse.data.data.response;
}
```

### Consensus Pattern

Multiple agents provide opinions, system aggregates:

```javascript
async function consensusDecision(question) {
  const agents = ['agent_1', 'agent_2', 'agent_3'];

  // Get opinions from all agents
  const opinions = await Promise.all(
    agents.map(agentId =>
      client.post(`/agents/${agentId}/messages`, {
        text: question,
        userId: 'consensus_system'
      })
    )
  );

  // Aggregate responses
  const responses = opinions.map(o => o.data.data.response);

  // Use another agent to synthesize consensus
  const synthesis = await client.post(
    `/agents/${synthesisAgentId}/messages`,
    {
      text: `Synthesize these opinions into a consensus: ${JSON.stringify(responses)}`,
      userId: 'consensus_system'
    }
  );

  return synthesis.data.data.response;
}
```

## Resource Management

### Monitoring Agent Performance

```javascript
async function monitorAgents() {
  const agents = await client.get('/agents');

  for (const agent of agents.data.data.agents) {
    const details = await client.get(`/agents/${agent.id}`);
    const metrics = details.data.data.metrics;

    console.log(`${agent.name}:`);
    console.log(`  Messages: ${metrics.totalMessages}`);
    console.log(`  Conversations: ${metrics.totalConversations}`);
    console.log(`  Uptime: ${metrics.uptime}`);

    // Alert if performance is degraded
    if (parseFloat(metrics.uptime) < 95) {
      console.log(`  ⚠️  WARNING: Low uptime`);
    }
  }
}
```

### Load Balancing

Distribute work across multiple agents:

```javascript
class AgentLoadBalancer {
  constructor(agentIds) {
    this.agentIds = agentIds;
    this.currentIndex = 0;
  }

  getNextAgent() {
    const agentId = this.agentIds[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.agentIds.length;
    return agentId;
  }

  async sendMessage(text, userId) {
    const agentId = this.getNextAgent();
    return await client.post(`/agents/${agentId}/messages`, {
      text,
      userId
    });
  }
}

// Usage
const loadBalancer = new AgentLoadBalancer([
  'agent_1',
  'agent_2',
  'agent_3'
]);

// Requests are distributed across agents
await loadBalancer.sendMessage('Hello', 'user_1');
await loadBalancer.sendMessage('Help me', 'user_2');
```

## Best Practices

1. **Clear Specialization**: Give each agent a distinct role and expertise
2. **Avoid Overlap**: Minimize functionality overlap between agents
3. **Consistent Naming**: Use clear, descriptive names for agents
4. **Monitor Performance**: Track metrics for each agent
5. **Version Control**: Keep agent configurations in version control
6. **Test Interactions**: Test how agents work together before production
7. **Resource Limits**: Set appropriate rate limits per agent
8. **Graceful Degradation**: Handle agent failures without affecting others

## Example: Complete Multi-Agent System

Here's a complete example of a multi-agent system for a DeFi project:

```javascript
class DeFiAgentSystem {
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: 'https://api.clawinfra.xyz/v1',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    this.agents = {};
  }

  async initialize() {
    // Create specialized agents
    const configs = [
      {
        name: 'Price Monitor',
        role: 'monitor',
        plugins: [{ name: '@clawinfra/plugin-evm', enabled: true }]
      },
      {
        name: 'Risk Analyzer',
        role: 'risk',
        knowledge: ['Risk management', 'Portfolio analysis']
      },
      {
        name: 'Community Manager',
        role: 'community',
        clients: ['discord', 'twitter']
      }
    ];

    for (const config of configs) {
      const response = await this.client.post('/agents', config);
      this.agents[config.role] = response.data.data.id;
    }

    console.log('Agent system initialized:', this.agents);
  }

  async processQuery(query, role = 'monitor') {
    const agentId = this.agents[role];
    if (!agentId) {
      throw new Error(`No agent found for role: ${role}`);
    }

    const response = await this.client.post(
      `/agents/${agentId}/messages`,
      {
        text: query,
        userId: 'system'
      }
    );

    return response.data.data.response;
  }

  async shutdown() {
    // Optionally deactivate agents
    for (const agentId of Object.values(this.agents)) {
      await this.client.patch(`/agents/${agentId}`, {
        status: 'inactive'
      });
    }
  }
}

// Usage
const system = new DeFiAgentSystem(process.env.CLAW_API_KEY);
await system.initialize();

const price = await system.processQuery('Current ETH price?', 'monitor');
const risk = await system.processQuery('Assess portfolio risk', 'risk');

await system.shutdown();
```

## Next Steps

- [Test a Project](testing.md) - Testing strategies for multi-agent systems
- [Deploy a Project](deployment.md) - Deploy multiple agents to production
- [API Reference](../api-reference/overview.md) - Complete API documentation

## Need Help?

- [Discord Community](https://discord.gg/clawinfra)
- [GitHub Discussions](https://github.com/gwentanky/clawinfra/discussions)
- [GitHub Issues](https://github.com/gwentanky/clawinfra/issues)
