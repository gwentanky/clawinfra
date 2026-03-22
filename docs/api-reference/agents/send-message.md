# Send Message to Agent

Send a message to an agent and receive a response.

## Endpoint

```
POST https://api.clawinfra.dev/v1/agents/{agentId}/messages
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

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | The message text to send to the agent |
| `userId` | string | No | Unique identifier for the user (for conversation continuity) |
| `roomId` | string | No | Conversation room ID (for multi-user conversations) |
| `context` | object | No | Additional context for the conversation |
| `stream` | boolean | No | Enable streaming response (default: false) |

### Example Request Body

```json
{
  "text": "What is the current price of ETH?",
  "userId": "user_123",
  "roomId": "room_abc",
  "context": {
    "platform": "discord",
    "channel": "defi-discussion"
  }
}
```

## Response

### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "messageId": "msg_xyz789",
    "response": "The current price of ETH is approximately $3,245 USD. This represents a 2.3% increase over the last 24 hours. Would you like more detailed market analysis?",
    "agentId": "agent_a1b2c3d4e5f6",
    "userId": "user_123",
    "roomId": "room_abc",
    "timestamp": "2025-01-15T12:30:00Z",
    "metadata": {
      "tokensUsed": 156,
      "responseTime": 1.2,
      "model": "gpt-4"
    }
  }
}
```

### Error Response (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_MESSAGE",
    "message": "Message text is required",
    "details": {
      "field": "text",
      "reason": "Field cannot be empty"
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

### Error Response (503 Service Unavailable)

```json
{
  "success": false,
  "error": {
    "code": "AGENT_UNAVAILABLE",
    "message": "Agent is currently unavailable",
    "details": {
      "status": "error",
      "reason": "Model provider rate limit exceeded"
    }
  }
}
```

## Example Request

### cURL

```bash
curl -X POST https://api.clawinfra.dev/v1/agents/agent_a1b2c3d4e5f6/messages \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "What is the current price of ETH?",
    "userId": "user_123"
  }'
```

### JavaScript

```javascript
const axios = require('axios');

const sendMessage = async (agentId, message, userId) => {
  try {
    const response = await axios.post(
      `https://api.clawinfra.dev/v1/agents/${agentId}/messages`,
      {
        text: message,
        userId: userId
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.CLAW_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Agent response:', response.data.data.response);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
    throw error;
  }
};

sendMessage('agent_a1b2c3d4e5f6', 'What is DeFi?', 'user_123');
```

### Python

```python
import requests
import os

def send_message(agent_id, message, user_id):
    url = f"https://api.clawinfra.dev/v1/agents/{agent_id}/messages"
    headers = {
        "Authorization": f"Bearer {os.getenv('CLAW_API_KEY')}",
        "Content-Type": "application/json"
    }
    data = {
        "text": message,
        "userId": user_id
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        print("Agent response:", response.json()['data']['response'])
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error sending message: {e}")
        raise

send_message('agent_a1b2c3d4e5f6', 'What is DeFi?', 'user_123')
```

## Streaming Responses

For real-time responses, enable streaming mode:

### JavaScript with Streaming

```javascript
const EventSource = require('eventsource');

const sendStreamingMessage = (agentId, message, userId) => {
  const url = `https://api.clawinfra.dev/v1/agents/${agentId}/messages/stream`;

  const eventSource = new EventSource(url, {
    headers: {
      'Authorization': `Bearer ${process.env.CLAW_API_KEY}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      text: message,
      userId: userId
    })
  });

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'token') {
      process.stdout.write(data.content);
    } else if (data.type === 'done') {
      console.log('\n\nResponse complete');
      eventSource.close();
    }
  };

  eventSource.onerror = (error) => {
    console.error('Stream error:', error);
    eventSource.close();
  };
};

sendStreamingMessage('agent_a1b2c3d4e5f6', 'Explain blockchain technology', 'user_123');
```

## Conversation Context

The agent maintains conversation context using `userId` and `roomId`:

```javascript
// First message
await sendMessage('agent_a1b2c3d4e5f6', 'What is Ethereum?', 'user_123');

// Follow-up message (agent remembers context)
await sendMessage('agent_a1b2c3d4e5f6', 'How do I buy it?', 'user_123');
// Agent knows "it" refers to Ethereum
```

## Rate Limits

- **Rate Limit**: 60 requests per minute per agent
- **Concurrent Requests**: 10 simultaneous requests per agent

Rate limit headers are included in the response:
- `X-RateLimit-Limit`: Maximum requests per minute
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset timestamp

## Best Practices

1. **Use userId consistently**: Always send the same userId for the same user to maintain context
2. **Handle rate limits**: Implement exponential backoff for rate limit errors
3. **Set timeouts**: Configure appropriate request timeouts (30s recommended)
4. **Stream long responses**: Use streaming for responses that may be lengthy
5. **Validate input**: Sanitize user input before sending to the agent

## Related Endpoints

- [Get Conversation History](get-conversation.md)
- [Create Agent](create-agent.md)
- [Get Agent Details](get-agent.md)
