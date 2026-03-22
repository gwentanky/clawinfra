# Update Agent

Update an existing agent's configuration and settings.

## Endpoint

```
PATCH https://api.clawinfra.dev/v1/agents/{agentId}
```

## Authentication

This endpoint requires an API key. Include it in the request headers:

```
Authorization: Bearer YOUR_API_KEY
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agentId` | string | Yes | The unique identifier of the agent to update |

## Request Body

All fields are optional. Only include the fields you want to update.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | The name of the agent |
| `bio` | array | Array of biographical statements |
| `personality` | object | Personality traits and communication style |
| `knowledge` | array | Areas of expertise |
| `goals` | array | Agent's objectives |
| `clients` | array | Platform integrations |
| `settings` | object | Platform-specific configuration |
| `modelProvider` | string | AI model provider |
| `model` | string | Specific model to use |
| `plugins` | array | Plugin configurations |
| `status` | string | Agent status (active, inactive) |

### Example Request Body

```json
{
  "bio": [
    "I am ClawBot, an AI agent specialized in blockchain and AI.",
    "I help users understand Web3 and artificial intelligence.",
    "I'm constantly learning and improving."
  ],
  "personality": {
    "traits": ["helpful", "analytical", "friendly", "innovative"],
    "style": "professional and engaging"
  },
  "clients": ["discord", "twitter", "telegram"],
  "settings": {
    "telegram": {
      "groupIds": ["@clawinfra"],
      "respondToCommands": true
    }
  }
}
```

## Response

### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "agent_a1b2c3d4e5f6",
    "name": "ClawBot",
    "status": "active",
    "updatedAt": "2025-01-15T11:45:00Z",
    "changes": [
      "bio",
      "personality",
      "clients",
      "settings"
    ]
  }
}
```

### Error Response (404 Not Found)

```json
{
  "success": false,
  "error": {
    "code": "AGENT_NOT_FOUND",
    "message": "Agent with ID 'agent_a1b2c3d4e5f6' not found"
  }
}
```

### Error Response (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid model provider specified",
    "details": {
      "field": "modelProvider",
      "reason": "Must be one of: openai, anthropic, google-genai, ollama"
    }
  }
}
```

## Example Request

### cURL

```bash
curl -X PATCH https://api.clawinfra.dev/v1/agents/agent_a1b2c3d4e5f6 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "personality": {
      "traits": ["helpful", "analytical", "innovative"],
      "style": "professional and engaging"
    },
    "clients": ["discord", "twitter", "telegram"]
  }'
```

### JavaScript

```javascript
const axios = require('axios');

const updateAgent = async (agentId, updates) => {
  try {
    const response = await axios.patch(
      `https://api.clawinfra.dev/v1/agents/${agentId}`,
      updates,
      {
        headers: {
          'Authorization': `Bearer ${process.env.CLAW_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Agent updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating agent:', error.response?.data || error.message);
    throw error;
  }
};

// Example: Add Telegram client and update personality
updateAgent('agent_a1b2c3d4e5f6', {
  personality: {
    traits: ['helpful', 'analytical', 'innovative'],
    style: 'professional and engaging'
  },
  clients: ['discord', 'twitter', 'telegram']
});
```

### Python

```python
import requests
import os

def update_agent(agent_id, updates):
    url = f"https://api.clawinfra.dev/v1/agents/{agent_id}"
    headers = {
        "Authorization": f"Bearer {os.getenv('CLAW_API_KEY')}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.patch(url, json=updates, headers=headers)
        response.raise_for_status()
        print("Agent updated:", response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error updating agent: {e}")
        raise

# Example: Update personality and add Telegram
update_agent('agent_a1b2c3d4e5f6', {
    "personality": {
        "traits": ["helpful", "analytical", "innovative"],
        "style": "professional and engaging"
    },
    "clients": ["discord", "twitter", "telegram"]
})
```

## Partial Updates

This endpoint supports partial updates, meaning you only need to send the fields you want to change. Other fields will remain unchanged.

### Example: Update Only Status

```bash
curl -X PATCH https://api.clawinfra.dev/v1/agents/agent_a1b2c3d4e5f6 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "inactive"}'
```

## Best Practices

1. **Update incrementally**: Make small, focused updates rather than large bulk changes
2. **Test changes**: Test caching and optimization updates in a development environment first
3. **Version control**: Keep track of configuration changes for rollback purposes
4. **Monitor impact**: Check agent metrics after updates to ensure desired behavior
5. **Gradual rollout**: For production agents, consider creating a test clone first

## Related Endpoints

- [Create Agent](create-agent.md)
- [Get Agent Details](get-agent.md)
- [List All Agents](list-agents.md)
- [Delete Agent](delete-agent.md)
