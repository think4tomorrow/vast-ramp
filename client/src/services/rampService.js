import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

export const initializeRamp = (config) => {
  return new RampInstantSDK({
    hostAppName: config.hostAppName,
    hostLogoUrl: config.hostLogoUrl,
    hostApiKey: config.hostApiKey,
    url: config.url,
    userAddress: config.userAddress,
    userEmail: config.userEmail,
    selectedCountryCode: config.selectedCountryCode,
    fiatCurrency: config.fiatCurrency,
    fiatValue: config.fiatValue,
    enabledFlows: config.enabledFlows,
    webhookStatusUrl: config.webhookStatusUrl,
  });
};