# Contribute to Core

Learn how to contribute to ClawInfra core development and help improve the framework.

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm (recommended) or npm
- Git
- TypeScript knowledge
- Familiarity with AI/LLM concepts

### Development Setup

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/clawinfra.git
cd clawinfra

# Add upstream remote
git remote add upstream https://github.com/gwentanky/clawinfra.git

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test
```

## Development Workflow

### 1. Create a Feature Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

Follow the project structure:

```
clawinfra/
├── packages/
│   ├── core/          # Core functionality
│   ├── client/        # Client integrations
│   ├── plugins/       # Official plugins
│   └── server/        # API server
├── docs/              # Documentation
├── examples/          # Example projects
└── tests/             # Test suites
```

### 3. Write Tests

All new features must include tests:

```typescript
// tests/unit/agent.test.ts
import { Agent } from '../src/core/agent';

describe('Agent', () => {
  test('should create agent with valid config', () => {
    const agent = new Agent({
      name: 'Test Agent',
      personality: { traits: ['helpful'] }
    });

    expect(agent.name).toBe('Test Agent');
    expect(agent.personality.traits).toContain('helpful');
  });

  test('should throw error with invalid config', () => {
    expect(() => {
      new Agent({ name: '' });
    }).toThrow('Agent name is required');
  });
});
```

### 4. Run Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test agent.test.ts

# Run with coverage
pnpm test:coverage

# Run in watch mode
pnpm test:watch
```

### 5. Lint and Format

```bash
# Lint code
pnpm lint

# Fix lint issues
pnpm lint:fix

# Format code
pnpm format

# Type check
pnpm type-check
```

### 6. Commit Your Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <subject>

# Examples:
git commit -m "feat(core): add support for streaming responses"
git commit -m "fix(api): resolve rate limiting issue"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(agent): add tests for personality config"
git commit -m "refactor(plugins): improve plugin loading mechanism"
```

Commit types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### 7. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create PR on GitHub
gh pr create --title "feat(core): add streaming support" --body "Description of changes"
```

## Pull Request Guidelines

### PR Title

Use conventional commit format:

```
feat(core): add support for streaming responses
fix(api): resolve rate limiting issue
docs(guide): add plugin development tutorial
```

### PR Description Template

```markdown
## Description
Brief description of the changes

## Motivation
Why is this change needed?

## Changes
- List of specific changes
- Another change
- Yet another change

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Tests pass locally
- [ ] Code follows project style guide
- [ ] Documentation updated
- [ ] Changelog updated (if applicable)
- [ ] No breaking changes (or documented if necessary)
```

## Code Style Guide

### TypeScript Guidelines

```typescript
// Use explicit types
function createAgent(name: string, config: AgentConfig): Agent {
  return new Agent(name, config);
}

// Use interfaces for objects
interface AgentConfig {
  personality: PersonalityConfig;
  model?: string;
  plugins?: PluginConfig[];
}

// Use const assertions for constants
const DEFAULT_MODEL = 'gpt-4' as const;

// Use optional chaining
const modelName = agent.config?.model ?? DEFAULT_MODEL;

// Use async/await over promises
async function fetchData(): Promise<Data> {
  const response = await fetch(url);
  return await response.json();
}
```

### Naming Conventions

```typescript
// Classes: PascalCase
class AgentManager {}

// Interfaces: PascalCase
interface AgentConfig {}

// Types: PascalCase
type AgentStatus = 'active' | 'inactive';

// Functions/methods: camelCase
function createAgent() {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;

// Private properties: prefix with _
class Agent {
  private _id: string;
}
```

### File Organization

```typescript
// 1. Imports (grouped and sorted)
import { Agent } from './agent';
import { Plugin } from './plugin';
import type { AgentConfig } from './types';

// 2. Types and Interfaces
interface Config {
  // ...
}

// 3. Constants
const DEFAULT_TIMEOUT = 5000;

// 4. Main implementation
export class AgentManager {
  // ...
}

// 5. Helper functions
function validateConfig(config: Config): boolean {
  // ...
}
```

## Testing Guidelines

### Test Structure

```typescript
describe('Feature Name', () => {
  // Setup
  beforeAll(() => {
    // Runs once before all tests
  });

  beforeEach(() => {
    // Runs before each test
  });

  afterEach(() => {
    // Runs after each test
  });

  afterAll(() => {
    // Runs once after all tests
  });

  // Test cases
  describe('specific functionality', () => {
    test('should do something specific', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = doSomething(input);

      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

### Test Coverage

Aim for:
- **80%+ overall coverage**
- **100% for critical paths**
- **Edge cases covered**
- **Error conditions tested**

```bash
# Check coverage
pnpm test:coverage

# View HTML report
open coverage/index.html
```

## Documentation Guidelines

### Code Documentation

```typescript
/**
 * Creates a new AI agent with the specified configuration.
 *
 * @param name - The unique name for the agent
 * @param config - Agent configuration options
 * @returns A new Agent instance
 * @throws {ValidationError} If the configuration is invalid
 *
 * @example
 * ```typescript
 * const agent = createAgent('MyBot', {
 *   personality: { traits: ['helpful', 'friendly'] },
 *   model: 'gpt-4'
 * });
 * ```
 */
export function createAgent(name: string, config: AgentConfig): Agent {
  // Implementation
}
```

### README Updates

When adding features, update relevant README files:

```markdown
## New Feature

Brief description of the feature.

### Usage

\`\`\`typescript
// Example code
\`\`\`

### Configuration

| Option | Type | Description |
|--------|------|-------------|
| option1 | string | Description |
```

## Adding New Features

### API Endpoints

```typescript
// packages/server/src/routes/agents.ts
import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { agentSchema } from '../schemas/agent';

const router = Router();

/**
 * POST /v1/agents
 * Create a new agent
 */
router.post(
  '/agents',
  authenticate,
  validate(agentSchema),
  async (req, res) => {
    try {
      const agent = await createAgent(req.body);
      res.status(201).json({
        success: true,
        data: agent
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
);

export default router;
```

### Plugin System

```typescript
// packages/core/src/plugin-manager.ts
export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();

  async loadPlugin(name: string, config: PluginConfig): Promise<void> {
    // Validate plugin
    const plugin = await import(name);

    // Initialize plugin
    await plugin.default.initialize?.(config);

    // Register plugin
    this.plugins.set(name, plugin.default);
  }

  getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }
}
```

## Performance Guidelines

### Optimization Tips

```typescript
// ❌ Bad: Creating new objects in loops
for (const item of items) {
  const config = { ...defaultConfig, item };
  process(config);
}

// ✅ Good: Reuse objects
const config = { ...defaultConfig };
for (const item of items) {
  config.item = item;
  process(config);
}

// ❌ Bad: Unnecessary async/await
async function getData() {
  return await fetchData();
}

// ✅ Good: Return promise directly
function getData() {
  return fetchData();
}

// ❌ Bad: Sequential API calls
const user = await getUser(id);
const posts = await getPosts(id);

// ✅ Good: Parallel API calls
const [user, posts] = await Promise.all([
  getUser(id),
  getPosts(id)
]);
```

### Memory Management

```typescript
// Use WeakMap for caching when appropriate
const cache = new WeakMap<Agent, CachedData>();

// Clean up resources
class AgentManager {
  private agents: Map<string, Agent> = new Map();

  async shutdown(): Promise<void> {
    // Clean up all agents
    for (const agent of this.agents.values()) {
      await agent.cleanup();
    }
    this.agents.clear();
  }
}
```

## Security Guidelines

### Input Validation

```typescript
import { z } from 'zod';

const agentSchema = z.object({
  name: z.string().min(1).max(100),
  bio: z.array(z.string()).optional(),
  personality: z.object({
    traits: z.array(z.string())
  })
});

// Validate input
const validated = agentSchema.parse(input);
```

### API Key Handling

```typescript
// ❌ Bad: Logging sensitive data
console.log('API Key:', apiKey);

// ✅ Good: Redact sensitive data
console.log('API Key:', apiKey.slice(0, 8) + '...');

// ❌ Bad: Storing keys in code
const API_KEY = 'sk-1234567890';

// ✅ Good: Use environment variables
const API_KEY = process.env.CLAW_API_KEY;
```

## Review Process

### What Reviewers Look For

1. **Code Quality**
   - Follows style guide
   - Well-structured and readable
   - Proper error handling

2. **Tests**
   - Adequate test coverage
   - Tests pass consistently
   - Edge cases covered

3. **Documentation**
   - Clear comments
   - Updated README
   - API documentation

4. **Performance**
   - No obvious performance issues
   - Resource cleanup
   - Scalability considerations

5. **Security**
   - Input validation
   - No exposed secrets
   - Proper authentication

### Addressing Review Comments

```bash
# Make requested changes
git add .
git commit -m "refactor: address review comments"

# Update PR
git push origin feature/your-feature-name
```

## Release Process

### Versioning

We follow Semantic Versioning:

- **Major (1.0.0 → 2.0.0)**: Breaking changes
- **Minor (1.0.0 → 1.1.0)**: New features, backward compatible
- **Patch (1.0.0 → 1.0.1)**: Bug fixes

### Changelog

Update `CHANGELOG.md` for significant changes:

```markdown
## [1.2.0] - 2025-01-15

### Added
- Streaming response support (#123)
- New weather plugin (#124)

### Fixed
- Rate limiting issue (#125)
- Memory leak in agent cleanup (#126)

### Changed
- Updated OpenAI integration to v4 (#127)

### Deprecated
- Old plugin loading method (use new PluginManager)
```

## Getting Help

### Where to Ask Questions

- **Discord**: [ClawInfra Discord](https://discord.gg/clawinfra) - #contributors channel
- **GitHub Discussions**: For design discussions
- **GitHub Issues**: For bug reports and feature requests

### Resources

- [Architecture Overview](../runtime/core.md)
- [Plugin Development](create-plugin.md)
- [API Reference](../api-reference/overview.md)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Recognition

Contributors are recognized in:
- `CONTRIBUTORS.md` file
- Release notes
- Project README
- ClawInfra website (for significant contributions)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

- Be respectful and constructive
- Welcome newcomers
- Focus on what is best for the community
- Show empathy towards others

## Next Steps

- [Create a Plugin](create-plugin.md)
- [Test a Project](testing.md)
- [API Reference](../api-reference/overview.md)

## Thank You!

Thank you for contributing to ClawInfra! Your contributions help make ClawInfra better for everyone.

- [GitHub Repository](https://github.com/gwentanky/clawinfra)
- [Discord Community](https://discord.gg/clawinfra)
- [Twitter](https://twitter.com/clawinfra)
