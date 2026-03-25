# Memory and State

ClawInfra's memory system enables your OpenClaw agents to remember past conversations, learn user preferences, and build meaningful long-term relationships.

## Overview

Memory is one of ClawInfra's core features that transforms stateless OpenClaw agents into context-aware assistants. The memory system stores and retrieves relevant information from past interactions, allowing agents to:

- Remember user preferences and personal details
- Recall previous conversations and context
- Learn from past interactions
- Provide personalized responses based on history
- Build long-term relationships with users

## Memory Architecture

ClawInfra's memory system consists of three layers:

```
┌─────────────────────────────────┐
│     Short-Term Memory           │
│  (Current conversation context) │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│     Distributed State Management            │
│  (Vector database storage)      │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│     Knowledge Base              │
│  (Static agent knowledge)       │
└─────────────────────────────────┘
```

## Memory Types

### Short-Term Memory

Short-term memory holds the current conversation context within a single session. It's automatically managed by ClawInfra and stored in-memory for fast access.

```typescript
const enhancedAgent = new ClawInfra(baseAgent, {
  memory: {
    enabled: true,
    shortTermContext: 10 // Keep last 10 messages in context
  }
});
```

**Use cases:**
- Maintaining conversation flow
- Tracking the current topic
- Understanding immediate context

### Distributed State Management

Long-term memory persists across sessions using a vector database. It enables agents to recall information from days, weeks, or months ago.

```typescript
const enhancedAgent = new ClawInfra(baseAgent, {
  memory: {
    enabled: true,
    provider: 'pinecone',
    apiKey: process.env.PINECONE_API_KEY,
    maxContext: 50,           // Max messages to retrieve
    similarityThreshold: 0.7,  // Minimum similarity score (0-1)
    retentionDays: 90         // Keep memories for 90 days
  }
});
```

**Use cases:**
- Remembering user preferences
- Recalling past decisions
- Learning user patterns
- Building user profiles

### Knowledge Base

Static information that the agent always knows, defined at initialization.

```typescript
const enhancedAgent = new ClawInfra(baseAgent, {
  personality: {
    name: 'Alex',
    knowledge: [
      'Expert in TypeScript and JavaScript',
      'Specializes in AI agent development',
      'Familiar with OpenClaw framework'
    ]
  }
});
```

## Vector Database Providers

ClawInfra supports multiple vector database providers for distributed state management:

### Pinecone

```typescript
memory: {
  enabled: true,
  provider: 'pinecone',
  apiKey: process.env.PINECONE_API_KEY,
  environment: 'us-east1-gcp',
  index: 'clawinfra-memories'
}
```

**Pros:** Managed service, easy setup, great performance
**Best for:** Production deployments, teams wanting managed infrastructure

### Weaviate

```typescript
memory: {
  enabled: true,
  provider: 'weaviate',
  url: process.env.WEAVIATE_URL,
  apiKey: process.env.WEAVIATE_API_KEY,
  className: 'Memory'
}
```

**Pros:** Self-hosted option, open-source, powerful querying
**Best for:** Self-hosted deployments, advanced filtering needs

### Qdrant

```typescript
memory: {
  enabled: true,
  provider: 'qdrant',
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
  collectionName: 'agent_memories'
}
```

**Pros:** High performance, Rust-based, excellent for scale
**Best for:** High-throughput applications, performance-critical systems

## State Management

### User State

Track user-specific information and preferences:

```typescript
// Store user preferences
await enhancedAgent.state.setUserData('user-123', {
  preferences: {
    language: 'en',
    theme: 'dark',
    notifications: true
  },
  profile: {
    name: 'Sarah',
    interests: ['TypeScript', 'AI', 'Web Development']
  }
});

// Retrieve user state
const userData = await enhancedAgent.state.getUserData('user-123');
console.log(userData.preferences.theme); // 'dark'
```

### Conversation State

Track conversation-specific context and metadata:

```typescript
// Set conversation context
await enhancedAgent.state.setContext('conv-456', {
  topic: 'TypeScript best practices',
  sentiment: 'positive',
  intent: 'learning',
  entities: ['TypeScript', 'generics', 'types']
});

// Retrieve conversation state
const context = await enhancedAgent.state.getContext('conv-456');
console.log(context.topic); // 'TypeScript best practices'
```

### Session State

Manage temporary session data:

```typescript
// Set session data (expires after session ends)
await enhancedAgent.state.setSession('session-789', {
  startTime: Date.now(),
  messageCount: 0,
  currentTask: 'code_review'
});

// Update session
await enhancedAgent.state.updateSession('session-789', {
  messageCount: (prev) => prev.messageCount + 1
});
```

## Memory Retrieval

### Automatic Retrieval

ClawInfra automatically retrieves relevant memories based on the current conversation:

```typescript
const response = await enhancedAgent.chat({
  userId: 'user-123',
  message: 'What did we discuss last week about TypeScript?'
});

// ClawInfra automatically:
// 1. Embeds the user's question
// 2. Searches vector DB for similar past conversations
// 3. Retrieves relevant memories above similarity threshold
// 4. Includes them in the agent's context
```

### Manual Retrieval

Explicitly retrieve memories for custom use cases:

```typescript
// Search memories by query
const memories = await enhancedAgent.memory.search({
  userId: 'user-123',
  query: 'TypeScript discussions',
  limit: 5,
  similarityThreshold: 0.8
});

console.log(memories);
// [
//   { text: '...', timestamp: '...', similarity: 0.92 },
//   { text: '...', timestamp: '...', similarity: 0.87 },
//   ...
// ]
```

### Time-Based Retrieval

Retrieve memories from a specific time period:

```typescript
const recentMemories = await enhancedAgent.memory.getByTimeRange({
  userId: 'user-123',
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-01-31'),
  limit: 10
});
```

## Memory Configuration Options

### Full Configuration

```typescript
memory: {
  // Core settings
  enabled: boolean;
  provider: 'pinecone' | 'weaviate' | 'qdrant';

  // Provider credentials
  apiKey?: string;
  url?: string;
  environment?: string;

  // Retrieval settings
  maxContext: number;              // Max memories to retrieve (default: 20)
  similarityThreshold: number;     // 0-1, min similarity (default: 0.7)

  // Storage settings
  retentionDays?: number;          // Days to keep memories (default: 90)
  maxStorageSize?: string;         // Max storage per user (e.g., '100MB')

  // Embedding settings
  embeddingModel?: string;         // Model for embeddings (default: 'text-embedding-ada-002')
  embeddingDimensions?: number;    // Embedding dimensions (default: 1536)

  // Privacy settings
  encryptMemories?: boolean;       // Encrypt stored memories (default: true)
  allowDeletion?: boolean;         // Allow users to delete memories (default: true)
}
```

## Memory Management

### Delete User Memories

Allow users to delete their data:

```typescript
// Delete all memories for a user
await enhancedAgent.memory.deleteUser('user-123');

// Delete specific memories
await enhancedAgent.memory.delete({
  userId: 'user-123',
  memoryIds: ['mem-1', 'mem-2', 'mem-3']
});

// Delete memories by time range
await enhancedAgent.memory.deleteByTimeRange({
  userId: 'user-123',
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-01-31')
});
```

### Export User Data

Export user memories for compliance (GDPR, etc.):

```typescript
const userData = await enhancedAgent.memory.export({
  userId: 'user-123',
  format: 'json' // or 'csv'
});

// Download or send to user
fs.writeFileSync('user-data.json', JSON.stringify(userData, null, 2));
```

## Best Practices

### 1. Privacy and Compliance

Always respect user privacy and comply with regulations:

```typescript
memory: {
  enabled: true,
  provider: 'pinecone',
  encryptMemories: true,        // Encrypt at rest
  allowDeletion: true,          // Let users delete data
  retentionDays: 90,            // Auto-delete old data
  detectPII: true,              // Detect and handle PII
  redactSensitive: true         // Redact sensitive info
}
```

### 2. Optimize for Performance

Balance memory depth with performance:

```typescript
memory: {
  enabled: true,
  provider: 'pinecone',
  maxContext: 20,              // Don't retrieve too many
  similarityThreshold: 0.75,   // Higher = more relevant but fewer results
  cacheRetrievals: true        // Cache frequent queries
}
```

### 3. Context Window Management

Manage the agent's context window effectively:

```typescript
// For long conversations, periodically summarize
if (messageCount > 50) {
  const summary = await enhancedAgent.summarizeConversation({
    userId: 'user-123',
    keepRecent: 10 // Keep last 10 messages
  });

  // Store summary as a memory
  await enhancedAgent.memory.store({
    userId: 'user-123',
    type: 'summary',
    text: summary
  });
}
```

### 4. Memory Categories

Organize memories by type for better retrieval:

```typescript
// Store categorized memories
await enhancedAgent.memory.store({
  userId: 'user-123',
  text: 'User prefers TypeScript over JavaScript',
  category: 'preference',
  tags: ['language', 'typescript'],
  importance: 0.9 // 0-1 scale
});

// Retrieve by category
const preferences = await enhancedAgent.memory.search({
  userId: 'user-123',
  category: 'preference',
  limit: 10
});
```

## Examples

### Example 1: Customer Support Agent

```typescript
const supportAgent = new ClawInfra(baseAgent, {
  personality: {
    name: 'Riley',
    traits: ['helpful', 'patient', 'empathetic']
  },
  memory: {
    enabled: true,
    provider: 'pinecone',
    maxContext: 30,
    retentionDays: 365, // Keep for 1 year
    categories: ['issues', 'preferences', 'solutions']
  }
});

// Customer returns with same issue
const response = await supportAgent.chat({
  userId: 'customer-789',
  message: 'I\'m having that login problem again'
});

// Agent automatically recalls:
// - Previous login issues
// - Solutions that worked
// - Customer's technical level
```

### Example 2: Personal AI Assistant

```typescript
const assistant = new ClawInfra(baseAgent, {
  personality: {
    name: 'Ada',
    traits: ['organized', 'proactive', 'detail-oriented']
  },
  memory: {
    enabled: true,
    provider: 'weaviate',
    maxContext: 50,
    retentionDays: 730, // 2 years
    categories: ['tasks', 'preferences', 'habits', 'contacts']
  }
});

// Assistant learns user habits
await assistant.chat({
  userId: 'user-123',
  message: 'Schedule my morning standup for 9 AM'
});

// Later, assistant proactively suggests:
// "I noticed your standup is tomorrow at 9 AM.
//  Would you like me to prepare an agenda based on
//  your recent tasks?"
```

## Troubleshooting

### Memories not being retrieved

Check your similarity threshold:
```typescript
memory: {
  similarityThreshold: 0.6  // Lower = more results but less relevant
}
```

### High memory costs

Optimize retention and storage:
```typescript
memory: {
  retentionDays: 30,        // Reduce retention period
  maxStorageSize: '50MB',   // Limit storage per user
  autoCleanup: true         // Auto-delete old memories
}
```

### Slow retrieval

Enable caching:
```typescript
memory: {
  cacheRetrievals: true,
  cacheTTL: 3600           // Cache for 1 hour
}
```

## Next Steps

- [Caching and Optimization](personality-behavior.md) - Configure agent personality
- [Runtime and Lifecycle](runtime-lifecycle.md) - Understand agent lifecycle
- [Deployment](../guides/deployment.md) - Deploy to production

## Need Help?

- [Discord Community](https://discord.gg/clawinfra)
- [GitHub Discussions](https://github.com/gwentanky/clawinfra/sdk/discussions)
- [Email Support](mailto:support@clawinfra.dev)
