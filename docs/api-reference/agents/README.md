# Agents API

The Agents API allows you to create, manage, and interact with AI agents programmatically.

## Overview

Agents are autonomous AI entities with customizable personalities, knowledge bases, and capabilities. Through the Agents API, you can:

- Create and configure new agents
- Update agent settings and behavior
- Send messages and receive responses
- Monitor agent performance and metrics
- Manage agent lifecycle

## Base URL

```
https://api.clawinfra.dev/v1/agents
```

## Authentication

All agent endpoints require authentication using an API key:

```
Authorization: Bearer YOUR_API_KEY
```

## Available Endpoints

### Agent Management

- **[Create Agent](create-agent.md)** - `POST /agents`
  - Create a new agent with custom configuration

- **[List Agents](list-agents.md)** - `GET /agents`
  - Retrieve all agents in your account

- **[Get Agent](get-agent.md)** - `GET /agents/{agentId}`
  - Get detailed information about a specific agent

- **[Update Agent](update-agent.md)** - `PATCH /agents/{agentId}`
  - Update an agent's configuration

- **[Delete Agent](delete-agent.md)** - `DELETE /agents/{agentId}`
  - Permanently delete an agent

### Agent Interaction

- **[Send Message](send-message.md)** - `POST /agents/{agentId}/messages`
  - Send a message to an agent and receive a response

## Quick Example

Here's a quick example of creating an agent and sending it a message:

```bash
# 1. Create an agent
AGENT_RESPONSE=$(curl -X POST https://api.clawinfra.dev/v1/agents \
  -H "Authorization: Bearer $CLAWINFRA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MyAgent",
    "bio": ["I am a helpful AI assistant"],
    "personality": {
      "traits": ["helpful", "friendly"],
      "style": "conversational"
    },
    "modelProvider": "openai",
    "model": "gpt-4"
  }')

# Extract agent ID
AGENT_ID=$(echo $AGENT_RESPONSE | jq -r '.data.id')

# 2. Send a message
curl -X POST https://api.clawinfra.dev/v1/agents/$AGENT_ID/messages \
  -H "Authorization: Bearer $CLAWINFRA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello! What can you help me with?",
    "userId": "user_123"
  }'
```

## Agent Configuration

Agents can be configured with:

- **Basic Info**: Name, bio, personality traits
- **Knowledge**: Areas of expertise and knowledge bases
- **Goals**: Objectives and motivations
- **Platforms**: Discord, Twitter, Telegram integrations
- **Plugins**: Extended capabilities (blockchain, images, etc.)
- **Model Settings**: AI provider and model selection

See [Create Agent](create-agent.md) for complete configuration options.

## Rate Limits

Agent endpoints have the following rate limits:

| Endpoint | Rate Limit |
|----------|------------|
| Create Agent | 10/minute |
| List Agents | 60/minute |
| Get Agent | 60/minute |
| Update Agent | 30/minute |
| Delete Agent | 10/minute |
| Send Message | 60/minute per agent |

## Best Practices

1. **Use consistent userIds** - Always send the same userId for the same user to maintain conversation context
2. **Handle errors gracefully** - Implement proper error handling and retry logic
3. **Monitor rate limits** - Check rate limit headers and implement backoff strategies
4. **Test before production** - Test agent configurations thoroughly before deploying
5. **Version control configs** - Keep agent configurations in version control for rollback capability

## SDKs

For easier integration, use our official SDKs:

- **JavaScript/TypeScript**: `npm install @clawinfra/sdk`
- **Python**: `pip install clawinfra`
- **Go**: `go get github.com/clawinfra-dev/clawinfra-go`

Example with SDK:

```javascript
const { ClawInfra } = require('@clawinfra/sdk');

const claw = new ClawInfra({ apiKey: process.env.CLAW_API_KEY });

// Create agent
const agent = await claw.agents.create({
  name: 'MyAgent',
  personality: { traits: ['helpful', 'friendly'] }
});

// Send message
const response = await claw.agents.sendMessage(agent.id, {
  text: 'Hello!',
  userId: 'user_123'
});
```

## Related Resources

- [API Overview](../overview.md)
- [Authentication Guide](../authentication.md)
- [Error Codes](../errors.md)
- [Quickstart Guide](../../getting-started/quickstart.md)

## Support

Need help with the Agents API?

- [Discord Community](https://discord.gg/clawinfra)
- [GitHub Discussions](https://github.com/gwentanky/clawinfra/discussions)
- [GitHub Issues](https://github.com/gwentanky/clawinfra/issues)
