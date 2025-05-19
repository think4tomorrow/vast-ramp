# Deposit Flow Implementation

## Overview
The deposit flow integrates Ramp Network’s widget into Vastlink Wallet, allowing users to buy ETH with fiat (USD) via cards, bank transfers, or mobile payments.

## Implementation

### Frontend
- **DepositButton.jsx**: Triggers Ramp widget with user data (wallet address, email).
- **UserContext.js**: Manages user state for pass-through KYC.
- **rampService.js**: Initializes Ramp SDK.

### Backend
- **rampController.js**: Handles webhook events (`PURCHASE_CREATED`, `PURCHASE_CONFIRMED`).
- **userService.js**: Logs transactions, updates balances, sends notifications.
- **auth.js**: Verifies webhook signatures.

### Flow
1. User clicks "Deposit with Ramp" on the dashboard.
2. Ramp widget opens, pre-filled with user data.
3. User completes KYC and payment (e.g., $100 via card).
4. Ramp sends webhook (`PURCHASE_CREATED`).
5. Backend logs transaction.
6. On confirmation, Ramp sends `PURCHASE_CONFIRMED`.
7. Backend updates user balance and notifies user.

## Diagram
```
User -> DepositButton -> Ramp Widget -> Payment -> Webhook -> Backend -> Database
```

## Testing
- Sandbox mode: Simulated $100 deposit, confirmed via webhook.
- Local: Widget renders, webhooks processed, balance updated.

## Future Improvements
- Add off-ramp support.
- Enhance error handling.
- Integrate real email service.