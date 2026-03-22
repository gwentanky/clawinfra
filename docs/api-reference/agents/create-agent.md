# Create a New Agent

Create a new agent with custom configuration and personality.

## Endpoint

```
POST https://api.clawinfra.dev/v1/agents
```

## Authentication

This endpoint requires an API key. Include it in the request headers:

```
Authorization: Bearer YOUR_API_KEY
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | The name of the agent |
| `bio` | array | No | Array of biographical statements about the agent |
| `personality` | object | No | Personality traits and communication style |
| `knowledge` | array | No | Areas of expertise and knowledge |
| `goals` | array | No | Agent's objectives and motivations |
| `clients` | array | No | Platform integrations (discord, twitter, telegram, etc.) |
| `settings` | object | No | Platform-specific configuration |
| `modelProvider` | string | No | AI model provider (openai, anthropic, etc.) |
| `model` | string | No | Specific model to use (gpt-4, claude-3-opus, etc.) |
| `plugins` | array | No | Array of plugin configurations |

### Example Request Body

```json
{
  "name": "ClawBot",
  "bio": [
    "I am ClawBot, an AI agent specialized in blockchain technology.",
    "I help users understand and navigate the Web3 ecosystem.",
    "I'm knowledgeable, helpful, and always learning."
  ],
  "personality": {
    "traits": ["helpful", "analytical", "friendly", "knowledgeable"],
    "style": "professional yet approachable",
    "tone": "informative and supportive"
  },
  "knowledge": [
    "Expert in blockchain technology and DeFi protocols",
    "Understanding of smart contracts",
    "Familiar with various Web3 platforms and tools"
  ],
  "goals": [
    "Help users understand complex blockchain concepts",
    "Provide accurate and timely information",
    "Foster learning in the Web3 community"
  ],
  "clients": ["discord", "twitter"],
  "settings": {
    "discord": {
      "channels": ["general", "support"],
      "respondToMentions": true
    },
    "twitter": {
      "enableReplies": true,
      "enableMentions": true,
      "postFrequency": "4h"
    }
  },
  "modelProvider": "openai",
  "model": "gpt-4",
  "plugins": [
    {
      "name": "@clawinfra/plugin-evm",
      "enabled": true,
      "config": {
        "chains": ["ethereum", "polygon"]
      }
    }
  ]
}
```

## Response

### Success Response (201 Created)

```json
{
  "success": true,
  "data": {
    "id": "agent_a1b2c3d4e5f6",
    "name": "ClawBot",
    "status": "active",
    "createdAt": "2025-01-15T10:30:00Z",
    "apiEndpoint": "https://api.clawinfra.dev/v1/agents/agent_a1b2c3d4e5f6"
  }
}
```

### Error Response (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Name is required",
    "details": {
      "field": "name",
      "reason": "Field is required"
    }
  }
}
```

### Error Response (401 Unauthorized)

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key"
  }
}
```

## Example Request

### cURL

```bash
curl -X POST https://api.clawinfra.dev/v1/agents \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ClawBot",
    "bio": [
      "I am ClawBot, an AI agent specialized in blockchain technology."
    ],
    "personality": {
      "traits": ["helpful", "analytical"],
      "style": "professional yet approachable"
    },
    "clients": ["discord"],
    "modelProvider": "openai",
    "model": "gpt-4"
  }'
```

### JavaScript (Node.js)

```javascript
const axios = require('axios');

const createAgent = async () => {
  try {
    const response = await axios.post(
      'https://api.clawinfra.dev/v1/agents',
      {
        name: 'ClawBot',
        bio: [
          'I am ClawBot, an AI agent specialized in blockchain technology.'
        ],
        personality: {
          traits: ['helpful', 'analytical'],
          style: 'professional yet approachable'
        },
        clients: ['discord'],
        modelProvider: 'openai',
        model: 'gpt-4'
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.CLAW_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Agent created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating agent:', error.response?.data || error.message);
    throw error;
  }
};

createAgent();
```

### Python

```python
import requests
import os

def create_agent():
    url = "https://api.clawinfra.dev/v1/agents"
    headers = {
        "Authorization": f"Bearer {os.getenv('CLAW_API_KEY')}",
        "Content-Type": "application/json"
    }
    data = {
        "name": "ClawBot",
        "bio": [
            "I am ClawBot, an AI agent specialized in blockchain technology."
        ],
        "personality": {
            "traits": ["helpful", "analytical"],
            "style": "professional yet approachable"
        },
        "clients": ["discord"],
        "modelProvider": "openai",
        "model": "gpt-4"
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        print("Agent created:", response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error creating agent: {e}")
        raise

create_agent()
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Indicates if the request was successful |
| `data.id` | string | Unique identifier for the created agent |
| `data.name` | string | Name of the agent |
| `data.status` | string | Current status of the agent (active, inactive, error) |
| `data.createdAt` | string | ISO 8601 timestamp of agent creation |
| `data.apiEndpoint` | string | API endpoint for interacting with this agent |

## Rate Limits

- **Rate Limit**: 10 requests per minute
- **Quota**: 100 agents per account

Rate limit headers are included in the response:
- `X-RateLimit-Limit`: Maximum requests per minute
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Timestamp when the rate limit resets

## Best Practices

1. **Use descriptive names**: Choose clear, unique names for your agents
2. **Define personality clearly**: Well-defined personalities lead to consistent behavior
3. **Start with fewer plugins**: Add plugins incrementally and test thoroughly
4. **Set appropriate rate limits**: Configure platform-specific rate limits to avoid API restrictions
5. **Store agent IDs securely**: Save the returned agent ID for future API calls

## Related Endpoints

- [List All Agents](list-agents.md)
- [Get Agent Details](get-agent.md)
- [Update Agent](update-agent.md)
- [Delete Agent](delete-agent.md)
- [Send Message to Agent](send-message.md)

## Need Help?

- [API Overview](../overview.md)
- [Authentication Guide](../authentication.md)
- [Error Codes Reference](../errors.md)
- [Discord Community](https://discord.gg/clawinfra)
- [GitHub Issues](https://github.com/gwentanky/clawinfra/issues)
