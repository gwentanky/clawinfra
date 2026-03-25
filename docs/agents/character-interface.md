# Character Interface

Complete reference for the ClawInfra Character configuration interface.

## Overview

The Character interface is the core configuration structure that defines an agent's identity, personality, capabilities, and behavior in ClawInfra.

## Schema Reference

### Root Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | The agent's display name |
| `bio` | string[] | Yes | Array of biographical statements |
| `personality` | object | Yes | Personality configuration |
| `knowledge` | string[] | No | Areas of expertise and knowledge |
| `goals` | string[] | No | Agent's objectives and motivations |
| `actions` | Action[] | No | Custom action definitions |
| `clients` | string[] | No | Enabled platform integrations |
| `settings` | object | No | Platform-specific settings |
| `plugins` | Plugin[] | No | Plugin configurations |
| `modelProvider` | string | No | AI model provider (default: "openai") |
| `model` | string | No | Specific model to use |
| `modelSettings` | object | No | Model-specific parameters |

## Detailed Properties

### Name

```typescript
name: string
```

The display name for your agent.

**Example:**
```json
{
  "name": "Claw"
}
```

### Bio

```typescript
bio: string[]
```

Array of statements that define the agent's background and identity. Written in first person.

**Example:**
```json
{
  "bio": [
    "I am Claw, an AI agent specialized in blockchain technology.",
    "I have deep knowledge of DeFi protocols and smart contracts.",
    "My purpose is to help people navigate the Web3 ecosystem."
  ]
}
```

### Personality

```typescript
interface Personality {
  traits: string[];
  style: string;
  tone?: string;
  adjectives?: string[];
  voice?: string;
}
```

Defines how the agent communicates and behaves.

**Example:**
```json
{
  "personality": {
    "traits": ["analytical", "helpful", "patient", "curious"],
    "style": "professional yet approachable",
    "tone": "informative and supportive",
    "adjectives": ["knowledgeable", "reliable", "innovative"],
    "voice": "confident and clear"
  }
}
```

### Knowledge

```typescript
knowledge: string[]
```

Array of knowledge domains and areas of expertise.

**Example:**
```json
{
  "knowledge": [
    "Expert in Ethereum and EVM-compatible blockchains",
    "Deep understanding of DeFi protocols (Uniswap, Aave, Compound)",
    "Proficient in smart contract development with Solidity",
    "Experienced with Web3.js and Ethers.js libraries"
  ]
}
```

### Goals

```typescript
goals: string[]
```

The agent's objectives and motivations.

**Example:**
```json
{
  "goals": [
    "Help users understand complex blockchain concepts",
    "Provide accurate and timely DeFi insights",
    "Build trust through consistent and reliable information",
    "Stay updated with the latest Web3 developments"
  ]
}
```

### Actions

```typescript
interface Action {
  name: string;
  description: string;
  examples: string[];
  handler?: string;
  parameters?: ActionParameter[];
}

interface ActionParameter {
  name: string;
  type: string;
  description: string;
  required: boolean;
}
```

Custom actions the agent can perform.

**Example:**
```json
{
  "actions": [
    {
      "name": "analyze_token",
      "description": "Analyze a cryptocurrency token",
      "examples": [
        "Analyze ETH",
        "What's your take on BTC?",
        "Give me analysis on LINK"
      ],
      "handler": "analyzeToken",
      "parameters": [
        {
          "name": "symbol",
          "type": "string",
          "description": "Token symbol (e.g., ETH, BTC)",
          "required": true
        }
      ]
    }
  ]
}
```

### Clients

```typescript
clients: string[]
```

Array of platform integrations to enable.

**Supported Clients:**
- `discord`
- `twitter`
- `telegram`
- `slack`
- `whatsapp`

**Example:**
```json
{
  "clients": ["discord", "twitter", "telegram"]
}
```

### Settings

```typescript
interface Settings {
  discord?: DiscordSettings;
  twitter?: TwitterSettings;
  telegram?: TelegramSettings;
  [key: string]: any;
}
```

Platform-specific configuration.

#### Discord Settings

```typescript
interface DiscordSettings {
  channels?: string[];
  respondToMentions?: boolean;
  respondToDMs?: boolean;
  moderationEnabled?: boolean;
  commandPrefix?: string;
}
```

**Example:**
```json
{
  "settings": {
    "discord": {
      "channels": ["general", "bot-commands"],
      "respondToMentions": true,
      "respondToDMs": true,
      "moderationEnabled": false,
      "commandPrefix": "!"
    }
  }
}
```

#### Twitter Settings

```typescript
interface TwitterSettings {
  enableReplies?: boolean;
  enableMentions?: boolean;
  enableDMs?: boolean;
  autoLike?: boolean;
  autoRetweet?: boolean;
  postFrequency?: string;
  targetHashtags?: string[];
}
```

**Example:**
```json
{
  "settings": {
    "twitter": {
      "enableReplies": true,
      "enableMentions": true,
      "enableDMs": false,
      "autoLike": true,
      "postFrequency": "4h",
      "targetHashtags": ["DeFi", "Web3"]
    }
  }
}
```

### Plugins

```typescript
interface Plugin {
  name: string;
  enabled: boolean;
  config?: Record<string, any>;
}
```

Plugin configurations.

**Example:**
```json
{
  "plugins": [
    {
      "name": "@clawinfra/plugin-defi",
      "enabled": true,
      "config": {
        "chains": ["ethereum", "polygon"],
        "rpcUrls": {
          "ethereum": "https://mainnet.infura.io/v3/YOUR_KEY"
        }
      }
    }
  ]
}
```

### Model Settings

```typescript
interface ModelSettings {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}
```

AI model parameters.

**Example:**
```json
{
  "modelProvider": "openai",
  "model": "gpt-4",
  "modelSettings": {
    "temperature": 0.7,
    "maxTokens": 500,
    "topP": 0.9,
    "frequencyPenalty": 0.3,
    "presencePenalty": 0.3
  }
}
```

## Complete Example

```json
{
  "name": "DeFi Oracle",
  "bio": [
    "I am DeFi Oracle, your trusted guide to decentralized finance.",
    "I analyze protocols, track yields, and explain complex DeFi concepts.",
    "My mission is to make DeFi accessible and understandable for everyone."
  ],
  "personality": {
    "traits": ["analytical", "patient", "data-driven", "helpful"],
    "style": "professional yet friendly",
    "tone": "informative and encouraging",
    "adjectives": ["knowledgeable", "reliable", "insightful"]
  },
  "knowledge": [
    "Expert in major DeFi protocols (Uniswap, Aave, Curve, Compound)",
    "Deep understanding of yield farming and liquidity mining",
    "Proficient in smart contract security analysis"
  ],
  "goals": [
    "Help users make informed DeFi investment decisions",
    "Provide accurate yield and risk analysis",
    "Educate the community about DeFi best practices",
    "Stay current with protocol updates and market trends"
  ],
  "actions": [
    {
      "name": "analyze_protocol",
      "description": "Analyze a DeFi protocol's metrics and risks",
      "examples": [
        "Analyze Aave",
        "What do you think about Curve Finance?",
        "Give me details on Uniswap V3"
      ],
      "handler": "analyzeProtocol"
    },
    {
      "name": "compare_yields",
      "description": "Compare yields across different protocols",
      "examples": [
        "Best yields for USDC",
        "Compare stablecoin farming options",
        "Where can I get the highest APY for ETH?"
      ],
      "handler": "compareYields"
    }
  ],
  "clients": ["discord", "twitter"],
  "settings": {
    "discord": {
      "channels": ["defi-alpha", "general"],
      "respondToMentions": true,
      "respondToDMs": true
    },
    "twitter": {
      "enableReplies": true,
      "enableMentions": true,
      "postFrequency": "6h",
      "targetHashtags": ["DeFi", "Web3", "Yield"]
    }
  },
  "plugins": [
    {
      "name": "@clawinfra/plugin-defi",
      "enabled": true,
      "config": {
        "chains": ["ethereum", "polygon", "arbitrum"]
      }
    },
    {
      "name": "@clawinfra/plugin-twitter",
      "enabled": true
    }
  ],
  "modelProvider": "openai",
  "model": "gpt-4",
  "modelSettings": {
    "temperature": 0.7,
    "maxTokens": 400,
    "topP": 0.9
  }
}
```

## Validation

Validate your character file:

```bash
claw validate --character path/to/character.json
```

## Type Definitions

Full TypeScript definitions available at:
```
@clawinfra/core/types/Character
```

## Best Practices

1. **Be Specific**: Clear, specific definitions lead to consistent behavior
2. **Test Iteratively**: Refine based on actual interactions
3. **Version Control**: Track changes to character files
4. **Use Comments**: Document reasoning for configuration choices
5. **Stay Consistent**: Maintain consistency across all properties

## Related Documentation

- [Caching and Optimization](personality-behavior.md)
- [Memory and State](memory-state.md)
- [Runtime and Lifecycle](runtime-lifecycle.md)
