const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rampId: {
    type: String,
    required: true,
    unique: true,
  },
  fiatAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  fiatCurrency: {
    type: String,
    required: true,
  },
  cryptoAmount: {
    type: Number,
    min: 0,
  },
  cryptoAsset: {
    type: String,
  },
  status: {
    type: String,
    enum: ['CREATED', 'CONFIRMED', 'FAILED'],
    default: 'CREATED',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update `updatedAt` on save
transactionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema);