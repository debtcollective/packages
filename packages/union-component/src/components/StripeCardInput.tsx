import React, { useState } from 'react';
import { ErrorText } from './DonationWizard';
import {
  Stripe,
  StripeCardElement,
  StripeCardElementChangeEvent
} from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CARD_ELEMENT_OPTIONS } from '../utils/stripe';

export interface DonationPaymentProvider {
  stripe: Stripe;
  card: StripeCardElement | null | undefined;
}

interface Props {
  onChange: (
    e: StripeCardElementChangeEvent,
    paymentProvider?: DonationPaymentProvider
  ) => void;
}

const StripeCardInput: React.FC<Props> = ({ onChange }) => {
  const [error, setError] = useState<string | null | undefined>(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleOnChange = (e: StripeCardElementChangeEvent) => {
    if (stripe && e.complete) {
      const card = elements?.getElement(CardElement);
      onChange(e, { stripe, card });
      return;
    }

    onChange(e);
    setError(e.error?.message);
  };

  return (
    <>
      <CardElement
        id="stripe-card-element"
        className="form-control"
        options={CARD_ELEMENT_OPTIONS}
        onChange={handleOnChange}
      />
      <ErrorText role="alert">{error}</ErrorText>
    </>
  );
};

export default StripeCardInput;
