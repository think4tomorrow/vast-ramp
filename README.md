# Vastlink Wallet

A non-custodial wallet with on/off-ramp functionality using Ramp Network.

## Project Structure
- `client/`: React frontend.
- `server/`: Node.js/Express backend.
- `docs/`: Documentation (evaluation, test results).

## Setup

1. Clone repository:
   ```bash
   git clone https://github.com/vastlink/vastlink-wallet.git
   cd vastlink-wallet
   ```

2. Set up frontend:
   ```bash
   cd client
   npm install
   cp .env.example .env
   # Edit .env
   npm start
   ```

3. Set up backend:
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env
   npm run dev
   ```

4. (Optional) Use Docker:
   ```bash
   docker-compose up --build
   ```

## Testing
- Frontend: `cd client && npm test`
- Backend: `cd server && npm test`

## Deployment
- Build frontend: `cd client && npm run build`
- Deploy backend with PM2: `cd server && pm2 start src/server.js`
- Host on AWS/GCP with nginx.

## Documentation
- `docs/evaluation-report.md`: Ramp vs. MoonPay.
- `docs/test-results.md`: Test outcomes.

For support, contact support@vastwallet.j-labs.xyz.