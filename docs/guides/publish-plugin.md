# Publish a Plugin

Learn how to publish your ClawInfra plugin to npm and share it with the community.

## Prerequisites

Before publishing your plugin:

- [ ] Plugin is fully implemented and tested
- [ ] Documentation is complete (README.md)
- [ ] Tests pass successfully
- [ ] Code follows ClawInfra plugin standards
- [ ] npm account created ([npmjs.com](https://www.npmjs.com))

## Publishing Checklist

### 1. Prepare Your Plugin

Ensure your `package.json` is properly configured:

```json
{
  "name": "@clawinfra/plugin-weather",
  "version": "1.0.0",
  "description": "Weather data plugin for ClawInfra agents",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist/",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "prepublishOnly": "npm run build && npm test"
  },
  "keywords": [
    "clawinfra",
    "plugin",
    "weather",
    "ai-agent",
    "ai",
    "agent"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/clawinfra-plugin-weather"
  },
  "bugs": {
    "url": "https://github.com/yourusername/clawinfra-plugin-weather/issues"
  },
  "homepage": "https://github.com/yourusername/clawinfra-plugin-weather#readme",
  "peerDependencies": {
    "@clawinfra/core": "^1.0.0"
  },
  "dependencies": {
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "jest": "^29.0.0",
    "typescript": "^5.0.0"
  }
}
```

### 2. Create a Comprehensive README

Your `README.md` should include:

```markdown
# @clawinfra/plugin-weather

Weather data plugin for ClawInfra agents.

## Installation

\`\`\`bash
npm install @clawinfra/plugin-weather
\`\`\`

## Configuration

\`\`\`javascript
{
  "plugins": [
    {
      "name": "@clawinfra/plugin-weather",
      "enabled": true,
      "config": {
        "apiKey": "your_api_key",
        "units": "metric",
        "language": "en"
      }
    }
  ]
}
\`\`\`

## Environment Variables

- `WEATHER_API_KEY` (required) - OpenWeatherMap API key

## Actions

### get_weather

Get current weather for a city.

**Examples:**
- "What is the weather in London?"
- "Get weather for Tokyo"

### get_forecast

Get weather forecast for a city.

**Examples:**
- "Weather forecast for Paris"
- "What will the weather be like in Berlin?"

## Usage

\`\`\`javascript
const agent = await client.post('/agents', {
  name: 'Weather Bot',
  plugins: [
    {
      name: '@clawinfra/plugin-weather',
      enabled: true,
      config: {
        apiKey: process.env.WEATHER_API_KEY
      }
    }
  ]
});
\`\`\`

## API Keys

Get your API key from [OpenWeatherMap](https://openweathermap.org/api).

## License

MIT

## Support

- [GitHub Issues](https://github.com/yourusername/clawinfra-plugin-weather/issues)
- [ClawInfra Discord](https://discord.gg/clawinfra)
\`\`\`

### 3. Add a License

Create `LICENSE` file (MIT example):

\`\`\`
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
\`\`\`

### 4. Build and Test

\`\`\`bash
# Clean previous builds
rm -rf dist/

# Build the plugin
npm run build

# Run tests
npm test

# Test the build output
node -e "require('./dist/index.js')"
\`\`\`

## Publishing to npm

### First-Time Setup

\`\`\`bash
# Login to npm
npm login

# Verify login
npm whoami
\`\`\`

### Publish Your Plugin

\`\`\`bash
# Dry run to see what will be published
npm publish --dry-run

# Publish (for scoped packages like @clawinfra/plugin-*)
npm publish --access public

# Or for private packages
npm publish --access restricted
\`\`\`

### Versioning

Follow [Semantic Versioning](https://semver.org/):

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Patch** (1.0.0 → 1.0.1): Bug fixes

\`\`\`bash
# Patch release
npm version patch
npm publish

# Minor release
npm version minor
npm publish

# Major release
npm version major
npm publish
\`\`\`

## Publishing to ClawInfra Plugin Registry

### 1. Submit to Registry

Create a pull request to [ClawInfra Plugin Registry](https://github.com/gwentanky/clawinfra/plugin-registry):

\`\`\`json
{
  "name": "@clawinfra/plugin-weather",
  "version": "1.0.0",
  "description": "Weather data plugin for ClawInfra agents",
  "category": "utilities",
  "author": "Your Name",
  "repository": "https://github.com/yourusername/clawinfra-plugin-weather",
  "npm": "https://www.npmjs.com/package/@clawinfra/plugin-weather",
  "tags": ["weather", "data", "api"],
  "verified": false
}
\`\`\`

### 2. Plugin Verification

To get your plugin verified:

1. Submit plugin for review
2. Pass security audit
3. Demonstrate stability (1000+ downloads or 30+ days old)
4. Maintain good documentation
5. Respond to issues and maintain the plugin

## Continuous Integration

### GitHub Actions for Publishing

Create `.github/workflows/publish.yml`:

\`\`\`yaml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Publish to npm
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
\`\`\`

## Post-Publication

### 1. Announce Your Plugin

- Share on ClawInfra Discord
- Post on Twitter/X with #ClawInfra
- Create announcement on GitHub Discussions
- Write a blog post or tutorial

### 2. Monitor Usage

\`\`\`bash
# Check download stats
npm info @clawinfra/plugin-weather

# Monitor issues
gh issue list --repo yourusername/clawinfra-plugin-weather
\`\`\`

### 3. Maintain Your Plugin

- Respond to issues promptly
- Keep dependencies updated
- Release bug fixes quickly
- Add new features based on feedback
- Maintain documentation

## Plugin Marketing

### Create Example Projects

\`\`\`bash
examples/
├── basic-usage/
│   ├── index.js
│   └── README.md
├── advanced-config/
│   ├── index.js
│   └── README.md
└── integration-example/
    ├── index.js
    └── README.md
\`\`\`

### Write Documentation

- Create detailed API documentation
- Write tutorials and guides
- Record video demos
- Provide troubleshooting guides

### Community Engagement

- Answer questions on Discord
- Help users with issues
- Accept and review pull requests
- Engage with the community

## Best Practices

1. **Semantic Versioning**: Always follow semver
2. **Changelog**: Maintain a CHANGELOG.md
3. **Tests**: Keep test coverage high
4. **Documentation**: Keep docs up to date
5. **Dependencies**: Keep dependencies minimal and updated
6. **Security**: Monitor for security vulnerabilities
7. **Deprecation**: Give users time to migrate from deprecated features
8. **Breaking Changes**: Clearly document breaking changes

## Updating Your Plugin

\`\`\`bash
# Make changes
# Update version in package.json or use npm version

# Patch update
npm version patch

# Build and test
npm run build
npm test

# Publish
npm publish

# Create GitHub release
gh release create v1.0.1 --title "v1.0.1" --notes "Bug fixes"
\`\`\`

## Deprecating a Plugin

If you need to deprecate your plugin:

\`\`\`bash
# Mark as deprecated
npm deprecate @clawinfra/plugin-weather "This package is no longer maintained. Use @clawinfra/plugin-weather-v2 instead."
\`\`\`

## Troubleshooting

### Common Issues

**Error: Package already exists**
\`\`\`bash
# The package name is taken. Choose a different name
# or add a scope: @yourusername/plugin-weather
\`\`\`

**Error: Unauthorized**
\`\`\`bash
# Login to npm
npm login
\`\`\`

**Error: Files not included in package**
\`\`\`bash
# Check your package.json "files" field
# Use npm pack to see what will be published
npm pack
tar -xzf clawinfra-plugin-weather-1.0.0.tgz
\`\`\`

## Plugin Naming Conventions

- Official plugins: `@clawinfra/plugin-name`
- Community plugins: `@username/clawinfra-plugin-name` or `clawinfra-plugin-name`
- Use lowercase and hyphens
- Be descriptive but concise

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [ClawInfra Plugin Registry](https://plugins.clawinfra.xyz)
- [GitHub Actions](https://docs.github.com/en/actions)

## Next Steps

- [Create a Plugin](create-plugin.md) - Deploy your plugin
- [Plugin Reference](../plugins/reference.md) - Browse existing plugins
- [Contribute to Core](contributing.md) - Contribute to ClawInfra

## Need Help?

- [Discord Community](https://discord.gg/clawinfra)
- [GitHub Discussions](https://github.com/gwentanky/clawinfra/discussions)
- [GitHub Issues](https://github.com/gwentanky/clawinfra/issues)
