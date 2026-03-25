# Environment Variables

Complete reference for configuring ClawInfra through environment variables.

## Overview

ClawInfra uses environment variables for configuration. Store these in a `.env` file in your project root.

## Required Variables

### ClawInfra API

```bash
# ClawInfra API Key (required for API access)
CLAW_API_KEY=your_clawinfra_api_key_here
```

Get your API key from [clawinfra.xyz/settings/api-keys](https://clawinfra.xyz/settings/api-keys)

## AI Model Providers

### OpenAI

```bash
# OpenAI API Key
OPENAI_API_KEY=sk-...

# Optional: Custom endpoint
OPENAI_API_ENDPOINT=https://api.openai.com/v1

# Optional: Organization ID
OPENAI_ORG_ID=org-...
```

### Anthropic (Claude)

```bash
# Anthropic API Key
ANTHROPIC_API_KEY=sk-ant-...

# Optional: Custom endpoint
ANTHROPIC_API_ENDPOINT=https://api.anthropic.com
```

### Google (Gemini)

```bash
# Google AI API Key
GOOGLE_AI_API_KEY=...

# Or Google Cloud credentials
GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json
```

### OpenRouter

```bash
# OpenRouter API Key
OPENROUTER_API_KEY=sk-or-v1-...

# Optional: HTTP referrer for rankings
OPENROUTER_HTTP_REFERER=https://yourapp.com

# Optional: App name for rankings
OPENROUTER_APP_NAME=YourAppName
```

### Local Models (Ollama)

```bash
# Ollama base URL
OLLAMA_BASE_URL=http://localhost:11434

# Default model
OLLAMA_MODEL=llama2
```

## Platform Integrations

### Discord

```bash
# Discord Bot Token (required)
DISCORD_BOT_TOKEN=...

# Discord Application ID
DISCORD_APPLICATION_ID=...

# Optional: Guild ID for testing
DISCORD_GUILD_ID=...
```

Get credentials from [Discord Developer Portal](https://discord.com/developers/applications)

### Twitter/X

```bash
# Twitter API v2 credentials
TWITTER_API_KEY=...
TWITTER_API_SECRET=...
TWITTER_ACCESS_TOKEN=...
TWITTER_ACCESS_SECRET=...
TWITTER_BEARER_TOKEN=...

# Or Twitter API v1.1
TWITTER_CONSUMER_KEY=...
TWITTER_CONSUMER_SECRET=...
```

Get credentials from [Twitter Developer Portal](https://developer.twitter.com)

### Telegram

```bash
# Telegram Bot Token
TELEGRAM_BOT_TOKEN=...

# Optional: Webhook URL
TELEGRAM_WEBHOOK_URL=https://your-domain.com/webhook/telegram
```

Get token from [@BotFather](https://t.me/botfather)

### Farcaster

```bash
# Farcaster credentials
FARCASTER_FID=...
FARCASTER_PRIVATE_KEY=...
FARCASTER_MNEMONIC=...
```

## Database Configuration

### PostgreSQL

```bash
# PostgreSQL connection string
DATABASE_URL=postgresql://user:password@localhost:5432/clawinfra

# Or individual components
DB_HOST=localhost
DB_PORT=5432
DB_NAME=clawinfra
DB_USER=user
DB_PASSWORD=password
DB_SSL=true
```

### MySQL

```bash
# MySQL connection string
DATABASE_URL=mysql://user:password@localhost:3306/clawinfra
```

### MongoDB

```bash
# MongoDB connection string
DATABASE_URL=mongodb://user:password@localhost:27017/clawinfra

# Or MongoDB Atlas
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/clawinfra
```

### SQLite (Default)

```bash
# SQLite database file
DATABASE_URL=sqlite:./clawinfra.db
```

## Blockchain & Web3

### Ethereum & EVM Chains

```bash
# RPC endpoints
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
POLYGON_RPC_URL=https://polygon-rpc.com
BASE_RPC_URL=https://mainnet.base.org
ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc

# Private key for transactions (use with caution!)
WALLET_PRIVATE_KEY=0x...

# Or mnemonic
WALLET_MNEMONIC=word1 word2 word3 ...
```

### Solana

```bash
# Solana RPC URL
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Solana private key
SOLANA_PRIVATE_KEY=...

# Or keypair file path
SOLANA_KEYPAIR_PATH=/path/to/keypair.json
```

## Plugin Configuration

### Weather Plugin

```bash
# OpenWeatherMap API key
WEATHER_API_KEY=...
```

### Image Generation

```bash
# Stable Diffusion
STABILITY_API_KEY=...

# Midjourney (via API)
MIDJOURNEY_API_KEY=...

# DALL-E uses OPENAI_API_KEY
```

### Web Scraping

```bash
# Bright Data (formerly Luminati)
BRIGHT_DATA_API_KEY=...

# ScraperAPI
SCRAPER_API_KEY=...
```

## Server Configuration

### HTTP Server

```bash
# Server port
PORT=3000

# Server host
HOST=0.0.0.0

# Base URL
BASE_URL=https://api.yourdomain.com

# Environment
NODE_ENV=development  # or production, staging
```

### CORS

```bash
# Allowed origins (comma-separated)
CORS_ORIGINS=https://yourdomain.com,https://app.yourdomain.com

# Or allow all
CORS_ORIGINS=*
```

### Rate Limiting

```bash
# Requests per minute
RATE_LIMIT_PER_MINUTE=60

# Requests per hour
RATE_LIMIT_PER_HOUR=1000

# Enable rate limiting
RATE_LIMIT_ENABLED=true
```

## Authentication & Security

### API Keys

```bash
# API key for your application
API_KEY=your_secure_api_key_here

# Secret for JWT tokens
JWT_SECRET=your_jwt_secret_here

# Token expiration
JWT_EXPIRATION=7d
```

### Encryption

```bash
# Encryption key for sensitive data
ENCRYPTION_KEY=your_32_character_encryption_key

# Encryption algorithm
ENCRYPTION_ALGORITHM=aes-256-gcm
```

## Logging & Monitoring

### Logging

```bash
# Log level (error, warn, info, debug, trace)
LOG_LEVEL=info

# Log format (json, pretty)
LOG_FORMAT=pretty

# Log file path
LOG_FILE=/var/log/clawinfra/app.log

# Max log file size
LOG_MAX_SIZE=10m

# Max log files
LOG_MAX_FILES=5
```

### Sentry (Error Tracking)

```bash
# Sentry DSN
SENTRY_DSN=https://...@sentry.io/...

# Sentry environment
SENTRY_ENVIRONMENT=production

# Sample rate (0.0 to 1.0)
SENTRY_TRACES_SAMPLE_RATE=0.1
```

### DataDog

```bash
# DataDog API key
DATADOG_API_KEY=...

# DataDog application key
DATADOG_APP_KEY=...

# Service name
DATADOG_SERVICE=clawinfra-agent
```

## Caching

### Redis

```bash
# Redis connection string
REDIS_URL=redis://localhost:6379

# Or individual components
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=...
REDIS_DB=0
REDIS_TLS=true
```

### Memory Cache

```bash
# Cache TTL in seconds
CACHE_TTL=300

# Max cache size in MB
CACHE_MAX_SIZE=100
```

## Feature Flags

```bash
# Enable/disable features
FEATURE_STREAMING=true
FEATURE_VOICE=false
FEATURE_IMAGES=true
FEATURE_ANALYTICS=true
```

## Development

### Debug

```bash
# Enable debug mode
DEBUG=true

# Debug namespaces
DEBUG=clawinfra:*,plugin:*

# Verbose logging
VERBOSE=true
```

### Testing

```bash
# Test database
TEST_DATABASE_URL=sqlite::memory:

# Test API key
TEST_API_KEY=test_key_123

# Skip integration tests
SKIP_INTEGRATION_TESTS=false
```

## Production Settings

### Optimization

```bash
# Node environment
NODE_ENV=production

# Disable source maps
GENERATE_SOURCEMAP=false

# Enable compression
ENABLE_COMPRESSION=true

# Max request size
MAX_REQUEST_SIZE=10mb
```

### Timeouts

```bash
# HTTP request timeout (ms)
HTTP_TIMEOUT=30000

# Database query timeout (ms)
DB_TIMEOUT=5000

# Agent response timeout (ms)
AGENT_TIMEOUT=60000
```

## Example .env File

Complete example for a production setup:

```bash
# ClawInfra
CLAW_API_KEY=your_api_key

# Server
PORT=3000
NODE_ENV=production
BASE_URL=https://api.yourdomain.com

# AI Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Platforms
DISCORD_BOT_TOKEN=...
TWITTER_API_KEY=...
TWITTER_API_SECRET=...

# Database
DATABASE_URL=postgresql://user:password@db.yourdomain.com:5432/clawinfra

# Redis
REDIS_URL=redis://redis.yourdomain.com:6379

# Blockchain
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
WALLET_PRIVATE_KEY=0x...

# Monitoring
SENTRY_DSN=https://...@sentry.io/...
LOG_LEVEL=info

# Security
JWT_SECRET=your_jwt_secret
API_KEY=your_api_key
ENCRYPTION_KEY=your_encryption_key

# Features
FEATURE_STREAMING=true
FEATURE_ANALYTICS=true
```

## Loading Environment Variables

### Node.js (dotenv)

```javascript
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

// Load specific file
dotenv.config({ path: '.env.production' });

// Access variables
const apiKey = process.env.CLAW_API_KEY;
```

### Docker

```dockerfile
# In Dockerfile
ENV NODE_ENV=production

# Or in docker-compose.yml
environment:
  - CLAW_API_KEY=${CLAW_API_KEY}
  - NODE_ENV=production
```

### Kubernetes

```yaml
# ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: clawinfra-config
data:
  NODE_ENV: "production"
  PORT: "3000"

# Secret
apiVersion: v1
kind: Secret
metadata:
  name: clawinfra-secrets
type: Opaque
data:
  CLAW_API_KEY: base64encodedvalue
```

## Security Best Practices

1. **Never commit .env files** - Add to `.gitignore`
2. **Use different keys per environment** - Dev, staging, production
3. **Rotate keys regularly** - Every 90 days minimum
4. **Limit key permissions** - Use least privilege principle
5. **Monitor key usage** - Track and alert on unusual activity
6. **Use secret management** - AWS Secrets Manager, HashiCorp Vault
7. **Encrypt sensitive values** - In production environments

## Validation

Validate environment variables on startup:

```typescript
import { z } from 'zod';

const envSchema = z.object({
  CLAW_API_KEY: z.string().min(1),
  PORT: z.string().transform(Number).pipe(z.number().int().positive()),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
});

const env = envSchema.parse(process.env);
```

## Troubleshooting

### Variable Not Found

```bash
# Check if variable is set
echo $CLAWINFRA_API_KEY

# Check .env file is loaded
node -e "require('dotenv').config(); console.log(process.env.CLAW_API_KEY)"
```

### Wrong Value

```bash
# Check for trailing spaces
cat .env | grep CLAW_API_KEY | od -c

# Check for quotes
# Wrong: CLAW_API_KEY="value"
# Right: CLAW_API_KEY=value
```

## Next Steps

- [Projects Overview](overview.md) - Learn about project structure
- [Deployment Guide](../guides/deployment.md) - Deploy your project
- [Security Best Practices](../guides/security.md) - Secure your application

## Need Help?

- [Discord Community](https://discord.gg/clawinfra)
- [GitHub Discussions](https://github.com/gwentanky/clawinfra/discussions)
- [GitHub Issues](https://github.com/gwentanky/clawinfra/issues)
