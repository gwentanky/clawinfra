# Delete Agent

Permanently delete an agent and all associated data.

## Endpoint

```
DELETE https://api.clawinfra.dev/v1/agents/{agentId}
```

## Authentication

This endpoint requires an API key. Include it in the request headers:

```
Authorization: Bearer YOUR_API_KEY
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agentId` | string | Yes | The unique identifier of the agent to delete |

## ⚠️ Warning

**This action is irreversible.** Deleting an agent will:
- Permanently remove the agent configuration
- Delete all conversation history
- Remove all associated metrics and logs
- Disconnect from all platform integrations

Consider using the [Update Agent](update-agent.md) endpoint to set status to `inactive` instead if you want to preserve data.

## Example Request

```bash
curl -X DELETE https://api.clawinfra.dev/v1/agents/agent_a1b2c3d4e5f6 \
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
    "deletedAt": "2025-01-15T12:00:00Z",
    "message": "Agent successfully deleted"
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

### Error Response (403 Forbidden)

```json
{
  "success": false,
  "error": {
    "code": "DELETE_PROTECTED",
    "message": "Agent is protected from deletion. Disable protection first.",
    "details": {
      "protection": "enabled",
      "reason": "Agent has active subscriptions"
    }
  }
}
```

## Example Usage

### JavaScript

```javascript
const axios = require('axios');

const deleteAgent = async (agentId) => {
  // Confirm before deletion
  const confirmed = confirm(`Are you sure you want to delete agent ${agentId}?`);
  if (!confirmed) {
    console.log('Deletion cancelled');
    return;
  }

  try {
    const response = await axios.delete(
      `https://api.clawinfra.dev/v1/agents/${agentId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.CLAW_API_KEY}`
        }
      }
    );

    console.log('Agent deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting agent:', error.response?.data || error.message);
    throw error;
  }
};

deleteAgent('agent_a1b2c3d4e5f6');
```

### Python

```python
import requests
import os

def delete_agent(agent_id, confirm=False):
    if not confirm:
        print("Please set confirm=True to delete the agent")
        return

    url = f"https://api.clawinfra.dev/v1/agents/{agent_id}"
    headers = {
        "Authorization": f"Bearer {os.getenv('CLAW_API_KEY')}"
    }

    try:
        response = requests.delete(url, headers=headers)
        response.raise_for_status()
        print("Agent deleted:", response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error deleting agent: {e}")
        raise

# Must explicitly confirm deletion
delete_agent('agent_a1b2c3d4e5f6', confirm=True)
```

## Safe Deletion Process

For production agents, follow this safe deletion process:

1. **Backup configuration**: Export agent configuration before deletion
2. **Set to inactive**: Update agent status to `inactive` first
3. **Monitor for 24 hours**: Ensure no critical dependencies
4. **Export data**: Download conversation logs and metrics
5. **Delete**: Execute the deletion

### Example Backup Before Delete

```javascript
const safeDeleteAgent = async (agentId) => {
  // 1. Get and backup agent configuration
  const agent = await axios.get(
    `https://api.clawinfra.dev/v1/agents/${agentId}`,
    {
      headers: { 'Authorization': `Bearer ${process.env.CLAW_API_KEY}` }
    }
  );

  // Save to file
  fs.writeFileSync(
    `agent_backup_${agentId}.json`,
    JSON.stringify(agent.data, null, 2)
  );

  // 2. Set to inactive
  await axios.patch(
    `https://api.clawinfra.dev/v1/agents/${agentId}`,
    { status: 'inactive' },
    {
      headers: { 'Authorization': `Bearer ${process.env.CLAW_API_KEY}` }
    }
  );

  console.log('Agent set to inactive. Wait 24 hours before deletion.');
  console.log(`Backup saved to agent_backup_${agentId}.json`);

  // 3. After 24 hours, delete
  // await axios.delete(...);
};
```

## Bulk Deletion

To delete multiple agents, make individual DELETE requests:

```javascript
const deleteMultipleAgents = async (agentIds) => {
  const results = await Promise.all(
    agentIds.map(id =>
      axios.delete(
        `https://api.clawinfra.dev/v1/agents/${id}`,
        {
          headers: { 'Authorization': `Bearer ${process.env.CLAW_API_KEY}` }
        }
      )
    )
  );

  console.log(`Deleted ${results.length} agents`);
  return results;
};

deleteMultipleAgents(['agent_1', 'agent_2', 'agent_3']);
```

## Related Endpoints

- [Create Agent](create-agent.md)
- [Update Agent](update-agent.md)
- [Get Agent Details](get-agent.md)
- [List All Agents](list-agents.md)
