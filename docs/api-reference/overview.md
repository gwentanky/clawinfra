# API Overview

Welcome to the ClawInfra API documentation. This comprehensive guide provides systematic instructions for architecting and managing enterprise-grade AI agents through our production-ready REST API.

## Base URL

All API requests should be made to:

```
https://api.clawinfra.dev/v1
```

## Authentication

ClawInfra uses API keys for authentication. Include your API key in the request headers:

```
Authorization: Bearer YOUR_API_KEY
```

### Getting an API Key

1. Sign up at [clawinfra.dev](https://clawinfra.dev)
2. Navigate to Settings → API Keys
3. Generate a new API key
4. Store it securely (it won't be shown again)

### Security Best Practices

- **Never commit API keys** to version control
- **Use environment variables** to store API keys
- **Rotate keys regularly** (every 90 days recommended)
- **Use different keys** for development and production
- **Revoke unused keys** immediately

## API Endpoints

### Agents

Manage your AI agents:

- [Create Agent](agents/create-agent.md) - `POST /agents`
- [List Agents](agents/list-agents.md) - `GET /agents`
- [Get Agent](agents/get-agent.md) - `GET /agents/{agentId}`
- [Update Agent](agents/update-agent.md) - `PATCH /agents/{agentId}`
- [Delete Agent](agents/delete-agent.md) - `DELETE /agents/{agentId}`
- [Send Message](agents/send-message.md) - `POST /agents/{agentId}/messages`

### Characters

Manage agent character configurations (coming soon)

### Conversations

Access conversation history and analytics (coming soon)

### Plugins

Manage and configure plugins (coming soon)

## Request Format

All POST and PATCH requests should include a JSON body with the `Content-Type: application/json` header:

```bash
curl -X POST https://api.clawinfra.dev/v1/agents \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "MyAgent"}'
```

## Response Format

All API responses follow this structure:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Additional error details
    }
  }
}
```

## HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

## Rate Limits

Default rate limits apply to all endpoints:

- **Standard tier**: 60 requests per minute
- **Pro tier**: 300 requests per minute
- **Enterprise tier**: Custom limits

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1642089600
```

### Handling Rate Limits

When you exceed the rate limit, you'll receive a 429 status code:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 30 seconds.",
    "details": {
      "retryAfter": 30
    }
  }
}
```

Implement exponential backoff:

```javascript
const makeRequestWithRetry = async (fn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.response?.status === 429 && i < maxRetries - 1) {
        const retryAfter = error.response.data.error.details?.retryAfter || Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        continue;
      }
      throw error;
    }
  }
};
```

## Pagination

List endpoints support pagination:

```
GET /agents?page=1&limit=20
```

Response includes pagination metadata:

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 95,
      "itemsPerPage": 20
    }
  }
}
```

## Versioning

The API version is included in the URL path:

```
https://api.clawinfra.dev/v1/agents
```

We maintain backward compatibility within major versions. Breaking changes will result in a new major version (v2, v3, etc.).

## SDKs and Libraries

Official SDKs are available for popular languages:

- **JavaScript/TypeScript**: `npm install @clawinfra/sdk`
- **Python**: `pip install clawinfra`
- **Go**: `go get github.com/clawinfra-dev/clawinfra-go`
- **Ruby**: `gem install clawinfra`

### Quick Start with SDK

```javascript
const { ClawInfra } = require('@clawinfra/sdk');

const claw = new ClawInfra({
  apiKey: process.env.CLAW_API_KEY
});

// Deploy an agent
const agent = await claw.agents.create({
  name: 'MyAgent',
  personality: {
    traits: ['helpful', 'friendly']
  }
});

// Send a message
const response = await claw.agents.sendMessage(agent.id, {
  text: 'Hello!',
  userId: 'user_123'
});

console.log(response.data.response);
```

## Webhooks

Configure webhooks to receive real-time notifications about agent events (coming soon).

## Error Codes

Common error codes you may encounter:

| Code | Description |
|------|-------------|
| `INVALID_REQUEST` | Request parameters are invalid |
| `UNAUTHORIZED` | Invalid or missing API key |
| `AGENT_NOT_FOUND` | Requested agent doesn't exist |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `INSUFFICIENT_QUOTA` | Account quota exceeded |
| `AGENT_UNAVAILABLE` | Agent is not responding |
| `MODEL_ERROR` | AI model provider error |

See the [Error Codes Reference](errors.md) for complete details.

## Support

Need help?

- [API Documentation](https://docs.clawinfra.dev)
- [Discord Community](https://discord.gg/clawinfra)
- [GitHub Issues](https://github.com/gwentanky/clawinfra/issues)
- Email: [support@clawinfra.dev](mailto:support@clawinfra.dev)

## Changelog

Stay updated with API changes:

- [API Changelog](https://docs.clawinfra.dev/api-reference/changelog)
- [Release Notes](https://github.com/gwentanky/clawinfra/releases)
