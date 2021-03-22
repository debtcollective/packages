const w = typeof window !== 'undefined' ? (window as any) : {};

export const environmentSetup = {
  DC_DONATE_API_URL: w.DC_DONATE_API_URL,
  DC_MEMBERSHIP_API_URL: w.DC_MEMBERSHIP_API_URL,
  DC_RECAPTCHA_V3_SITE_KEY: w.DC_RECAPTCHA_V3_SITE_KEY,
  DC_STRIPE_PUBLIC_TOKEN: w.DC_STRIPE_PUBLIC_TOKEN
};
