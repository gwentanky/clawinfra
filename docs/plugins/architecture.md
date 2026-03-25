# Plugin Architecture

ClawInfra plugin architecture enables modular extensibility.

## Overview

Plugins extend agent capabilities through a standardized interface.

## Core Components

- **Actions**: Define what the plugin can do
- **Providers**: Supply data to agents
- **Services**: Run background tasks
- **Middleware**: Process requests/responses

## Plugin Lifecycle

1. **Load**: Plugin is imported
2. **Initialize**: Setup and configuration
3. **Register**: Actions and services registered
4. **Active**: Plugin is operational
5. **Cleanup**: Resources released

## Architecture Patterns

### Event-Driven
```typescript
plugin.on('message', handler);
```

### Hook-Based
```typescript
plugin.registerHook('pre-send', middleware);
```

## Next Steps

- [Components](components.md)
- [Development](development.md)
- [Create a Plugin](../guides/create-plugin.md)
