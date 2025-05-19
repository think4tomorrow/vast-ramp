const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { sendEmail } = require('../utils/email');

exports.logTransaction = async (payload) => {
  const user = await User.findOne({ walletAddress: payload.userAddress });
  if (!user) {
    throw new Error('User not found');
  }

  const transaction = new Transaction({
    userId: user._id,
    rampId: payload.id,
    fiatAmount: payload.fiatValue,
    fiatCurrency: payload.fiatCurrency,
    status: 'CREATED',
  });

  await transaction.save();
  return transaction;
};

exports.updateBalance = async (walletAddress, cryptoAmount, asset, rampId) => {
  if (asset !== 'ETH') {
    throw new Error('Unsupported asset');
  }

  const user = await User.findOneAndUpdate(
    { walletAddress },
    { $inc: { balance: cryptoAmount } },
    { new: true }
  );

  if (!user) {
    throw new Error('User not found');
  }

  // Update transaction with crypto details
  await Transaction.findOneAndUpdate(
    { rampId },
    {
      cryptoAmount,
      cryptoAsset: asset,
      status: 'CONFIRMED',
    }
  );

  return user;
};

exports.notifyUser = async (walletAddress, message) => {
  const user = await User.findOne({ walletAddress });
  if (!user) {
    throw new Error('User not found');
  }

  await sendEmail(user.email, 'Deposit Update', message);
};