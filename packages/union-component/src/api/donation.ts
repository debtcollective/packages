import { DEFAULT_ERROR } from '../constants/errors';
import { DonationMachineContext } from '../machines/donationType';

interface DonationResponse {
  status: 'failed' | 'succeeded';
  errors?: Array<string>;
  message?: string;
}

export const sendDonation = async (context: DonationMachineContext) => {
  const { cardInformation, billingInformation, paymentServices } = context;
  const grecaptcha = (window as any).grecaptcha;
  let recaptchaToken;

  if (!grecaptcha || !paymentServices.stripeToken?.id) {
    throw new Error(DEFAULT_ERROR);
  }

  try {
    recaptchaToken = await grecaptcha.execute(
      (window as any).DC_RECAPTCHA_V3_SITE_KEY,
      {
        action: 'donate'
      }
    );
  } catch (error) {
    console.error(error);
    throw new Error(DEFAULT_ERROR);
  }

  if (!paymentServices.stripeToken) {
    console.error('Unable to perform donation', context);
    throw new Error(DEFAULT_ERROR);
  }

  const amount =
    context.donationType === 'monthly'
      ? context.donationMonthlyAmount
      : context.donationOnceAmount;

  const data = {
    'g-recaptcha-response-data': recaptchaToken,
    charge: {
      address_city: billingInformation.city,
      address_country_code: billingInformation.country,
      address_line1: billingInformation.address,
      address_zip: billingInformation.zipCode,
      amount,
      phone_number: cardInformation.phoneNumber,
      email: cardInformation.email,
      name: `${cardInformation.firstName} ${cardInformation.lastName}`,
      stripe_token: paymentServices.stripeToken.id,
      stripe_card_id: paymentServices.stripeToken.card?.id
    }
  };

  const response: DonationResponse = await fetch(
    (window as any).DC_DONATE_API_URL,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  ).then((res) => res.json());

  if (response.status === 'failed') {
    console.error(response.errors);
    throw new Error(response.message);
  }

  return response;
};
