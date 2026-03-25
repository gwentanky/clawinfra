# Create a Plugin

Learn how to create custom plugins to extend ClawInfra agent capabilities.

## Overview

Plugins are modular extensions that add new capabilities to ClawInfra agents. This guide will walk you through creating your own plugin from scratch.

## Plugin Structure

A basic ClawInfra plugin has the following structure:

```
@clawinfra/plugin-example/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts          # Main plugin export
│   ├── actions.ts        # Custom actions
│   ├── providers.ts      # Data providers
│   ├── services.ts       # Services
│   └── types.ts          # TypeScript types
├── tests/
│   └── index.test.ts
└── README.md
```

## Creating Your First Plugin

### 1. Initialize the Plugin

```bash
mkdir clawinfra-plugin-custom
cd clawinfra-plugin-custom
npm init -y
```

### 2. Install Dependencies

```bash
npm install --save-dev typescript @types/node
npm install axios dotenv
```

### 3. Configure TypeScript

Create `tsconfig.json`:

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
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### 4. Define Plugin Interface

Create `src/types.ts`:

```typescript
export interface Plugin {
  name: string;
  version: string;
  description: string;
  actions?: Action[];
  providers?: Provider[];
  services?: Service[];
  initialize?: (config: PluginConfig) => Promise<void>;
  cleanup?: () => Promise<void>;
}

export interface Action {
  name: string;
  description: string;
  handler: ActionHandler;
  examples?: string[];
  validate?: (input: string) => boolean;
}

export type ActionHandler = (
  input: string,
  context: ActionContext
) => Promise<ActionResult>;

export interface ActionContext {
  agentId: string;
  userId: string;
  roomId?: string;
  metadata?: Record<string, any>;
}

export interface ActionResult {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: Record<string, any>;
}

export interface Provider {
  name: string;
  get: (key: string) => Promise<any>;
  set: (key: string, value: any) => Promise<void>;
}

export interface Service {
  name: string;
  start: () => Promise<void>;
  stop: () => Promise<void>;
}

export interface PluginConfig {
  apiKey?: string;
  options?: Record<string, any>;
}
```

## Example Plugin: Weather Service

Let's create a weather plugin that fetches weather data:

### 1. Define Actions

Create `src/actions.ts`:

```typescript
import axios from 'axios';
import { Action, ActionHandler } from './types';

const getWeatherHandler: ActionHandler = async (input, context) => {
  try {
    // Extract city from input
    const cityMatch = input.match(/weather (?:in |for )?(.+)/i);
    if (!cityMatch) {
      return {
        success: false,
        error: 'Could not parse city name from input'
      };
    }

    const city = cityMatch[1].trim();
    const apiKey = process.env.WEATHER_API_KEY;

    // Fetch weather data
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric'
        }
      }
    );

    const weather = response.data;

    return {
      success: true,
      data: {
        city: weather.name,
        temperature: weather.main.temp,
        conditions: weather.weather[0].description,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed
      },
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'OpenWeatherMap'
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

const getForecastHandler: ActionHandler = async (input, context) => {
  // Similar implementation for forecast
  // ... implementation details
  return {
    success: true,
    data: { /* forecast data */ }
  };
};

export const weatherActions: Action[] = [
  {
    name: 'get_weather',
    description: 'Get current weather for a city',
    handler: getWeatherHandler,
    examples: [
      'What is the weather in London?',
      'Get weather for Tokyo',
      'Weather in New York'
    ],
    validate: (input: string) => {
      return /weather/i.test(input);
    }
  },
  {
    name: 'get_forecast',
    description: 'Get weather forecast for a city',
    handler: getForecastHandler,
    examples: [
      'Weather forecast for Paris',
      'What will the weather be like in Berlin?'
    ]
  }
];
```

### 2. Create the Main Plugin

Create `src/index.ts`:

```typescript
import { Plugin } from './types';
import { weatherActions } from './actions';

const weatherPlugin: Plugin = {
  name: '@clawinfra/plugin-weather',
  version: '1.0.0',
  description: 'Weather data plugin for ClawInfra agents',

  actions: weatherActions,

  initialize: async (config) => {
    console.log('Weather plugin initialized');

    // Validate required configuration
    if (!process.env.WEATHER_API_KEY) {
      throw new Error('WEATHER_API_KEY is required');
    }

    // Perform any setup tasks
    return Promise.resolve();
  },

  cleanup: async () => {
    console.log('Weather plugin cleanup');
    // Perform cleanup tasks
    return Promise.resolve();
  }
};

export default weatherPlugin;
export * from './types';
export * from './actions';
```

### 3. Update package.json

```json
{
  "name": "@clawinfra/plugin-weather",
  "version": "1.0.0",
  "description": "Weather data plugin for ClawInfra",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "jest",
    "prepublishOnly": "npm run build"
  },
  "keywords": [
    "clawinfra",
    "plugin",
    "weather",
    "ai-agent"
  ],
  "author": "Your Name",
  "license": "MIT",
  "peerDependencies": {
    "@clawinfra/core": "^1.0.0"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

## Advanced Plugin Features

### Adding Providers

Providers supply data to agents:

```typescript
import { Provider } from './types';

export const weatherProvider: Provider = {
  name: 'weather_data',

  get: async (key: string) => {
    // Fetch and return weather data
    const [city, dataType] = key.split(':');

    if (dataType === 'current') {
      return await fetchCurrentWeather(city);
    } else if (dataType === 'forecast') {
      return await fetchForecast(city);
    }

    return null;
  },

  set: async (key: string, value: any) => {
    // Cache weather data
    // Implementation details
  }
};
```

### Adding Services

Services run background tasks:

```typescript
import { Service } from './types';

export const weatherUpdateService: Service = {
  name: 'weather_updates',

  start: async () => {
    console.log('Starting weather update service');

    // Start periodic updates
    setInterval(async () => {
      await updateWeatherCache();
    }, 300000); // Every 5 minutes
  },

  stop: async () => {
    console.log('Stopping weather update service');
    // Clean up intervals, connections, etc.
  }
};
```

### Adding Middleware

```typescript
export interface Middleware {
  name: string;
  process: (input: any, next: () => Promise<any>) => Promise<any>;
}

export const rateLimitMiddleware: Middleware = {
  name: 'rate_limit',

  process: async (input, next) => {
    // Check rate limit
    if (await isRateLimited(input.userId)) {
      throw new Error('Rate limit exceeded');
    }

    // Continue to next middleware/handler
    const result = await next();

    // Track usage
    await trackUsage(input.userId);

    return result;
  }
};
```

## Testing Your Plugin

Create `tests/weather.test.ts`:

```typescript
import weatherPlugin from '../src/index';
import { ActionContext } from '../src/types';

describe('Weather Plugin', () => {
  beforeAll(async () => {
    process.env.WEATHER_API_KEY = 'test_key';
    await weatherPlugin.initialize?.({});
  });

  afterAll(async () => {
    await weatherPlugin.cleanup?.();
  });

  test('should get weather for a city', async () => {
    const action = weatherPlugin.actions?.find(a => a.name === 'get_weather');
    expect(action).toBeDefined();

    const context: ActionContext = {
      agentId: 'test_agent',
      userId: 'test_user'
    };

    const result = await action!.handler(
      'What is the weather in London?',
      context
    );

    expect(result.success).toBe(true);
    expect(result.data).toHaveProperty('city');
    expect(result.data).toHaveProperty('temperature');
  });

  test('should validate weather queries', () => {
    const action = weatherPlugin.actions?.find(a => a.name === 'get_weather');
    expect(action?.validate?.('weather in Paris')).toBe(true);
    expect(action?.validate?.('hello world')).toBe(false);
  });
});
```

## Plugin Configuration

Allow users to configure your plugin:

```typescript
export interface WeatherPluginConfig extends PluginConfig {
  apiKey: string;
  units?: 'metric' | 'imperial';
  language?: string;
  cacheDuration?: number;
}

const weatherPlugin: Plugin = {
  // ... other properties

  initialize: async (config: WeatherPluginConfig) => {
    const {
      apiKey,
      units = 'metric',
      language = 'en',
      cacheDuration = 300000
    } = config;

    if (!apiKey) {
      throw new Error('Weather API key is required');
    }

    // Store configuration
    pluginConfig = { apiKey, units, language, cacheDuration };

    console.log('Weather plugin initialized with config:', {
      units,
      language,
      cacheDuration
    });
  }
};
```

## Building and Testing Locally

```bash
# Build the plugin
npm run build

# Link for local testing
npm link

# In your ClawInfra project
npm link @clawinfra/plugin-weather
```

## Using Your Plugin

Once built, use your plugin with agents:

```javascript
const agent = await client.post('/agents', {
  name: 'Weather Bot',
  plugins: [
    {
      name: '@clawinfra/plugin-weather',
      enabled: true,
      config: {
        apiKey: process.env.WEATHER_API_KEY,
        units: 'metric',
        language: 'en'
      }
    }
  ]
});
```

## Plugin Best Practices

1. **Error Handling**: Always handle errors gracefully
2. **Validation**: Validate all inputs and configuration
3. **Documentation**: Provide clear README and inline documentation
4. **TypeScript**: Use TypeScript for type safety
5. **Testing**: Write comprehensive tests
6. **Versioning**: Follow semantic versioning
7. **Performance**: Optimize for performance and resource usage
8. **Security**: Never expose API keys or sensitive data
9. **Compatibility**: Ensure compatibility with ClawInfra versions
10. **Clean Code**: Follow coding standards and best practices

## Publishing Your Plugin

See [Publish a Plugin](publish-plugin.md) for publishing instructions.

## Example Plugins for Reference

Study these official plugins for examples:

- `@clawinfra/plugin-evm` - Blockchain interactions
- `@clawinfra/plugin-discord` - Platform integration
- `@clawinfra/plugin-images` - External API integration
- `@clawinfra/plugin-sql` - Database operations

## Next Steps

- [Publish a Plugin](publish-plugin.md) - Publish your plugin to npm
- [Plugin Reference](../plugins/reference.md) - Browse existing plugins
- [API Reference](../api-reference/overview.md) - API documentation

## Need Help?

- [Discord Community](https://discord.gg/clawinfra)
- [Plugin Development Forum](https://github.com/gwentanky/clawinfra/discussions/categories/plugins)
- [GitHub Issues](https://github.com/gwentanky/clawinfra/issues)
