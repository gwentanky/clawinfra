# Get Agent Details

Retrieve detailed information about a specific agent.

## Endpoint

```
GET https://api.clawinfra.dev/v1/agents/{agentId}
```

## Authentication

This endpoint requires an API key. Include it in the request headers:

```
Authorization: Bearer YOUR_API_KEY
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agentId` | string | Yes | The unique identifier of the agent |

## Example Request

```bash
curl -X GET https://api.clawinfra.dev/v1/agents/agent_a1b2c3d4e5f6 \
  -H "Authorization: Bearer YOUR_API_KEY"
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
    "bio": [
      "I am ClawBot, an AI agent specialized in blockchain technology.",
      "I help users understand and navigate the Web3 ecosystem."
    ],
    "personality": {
      "traits": ["helpful", "analytical", "friendly"],
      "style": "professional yet approachable",
      "tone": "informative and supportive"
    },
    "knowledge": [
      "Expert in blockchain technology and DeFi protocols"
    ],
    "goals": [
      "Help users understand complex blockchain concepts"
    ],
    "clients": ["discord", "twitter"],
    "settings": {
      "discord": {
        "channels": ["general", "support"],
        "respondToMentions": true
      },
      "twitter": {
        "enableReplies": true,
        "postFrequency": "4h"
      }
    },
    "modelProvider": "openai",
    "model": "gpt-4",
    "plugins": [
      {
        "name": "@clawinfra/plugin-evm",
        "enabled": true
      }
    ],
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-15T10:30:00Z",
    "metrics": {
      "totalMessages": 1523,
      "totalConversations": 287,
      "uptime": "99.8%"
    }
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

## Example Usage

### JavaScript

```javascript
const axios = require('axios');

const getAgent = async (agentId) => {
  try {
    const response = await axios.get(
      `https://api.clawinfra.dev/v1/agents/${agentId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.CLAW_API_KEY}`
        }
      }
    );

    console.log('Agent details:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching agent:', error.response?.data || error.message);
    throw error;
  }
};

getAgent('agent_a1b2c3d4e5f6');
```

### Python

```python
import requests
import os

def get_agent(agent_id):
    url = f"https://api.clawinfra.dev/v1/agents/{agent_id}"
    headers = {
        "Authorization": f"Bearer {os.getenv('CLAW_API_KEY')}"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        print("Agent details:", response.json()['data'])
        return response.json()['data']
    except requests.exceptions.RequestException as e:
        print(f"Error fetching agent: {e}")
        raise

get_agent('agent_a1b2c3d4e5f6')
```

## Related Endpoints

- [Create Agent](create-agent.md)
- [List All Agents](list-agents.md)
- [Update Agent](update-agent.md)
- [Delete Agent](delete-agent.md)
