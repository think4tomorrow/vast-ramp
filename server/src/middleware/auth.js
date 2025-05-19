const crypto = require('crypto');

exports.verifyWebhook = (req, res, next) => {
  const signature = req.headers['x-ramp-signature'];
  const secret = process.env.RAMP_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return res.status(401).json({ error: 'Missing signature or secret' });
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(req.body));
  const computedSignature = hmac.digest('hex');

  if (signature !== computedSignature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  next();
};