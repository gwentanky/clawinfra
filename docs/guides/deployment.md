# Deploy a Project

Learn how to deploy your ClawInfra agent to production environments.

## Deployment Options

ClawInfra supports multiple deployment platforms:

- **Cloud Platforms**: Vercel, Railway, Render, AWS, Google Cloud
- **Containerized**: Docker, Kubernetes
- **Serverless**: AWS Lambda, Google Cloud Functions
- **VPS**: DigitalOcean, Linode, Vultr

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All environment variables are configured
- [ ] Character files are finalized
- [ ] Plugins are tested locally
- [ ] Error handling is implemented
- [ ] Logging is configured
- [ ] Rate limits are set
- [ ] Security best practices are followed

## Quick Deploy with Vercel

### 1. Prepare Your Project

```bash
# Deploy your project
pnpm build

# Test production build locally
pnpm start
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel deploy

# Deploy to production
vercel --prod
```

### 3. Configure Environment Variables

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add all required keys from your `.env` file
3. Redeploy

## Deploy with Railway

### 1. Install Railway CLI

```bash
npm install -g @railway/cli
```

### 2. Initialize Railway

```bash
railway login
railway init
```

### 3. Deploy

```bash
railway up
```

### 4. Set Environment Variables

```bash
railway variables set OPENAI_API_KEY=your_key
railway variables set DISCORD_BOT_TOKEN=your_token
```

## Docker Deployment

### 1. Create Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --production

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the agent
CMD ["npm", "start"]
```

### 2. Build Image

```bash
docker build -t claw-agent .
```

### 3. Run Container

```bash
docker run -d \
  --name my-claw-agent \
  -e OPENAI_API_KEY=your_key \
  -e DISCORD_BOT_TOKEN=your_token \
  -p 3000:3000 \
  claw-agent
```

### 4. Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  agent:
    build: .
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - DISCORD_BOT_TOKEN=${DISCORD_BOT_TOKEN}
    ports:
      - "3000:3000"
    restart: unless-stopped
    volumes:
      - ./data:/app/data

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=clawinfra
      - POSTGRES_USER=claw
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Run with:

```bash
docker-compose up -d
```

## AWS Deployment

### Using EC2

1. **Launch EC2 Instance**
   - Choose Ubuntu 22.04 LTS
   - t3.small or larger recommended
   - Configure security groups (ports 22, 80, 443)

2. **Connect and Setup**

```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone and setup your project
git clone your-repo
cd your-project
npm install
npm run build
```

3. **Start with PM2**

```bash
# Start agent
pm2 start npm --name "claw-agent" -- start

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

### Using ECS (Container Service)

1. **Build and Push Image**

```bash
# Authenticate with ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com

# Build and tag
docker build -t claw-agent .
docker tag claw-agent:latest your-account.dkr.ecr.us-east-1.amazonaws.com/claw-agent:latest

# Push
docker push your-account.dkr.ecr.us-east-1.amazonaws.com/claw-agent:latest
```

2. **Create ECS Task Definition**
3. **Deploy to ECS Cluster**

## Environment Variables Management

### Using dotenv-vault

```bash
# Install
npm install -g dotenv-vault

# Login
npx dotenv-vault login

# Push environment
npx dotenv-vault push

# Pull on server
npx dotenv-vault pull
```

### Using AWS Secrets Manager

```javascript
// Load secrets in your app
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

async function loadSecrets() {
  const client = new SecretsManagerClient({ region: "us-east-1" });
  const response = await client.send(
    new GetSecretValueCommand({ SecretId: "claw-agent-secrets" })
  );
  return JSON.parse(response.SecretString);
}
```

## Monitoring and Logging

### Setup Logging

```javascript
// claw.config.js
export default {
  logging: {
    level: 'info',
    file: './logs/agent.log',
    maxSize: '10m',
    maxFiles: 5
  }
}
```

### PM2 Monitoring

```bash
# View logs
pm2 logs claw-agent

# Monitor
pm2 monit

# Web dashboard
pm2 plus
```

### Using External Services

**Sentry for Error Tracking:**

```bash
npm install @sentry/node

# In your code
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

**DataDog for Metrics:**

```bash
npm install dd-trace

# At app entry
import tracer from 'dd-trace';
tracer.init({
  service: 'claw-agent',
  env: process.env.NODE_ENV
});
```

## SSL/HTTPS Setup

### Using Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d your-domain.com

# Setup nginx reverse proxy
sudo apt install nginx
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Scaling

### Horizontal Scaling

Run multiple instances:

```bash
# PM2 cluster mode
pm2 start npm --name "claw-agent" -i max -- start
```

### Load Balancing

Use nginx for load balancing:

```nginx
upstream claw_agents {
    server localhost:3000;
    server localhost:3001;
    server localhost:3002;
}

server {
    listen 80;
    location / {
        proxy_pass http://claw_agents;
    }
}
```

## Backup and Recovery

### Database Backups

```bash
# Automated PostgreSQL backups
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump clawinfra > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://your-backup-bucket/
```

### Character File Backups

Keep character files in version control and backup regularly.

## Troubleshooting

### Common Issues

**Agent not starting:**
```bash
# Check logs
pm2 logs claw-agent --lines 100

# Verify environment variables
pm2 env claw-agent
```

**High memory usage:**
```bash
# Restart with memory limit
pm2 start npm --name "claw-agent" --max-memory-restart 1G -- start
```

**Connection timeouts:**
- Check firewall rules
- Verify security group settings
- Test network connectivity

## Deployment Best Practices

1. **Use CI/CD**: Automate deployments with GitHub Actions
2. **Health Checks**: Implement health check endpoints
3. **Gradual Rollouts**: Deploy to staging first
4. **Monitoring**: Set up alerts for critical issues
5. **Backups**: Regular automated backups
6. **Documentation**: Maintain deployment runbooks

## Next Steps

- [Monitor Performance](../runtime/monitoring.md)
- [Setup CI/CD Pipeline](ci-cd.md)
- [Security Best Practices](security.md)

## Support

Need help with deployment?
- [Discord Community](https://discord.gg/clawinfra)
- [Deployment Forum](https://github.com/gwentanky/clawinfra/discussions)
