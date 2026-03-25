# Projects Overview

Learn about ClawInfra project structure and organization.

## What is an ClawInfra Project?

An ClawInfra project is a structured application that uses the ClawInfra framework to create and manage AI agents. Projects can range from simple single-agent applications to complex multi-agent systems.

## Project Structure

A typical ClawInfra project has the following structure:

```
my-clawinfra-project/
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── characters/            # Agent character files
│   ├── agent1.json
│   └── agent2.json
├── plugins/               # Custom plugins
│   └── my-plugin/
│       ├── index.ts
│       └── package.json
├── src/                   # Source code
│   ├── index.ts          # Entry point
│   ├── config.ts         # Configuration
│   └── utils/            # Utility functions
├── tests/                 # Test files
│   └── agent.test.ts
└── dist/                  # Compiled output
```

## Getting Started

### Create a New Project

```bash
# Create project directory
mkdir my-clawinfra-project
cd my-clawinfra-project

# Initialize npm project
npm init -y

# Install ClawInfra
npm install @clawinfra/core @clawinfra/server

# Install development dependencies
npm install --save-dev typescript @types/node ts-node

# Initialize TypeScript
npx tsc --init
```

### Project Configuration

Create `package.json`:

```json
{
  "name": "my-clawinfra-project",
  "version": "1.0.0",
  "description": "My ClawInfra AI Agent Project",
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest"
  },
  "keywords": ["clawinfra", "ai", "agent"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "@clawinfra/core": "^1.0.0",
    "@clawinfra/server": "^1.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "ts-node": "^10.0.0"
  }
}
```

### TypeScript Configuration

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

## Environment Configuration

Create `.env` file:

```bash
# API Keys
CLAW_API_KEY=your_api_key_here
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# Server Configuration
PORT=3000
HOST=0.0.0.0
NODE_ENV=development

# Platform Integrations
DISCORD_BOT_TOKEN=your_discord_token
TWITTER_API_KEY=your_twitter_key
TELEGRAM_BOT_TOKEN=your_telegram_token

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/clawinfra

# Plugin Configuration
WEATHER_API_KEY=your_weather_key
```

See [Environment Variables](environment-variables.md) for complete list.

## Project Types

### 1. Single Agent Project

Simple project with one agent:

```typescript
// src/index.ts
import { ClawInfra } from '@clawinfra/core';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const claw = new ClawInfra({
    apiKey: process.env.CLAW_API_KEY
  });

  // Create agent
  const agent = await claw.agents.create({
    name: 'MyAgent',
    personality: {
      traits: ['helpful', 'friendly'],
      style: 'conversational'
    },
    modelProvider: 'openai',
    model: 'gpt-4'
  });

  console.log('Agent created:', agent.id);

  // Send a message
  const response = await claw.agents.sendMessage(agent.id, {
    text: 'Hello!',
    userId: 'user_123'
  });

  console.log('Agent response:', response.data.response);
}

main().catch(console.error);
```

### 2. Multi-Agent Project

Project with multiple specialized agents:

```typescript
// src/index.ts
import { ClawInfra } from '@clawinfra/core';
import { loadCharacters } from './utils/characters';

async function main() {
  const claw = new ClawInfra({
    apiKey: process.env.CLAW_API_KEY
  });

  // Load character configurations
  const characters = await loadCharacters('./characters');

  // Create agents
  const agents = await Promise.all(
    characters.map(char => claw.agents.create(char))
  );

  console.log(`Created ${agents.length} agents`);

  // Start agent system
  const system = new AgentSystem(claw, agents);
  await system.start();
}

main().catch(console.error);
```

### 3. API Server Project

Project that exposes agents via API:

```typescript
// src/index.ts
import express from 'express';
import { ClawInfra } from '@clawinfra/core';
import { createAgentRoutes } from './routes/agents';

const app = express();
app.use(express.json());

const claw = new ClawInfra({
  apiKey: process.env.CLAW_API_KEY
});

// Setup routes
app.use('/api/agents', createAgentRoutes(claw));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 4. Platform Integration Project

Project focused on platform integrations:

```typescript
// src/index.ts
import { ClawInfra } from '@clawinfra/core';
import { DiscordClient } from '@clawinfra/client-discord';
import { TwitterClient } from '@clawinfra/client-twitter';

async function main() {
  const claw = new ClawInfra({
    apiKey: process.env.CLAW_API_KEY
  });

  // Create agent with platform integrations
  const agent = await claw.agents.create({
    name: 'Community Bot',
    clients: ['discord', 'twitter'],
    settings: {
      discord: {
        channels: ['general', 'announcements'],
        respondToMentions: true
      },
      twitter: {
        enableReplies: true,
        postFrequency: '4h'
      }
    }
  });

  // Initialize platform clients
  const discord = new DiscordClient(agent.id);
  const twitter = new TwitterClient(agent.id);

  await Promise.all([
    discord.start(),
    twitter.start()
  ]);

  console.log('Platform integrations active');
}

main().catch(console.error);
```

## Character Files

Create character configurations in JSON format:

```json
// characters/helper.json
{
  "name": "Helper Bot",
  "bio": [
    "I am a helpful AI assistant built on ClawInfra.",
    "I specialize in answering questions and providing assistance.",
    "I'm friendly, patient, and always eager to help."
  ],
  "personality": {
    "traits": ["helpful", "patient", "friendly", "knowledgeable"],
    "style": "professional yet approachable",
    "tone": "warm and supportive"
  },
  "knowledge": [
    "General knowledge and common questions",
    "Technical support and troubleshooting",
    "Product information and guidance"
  ],
  "goals": [
    "Help users solve their problems",
    "Provide accurate and timely information",
    "Create positive user experiences"
  ],
  "modelProvider": "openai",
  "model": "gpt-4",
  "clients": ["discord"],
  "settings": {
    "discord": {
      "channels": ["help", "support"],
      "respondToMentions": true,
      "respondToDMs": true
    }
  }
}
```

## Plugin Integration

Add plugins to your project:

```bash
# Install plugins
npm install @clawinfra/plugin-evm @clawinfra/plugin-images

# Use in code
const agent = await claw.agents.create({
  name: 'DeFi Bot',
  plugins: [
    {
      name: '@clawinfra/plugin-evm',
      enabled: true,
      config: {
        chains: ['ethereum', 'polygon']
      }
    }
  ]
});
```

## Development Workflow

### Local Development

```bash
# Start development server
npm run dev

# Watch for changes
npm run dev:watch
```

### Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### Building

```bash
# Build for production
npm run build

# Check build output
ls -la dist/
```

### Running

```bash
# Run production build
npm start

# Run with PM2
pm2 start npm --name "clawinfra-app" -- start
```

## Project Management

### Version Control

Create `.gitignore`:

```
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.*.local

# Logs
logs/
*.log

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Testing
coverage/

# Temporary files
tmp/
temp/
```

### Documentation

Maintain project documentation:

```
docs/
├── README.md           # Project overview
├── SETUP.md           # Setup instructions
├── API.md             # API documentation
├── AGENTS.md          # Agent configurations
└── DEPLOYMENT.md      # Deployment guide
```

## Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **Character Files**: Keep characters in version control
3. **Type Safety**: Use TypeScript for type safety
4. **Testing**: Write tests for critical functionality
5. **Documentation**: Document your agents and configurations
6. **Error Handling**: Implement proper error handling
7. **Logging**: Use structured logging
8. **Security**: Validate all inputs and sanitize data

## Project Templates

Start with a template:

```bash
# Clone template
git clone https://github.com/gwentanky/clawinfra/template-basic.git my-project

# Or use a specific template
git clone https://github.com/gwentanky/clawinfra/template-discord-bot.git
git clone https://github.com/gwentanky/clawinfra/template-defi-agent.git
git clone https://github.com/gwentanky/clawinfra/template-multi-agent.git
```

## Next Steps

- [Environment Variables](environment-variables.md) - Configure your project
- [Quickstart Guide](../getting-started/quickstart.md) - Build your first agent
- [Deployment Guide](../guides/deployment.md) - Deploy your project

## Examples

Browse example projects:

- [Basic Agent](https://github.com/gwentanky/clawinfra/example-basic)
- [Discord Bot](https://github.com/gwentanky/clawinfra/example-discord)
- [DeFi Trading Bot](https://github.com/gwentanky/clawinfra/example-defi)
- [Multi-Agent System](https://github.com/gwentanky/clawinfra/example-multi-agent)

## Need Help?

- [Discord Community](https://discord.gg/clawinfra)
- [GitHub Discussions](https://github.com/gwentanky/clawinfra/discussions)
- [GitHub Issues](https://github.com/gwentanky/clawinfra/issues)
