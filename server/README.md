# Vastlink Wallet Server

Node.js/Express backend for handling Ramp Network webhooks.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set `MONGODB_URI` and `RAMP_WEBHOOK_SECRET`.

3. Start the server:
   ```bash
   npm start
   ```

## Testing

Run tests with:
```bash
npm test
```

## Deployment

Use a process manager like PM2 for production:
```bash
npm install -g pm2
pm2 start src/server.js
```