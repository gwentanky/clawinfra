# Test a Project

Learn how to test your ClawInfra agents to ensure they work correctly and consistently.

## Overview

Testing is crucial for building reliable AI agents. This guide covers:

- Unit testing agent responses
- Integration testing with platforms
- Testing multi-agent interactions
- Performance and load testing
- Testing best practices

## Testing Strategies

### 1. Response Testing

Test that your agent responds appropriately to different inputs:

```javascript
const axios = require('axios');
const assert = require('assert');

const client = axios.create({
  baseURL: 'https://api.clawinfra.xyz/v1',
  headers: {
    'Authorization': `Bearer ${process.env.CLAW_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

async function testAgentResponse(agentId, input, expectedKeywords) {
  const response = await client.post(
    `/agents/${agentId}/messages`,
    {
      text: input,
      userId: 'test_user'
    }
  );

  const output = response.data.data.response.toLowerCase();

  // Check if response contains expected keywords
  for (const keyword of expectedKeywords) {
    assert(
      output.includes(keyword.toLowerCase()),
      `Response should contain "${keyword}"`
    );
  }

  console.log(`✓ Test passed: ${input}`);
  return response.data;
}

// Example test
async function runTests() {
  const agentId = 'your_agent_id';

  await testAgentResponse(
    agentId,
    'What is blockchain?',
    ['distributed', 'ledger', 'technology']
  );

  await testAgentResponse(
    agentId,
    'Explain DeFi',
    ['decentralized', 'finance', 'protocol']
  );

  console.log('All tests passed!');
}

runTests().catch(console.error);
```

### 2. Personality Testing

Verify that your agent maintains its personality:

```javascript
async function testPersonality(agentId) {
  const tests = [
    {
      input: 'Hello!',
      shouldContainTrait: 'friendly',
      check: (response) => {
        const friendly = /hi|hello|hey|greetings/i.test(response);
        assert(friendly, 'Agent should greet users warmly');
      }
    },
    {
      input: 'Can you help me?',
      shouldContainTrait: 'helpful',
      check: (response) => {
        const helpful = /sure|help|assist|glad|happy/i.test(response);
        assert(helpful, 'Agent should express willingness to help');
      }
    }
  ];

  for (const test of tests) {
    const response = await client.post(
      `/agents/${agentId}/messages`,
      {
        text: test.input,
        userId: 'personality_test'
      }
    );

    test.check(response.data.data.response);
    console.log(`✓ Personality test passed: ${test.shouldContainTrait}`);
  }
}
```

### 3. Context Memory Testing

Test that agents remember conversation context:

```javascript
async function testContextMemory(agentId) {
  const userId = 'context_test_user';

  // First message
  const msg1 = await client.post(
    `/agents/${agentId}/messages`,
    {
      text: 'My name is Alice',
      userId
    }
  );

  // Second message - agent should remember the name
  const msg2 = await client.post(
    `/agents/${agentId}/messages`,
    {
      text: 'What is my name?',
      userId
    }
  );

  const response = msg2.data.data.response.toLowerCase();
  assert(
    response.includes('alice'),
    'Agent should remember the user name'
  );

  console.log('✓ Context memory test passed');
}
```

## Testing Framework

Create a comprehensive testing framework:

```javascript
class AgentTester {
  constructor(agentId, apiKey) {
    this.agentId = agentId;
    this.client = axios.create({
      baseURL: 'https://api.clawinfra.xyz/v1',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    this.testResults = [];
  }

  async sendMessage(text, userId = 'test_user') {
    return await this.client.post(
      `/agents/${this.agentId}/messages`,
      { text, userId }
    );
  }

  async test(name, testFn) {
    try {
      await testFn();
      this.testResults.push({ name, status: 'passed' });
      console.log(`✓ ${name}`);
    } catch (error) {
      this.testResults.push({
        name,
        status: 'failed',
        error: error.message
      });
      console.log(`✗ ${name}: ${error.message}`);
    }
  }

  async assertResponse(input, assertions) {
    const response = await this.sendMessage(input);
    const output = response.data.data.response;

    if (assertions.contains) {
      for (const keyword of assertions.contains) {
        assert(
          output.toLowerCase().includes(keyword.toLowerCase()),
          `Response should contain "${keyword}"`
        );
      }
    }

    if (assertions.notContains) {
      for (const keyword of assertions.notContains) {
        assert(
          !output.toLowerCase().includes(keyword.toLowerCase()),
          `Response should not contain "${keyword}"`
        );
      }
    }

    if (assertions.regex) {
      assert(
        assertions.regex.test(output),
        `Response should match pattern ${assertions.regex}`
      );
    }

    if (assertions.maxLength) {
      assert(
        output.length <= assertions.maxLength,
        `Response should be at most ${assertions.maxLength} characters`
      );
    }

    return output;
  }

  printReport() {
    console.log('\n=== Test Report ===');
    const passed = this.testResults.filter(t => t.status === 'passed').length;
    const failed = this.testResults.filter(t => t.status === 'failed').length;

    console.log(`Total: ${this.testResults.length}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);

    if (failed > 0) {
      console.log('\nFailed tests:');
      this.testResults
        .filter(t => t.status === 'failed')
        .forEach(t => console.log(`  - ${t.name}: ${t.error}`));
    }
  }
}

// Usage
async function runAgentTests() {
  const tester = new AgentTester('your_agent_id', process.env.CLAW_API_KEY);

  await tester.test('Greets users warmly', async () => {
    await tester.assertResponse('Hello', {
      contains: ['hi', 'hello']
    });
  });

  await tester.test('Provides DeFi knowledge', async () => {
    await tester.assertResponse('What is DeFi?', {
      contains: ['decentralized', 'finance'],
      minLength: 50
    });
  });

  await tester.test('Maintains professional tone', async () => {
    await tester.assertResponse('Tell me about yourself', {
      notContains: ['slang', 'curse words']
    });
  });

  tester.printReport();
}

runAgentTests();
```

## Integration Testing

### Testing Platform Integrations

Test Discord integration:

```javascript
async function testDiscordIntegration(agentId) {
  // Update agent with Discord settings
  await client.patch(`/agents/${agentId}`, {
    clients: ['discord'],
    settings: {
      discord: {
        channels: ['test-channel'],
        respondToMentions: true
      }
    }
  });

  // Verify configuration
  const agent = await client.get(`/agents/${agentId}`);
  assert(
    agent.data.data.clients.includes('discord'),
    'Discord should be enabled'
  );

  console.log('✓ Discord integration configured');
}
```

### Testing Plugin Functionality

Test that plugins work correctly:

```javascript
async function testEVMPlugin(agentId) {
  // Enable EVM plugin
  await client.patch(`/agents/${agentId}`, {
    plugins: [
      {
        name: '@clawinfra/plugin-evm',
        enabled: true,
        config: {
          chains: ['ethereum']
        }
      }
    ]
  });

  // Test blockchain queries
  const response = await client.post(
    `/agents/${agentId}/messages`,
    {
      text: 'What is the current gas price on Ethereum?',
      userId: 'plugin_test'
    }
  );

  const output = response.data.data.response;
  assert(
    /\d+\s*(gwei|wei)/i.test(output),
    'Agent should provide gas price information'
  );

  console.log('✓ EVM plugin test passed');
}
```

## Performance Testing

### Response Time Testing

```javascript
async function testResponseTime(agentId, maxResponseTime = 5000) {
  const start = Date.now();

  await client.post(
    `/agents/${agentId}/messages`,
    {
      text: 'Quick question: what is 2+2?',
      userId: 'performance_test'
    }
  );

  const duration = Date.now() - start;

  assert(
    duration < maxResponseTime,
    `Response time ${duration}ms exceeded max ${maxResponseTime}ms`
  );

  console.log(`✓ Response time: ${duration}ms`);
  return duration;
}
```

### Load Testing

Test agent under load:

```javascript
async function loadTest(agentId, concurrentRequests = 10) {
  console.log(`Starting load test with ${concurrentRequests} concurrent requests...`);

  const requests = Array(concurrentRequests)
    .fill(null)
    .map((_, i) =>
      client.post(`/agents/${agentId}/messages`, {
        text: `Test message ${i}`,
        userId: `load_test_user_${i}`
      })
    );

  const start = Date.now();
  const results = await Promise.allSettled(requests);
  const duration = Date.now() - start;

  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;

  console.log(`\nLoad Test Results:`);
  console.log(`  Duration: ${duration}ms`);
  console.log(`  Successful: ${successful}/${concurrentRequests}`);
  console.log(`  Failed: ${failed}/${concurrentRequests}`);
  console.log(`  Avg time per request: ${(duration / concurrentRequests).toFixed(2)}ms`);

  assert(
    successful >= concurrentRequests * 0.95,
    'At least 95% of requests should succeed'
  );
}
```

## Multi-Agent Testing

Test interactions between multiple agents:

```javascript
async function testAgentCollaboration(agent1Id, agent2Id) {
  // Agent 1 provides data
  const data = await client.post(
    `/agents/${agent1Id}/messages`,
    {
      text: 'Provide current market data',
      userId: 'collab_test'
    }
  );

  // Agent 2 analyzes the data
  const analysis = await client.post(
    `/agents/${agent2Id}/messages`,
    {
      text: `Analyze this: ${data.data.data.response}`,
      userId: 'collab_test'
    }
  );

  assert(
    analysis.data.data.response.length > 50,
    'Analysis should be comprehensive'
  );

  console.log('✓ Multi-agent collaboration test passed');
}
```

## Automated Testing with CI/CD

### GitHub Actions Example

Create `.github/workflows/test-agents.yml`:

```yaml
name: Agent Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20'

    - name: Install dependencies
      run: npm install

    - name: Run agent tests
      env:
        CLAW_API_KEY: ${{ secrets.CLAW_API_KEY }}
        TEST_AGENT_ID: ${{ secrets.TEST_AGENT_ID }}
      run: npm test

    - name: Upload test results
      uses: actions/upload-artifact@v2
      if: always()
      with:
        name: test-results
        path: test-results/
```

### Test Script (package.json)

```json
{
  "scripts": {
    "test": "node tests/agent-tests.js",
    "test:integration": "node tests/integration-tests.js",
    "test:performance": "node tests/performance-tests.js",
    "test:all": "npm run test && npm run test:integration && npm run test:performance"
  }
}
```

## Test Data Management

### Creating Test Fixtures

```javascript
const testFixtures = {
  greetings: [
    'Hello',
    'Hi there',
    'Hey',
    'Good morning',
    'Greetings'
  ],

  defiQuestions: [
    'What is DeFi?',
    'Explain yield farming',
    'How do liquidity pools work?',
    'What is impermanent loss?'
  ],

  technicalQueries: [
    'What is a smart contract?',
    'Explain blockchain consensus',
    'How does Ethereum work?'
  ]
};

async function testWithFixtures(agentId) {
  for (const greeting of testFixtures.greetings) {
    await testAgentResponse(agentId, greeting, ['hi', 'hello', 'hey']);
  }

  for (const question of testFixtures.defiQuestions) {
    await testAgentResponse(agentId, question, ['defi', 'protocol']);
  }
}
```

## Best Practices

1. **Test Early and Often**: Integrate testing into your development workflow
2. **Isolate Tests**: Each test should be independent and repeatable
3. **Use Realistic Data**: Test with data similar to production scenarios
4. **Test Edge Cases**: Include unusual inputs and boundary conditions
5. **Monitor Performance**: Track response times and resource usage
6. **Automate Testing**: Set up CI/CD pipelines for automated testing
7. **Test in Staging**: Always test in a staging environment before production
8. **Document Tests**: Clear documentation helps maintain tests over time

## Debugging Tips

### Enable Verbose Logging

```javascript
async function debugAgent(agentId, message) {
  const response = await client.post(
    `/agents/${agentId}/messages`,
    {
      text: message,
      userId: 'debug_user',
      context: { debug: true }
    }
  );

  console.log('Request:', message);
  console.log('Response:', response.data.data.response);
  console.log('Metadata:', response.data.data.metadata);
  console.log('Tokens used:', response.data.data.metadata.tokensUsed);
  console.log('Response time:', response.data.data.metadata.responseTime);
}
```

### Test Individual Components

```javascript
async function testAgentComponent(agentId, component) {
  switch (component) {
    case 'personality':
      await testPersonality(agentId);
      break;
    case 'memory':
      await testContextMemory(agentId);
      break;
    case 'plugins':
      await testEVMPlugin(agentId);
      break;
    case 'performance':
      await testResponseTime(agentId);
      break;
    default:
      console.log('Unknown component');
  }
}
```

## Next Steps

- [Deploy a Project](deployment.md) - Deploy tested agents to production
- [Multiple Agents](multiple-agents.md) - Test multi-agent systems
- [API Reference](../api-reference/overview.md) - Complete API documentation

## Need Help?

- [Discord Community](https://discord.gg/clawinfra)
- [GitHub Discussions](https://github.com/gwentanky/clawinfra/discussions)
- [GitHub Issues](https://github.com/gwentanky/clawinfra/issues)
