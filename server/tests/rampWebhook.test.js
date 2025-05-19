require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');
const Transaction = require('../src/models/Transaction');
const crypto = require('crypto');

// Mock the email utility
jest.mock('../src/utils/email', () => ({
  sendEmail: jest.fn().mockResolvedValue(undefined)
}));

describe('Ramp Webhook', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Transaction.deleteMany({});
    await User.create({
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      email: 'user@example.com',
      balance: 0.5,
    });
  });

  const secret = process.env.RAMP_WEBHOOK_SECRET || 'test-secret';
  const payload = {
    eventType: 'PURCHASE_CREATED',
    payload: {
      id: 'test-purchase',
      fiatValue: 100,
      fiatCurrency: 'USD',
      userAddress: '0x1234567890abcdef1234567890abcdef12345678',
    },
  };

  it('should handle PURCHASE_CREATED webhook', async () => {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(JSON.stringify(payload));
    const signature = hmac.digest('hex');

    const response = await request(app)
      .post('/api/ramp-webhook')
      .set('x-ramp-signature', signature)
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'Webhook received' });

    const transaction = await Transaction.findOne({ rampId: 'test-purchase' });
    expect(transaction).toBeTruthy();
    expect(transaction.fiatAmount).toBe(100);
    expect(transaction.status).toBe('CREATED');
  });

  it('should handle PURCHASE_CONFIRMED webhook', async () => {
    // First, create a transaction
    await Transaction.create({
      userId: (await User.findOne())._id,
      rampId: 'test-purchase',
      fiatAmount: 100,
      fiatCurrency: 'USD',
      status: 'CREATED',
    });

    const confirmPayload = {
      eventType: 'PURCHASE_CONFIRMED',
      payload: {
        id: 'test-purchase',
        cryptoAmount: 0.005,
        asset: 'ETH',
        userAddress: '0x1234567890abcdef1234567890abcdef12345678',
      },
    };

    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(JSON.stringify(confirmPayload));
    const signature = hmac.digest('hex');

    const response = await request(app)
      .post('/api/ramp-webhook')
      .set('x-ramp-signature', signature)
      .send(confirmPayload);

    expect(response.status).toBe(200);

    const user = await User.findOne({ walletAddress: confirmPayload.payload.userAddress });
    expect(user.balance).toBe(0.505);

    const transaction = await Transaction.findOne({ rampId: 'test-purchase' });
    expect(transaction.status).toBe('CONFIRMED');
    expect(transaction.cryptoAmount).toBe(0.005);
  });
});