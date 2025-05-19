import React, { useContext, useState } from "react";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import { UserContext } from "../context/UserContext";
import "../assets/styles/DepositButton.css";

const DepositButton = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleDeposit = () => {
    if (!user.walletAddress) {
      window.alert("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    try {
      new RampInstantSDK({
        hostAppName: "Vastlink Wallet",
        hostLogoUrl: "https://vastwallet.j-labs.xyz/logo.png",
        hostApiKey: process.env.REACT_APP_RAMP_API_KEY,
        url: "https://app.ramp.network",
        userAddress: user.walletAddress,
        userEmail: user.email,
        selectedCountryCode: "US",
        fiatCurrency: "USD",
        fiatValue: 100,
        enabledFlows: ["ONRAMP"],
        webhookStatusUrl: "https://api.vastwallet.j-labs.xyz/ramp-webhook",
      }).show();
    } catch (error) {
      console.error("Error initializing Ramp:", error);
      window.alert("Failed to open deposit widget.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="deposit-button"
      onClick={handleDeposit}
      disabled={loading || !user.walletAddress}
    >
      {loading ? "Loading..." : "Deposit with Ramp"}
    </button>
  );
};

export default DepositButton;
