# Installation

Get started with ClawInfra SDK to enhance your OpenClaw AI agents with enterprise-ready features.

## Prerequisites

Before installing ClawInfra, ensure you have:

- **Node.js** (v20.x or higher)
- **npm**, **yarn**, or **pnpm** (package manager)
- **OpenClaw** installed in your project

### Verify Prerequisites

```bash
node --version  # Should be v20.x or higher
npm --version   # Should be 9.x or higher
```

## Installation Methods

### Option 1: npm

```bash
npm install @clawinfra/sdk openclaw
```

### Option 2: yarn

```bash
yarn add @clawinfra/sdk openclaw
```

### Option 3: pnpm

```bash
pnpm add @clawinfra/sdk openclaw
```

## Required Dependencies

ClawInfra integrates seamlessly with OpenClaw. Ensure you have both installed:

```json
{
  "dependencies": {
    "@clawinfra/sdk": "^1.0.0",
    "openclaw": "^1.0.0"
  }
}
```

## Environment Configuration

Create a `.env` file in your project root with the required API keys:

```bash
# AI Provider API Keys (for OpenClaw)
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key

# ClawInfra Configuration (optional)
CLAWINFRA_API_KEY=your_clawinfra_api_key

# Memory Provider (choose one)
PINECONE_API_KEY=your_pinecone_key
# or
WEAVIATE_URL=your_weaviate_url
# or
QDRANT_URL=your_qdrant_url

# Cache Provider (optional)
REDIS_URL=redis://localhost:6379
```

## Optional: Self-Hosted Setup

If you prefer to self-host ClawInfra's infrastructure:

### 1. Clone the Repository

```bash
git clone https://github.com/gwentanky/clawinfra.git
cd clawinfra
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Start Services

```bash
# Start Redis (for caching)
docker-compose up -d redis

# Start vector database (for memory)
docker-compose up -d pinecone

# Start ClawInfra API
pnpm dev
```

## Verify Installation

Create a simple test file to verify your installation:

```typescript
// test.ts
import { ClawInfra } from '@clawinfra/sdk';
import { OpenClaw } from 'openclaw';

console.log('ClawInfra SDK version:', require('@clawinfra/sdk/package.json').version);
console.log('OpenClaw version:', require('openclaw/package.json').version);
console.log('✓ Installation successful!');
```

Run it:

```bash
npx tsx test.ts
```

Expected output:
```
ClawInfra SDK version: 1.0.0
OpenClaw version: 1.0.0
✓ Installation successful!
```

## TypeScript Configuration

If using TypeScript, add these compiler options to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true
  }
}
```

## Package Exports

ClawInfra SDK exports the following modules:

```typescript
import {
  ClawInfra,          // Main enhancement wrapper
  PersonalityEngine,  // Personality configuration
  MemoryManager,      // Memory and state management
  CacheLayer,         // Performance optimization
  Analytics,          // Observability and metrics
  PluginSystem        // Plugin integration
} from '@clawinfra/sdk';
```

## Next Steps

Now that ClawInfra is installed, proceed to the [Quickstart](quickstart.md) guide to build your first enhanced OpenClaw agent!

## Troubleshooting

### Installation Issues

**Error: Cannot find module '@clawinfra/sdk'**

Make sure you've installed the package:
```bash
npm install @clawinfra/sdk
```

**Error: Peer dependency openclaw not found**

Install OpenClaw alongside ClawInfra:
```bash
npm install @clawinfra/sdk openclaw
```

**TypeScript errors**

Ensure your TypeScript version is 5.0 or higher:
```bash
npm install -D typescript@latest
```

### Platform-Specific Issues

**macOS M1/M2 Users**

Some native dependencies may require Rosetta:
```bash
softwareupdate --install-rosetta
```

**Windows Users**

Ensure you have Visual Studio Build Tools installed for native dependencies:
```bash
npm install --global windows-build-tools
```

## Need Help?

- [Quickstart Guide](quickstart.md)
- [Discord Community](https://discord.gg/clawinfra)
- [GitHub Issues](https://github.com/gwentanky/clawinfra/sdk/issues)
- [Email Support](mailto:support@clawinfra.dev)
