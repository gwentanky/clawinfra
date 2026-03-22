# List All Agents

Retrieve a list of all agents in your account.

## Endpoint

```
GET https://api.clawinfra.dev/v1/agents
```

## Authentication

This endpoint requires an API key. Include it in the request headers:

```
Authorization: Bearer YOUR_API_KEY
```

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number for pagination (default: 1) |
| `limit` | integer | No | Number of agents per page (default: 20, max: 100) |
| `status` | string | No | Filter by status (active, inactive, error) |
| `sortBy` | string | No | Sort field (createdAt, name, status) |
| `order` | string | No | Sort order (asc, desc) default: desc |

## Example Request

```bash
curl -X GET "https://api.clawinfra.dev/v1/agents?page=1&limit=20&status=active" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Response

### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "agents": [
      {
        "id": "agent_a1b2c3d4e5f6",
        "name": "ClawBot",
        "status": "active",
        "createdAt": "2025-01-15T10:30:00Z",
        "updatedAt": "2025-01-15T10:30:00Z",
        "modelProvider": "openai",
        "model": "gpt-4",
        "clients": ["discord", "twitter"]
      },
      {
        "id": "agent_x7y8z9a0b1c2",
        "name": "DeFiOracle",
        "status": "active",
        "createdAt": "2025-01-14T08:15:00Z",
        "updatedAt": "2025-01-14T08:15:00Z",
        "modelProvider": "anthropic",
        "model": "claude-3-opus",
        "clients": ["discord"]
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 95,
      "itemsPerPage": 20
    }
  }
}
```

## Example Usage

### JavaScript

```javascript
const axios = require('axios');

const listAgents = async (page = 1, limit = 20) => {
  try {
    const response = await axios.get('https://api.clawinfra.dev/v1/agents', {
      params: { page, limit, status: 'active' },
      headers: {
        'Authorization': `Bearer ${process.env.CLAW_API_KEY}`
      }
    });

    console.log(`Found ${response.data.data.pagination.totalItems} agents`);
    return response.data.data.agents;
  } catch (error) {
    console.error('Error listing agents:', error.response?.data || error.message);
    throw error;
  }
};

listAgents();
```

### Python

```python
import requests
import os

def list_agents(page=1, limit=20):
    url = "https://api.clawinfra.dev/v1/agents"
    headers = {
        "Authorization": f"Bearer {os.getenv('CLAW_API_KEY')}"
    }
    params = {
        "page": page,
        "limit": limit,
        "status": "active"
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()
        print(f"Found {data['data']['pagination']['totalItems']} agents")
        return data['data']['agents']
    except requests.exceptions.RequestException as e:
        print(f"Error listing agents: {e}")
        raise

list_agents()
```

## Related Endpoints

- [Create Agent](create-agent.md)
- [Get Agent Details](get-agent.md)
- [Update Agent](update-agent.md)
- [Delete Agent](delete-agent.md)
