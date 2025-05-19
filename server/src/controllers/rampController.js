const userService = require("../services/userService");

exports.handleWebhook = async (req, res) => {
  try {
    const { eventType, payload } = req.body;

    switch (eventType) {
      case "PURCHASE_CREATED":
        console.log(
          `Purchase created: ${payload.id}, Amount: ${payload.fiatValue} ${payload.fiatCurrency}`
        );
        await userService.logTransaction(payload);
        break;
      case "PURCHASE_CONFIRMED":
        console.log(`Purchase confirmed: ${payload.id}`);
        await userService.updateBalance(
          payload.userAddress,
          payload.cryptoAmount,
          payload.asset,
          payload.id
        );
        await userService.notifyUser(
          payload.userAddress,
          `Deposit of ${payload.cryptoAmount} ${payload.asset} confirmed`
        );
        break;
      case "PURCHASE_FAILED":
        console.log(`Purchase failed: ${payload.id}`);
        await Transaction.findOneAndUpdate(
          { rampId: payload.id },
          { status: "FAILED" }
        );
        await userService.notifyUser(
          payload.userAddress,
          "Deposit failed. Please try again."
        );
        break;
      default:
        console.log(`Unhandled event: ${eventType}`);
    }

    res.status(200).json({ status: "Webhook received" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
};
