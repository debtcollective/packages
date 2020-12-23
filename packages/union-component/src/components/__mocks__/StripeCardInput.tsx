import React from 'react';
import { useElements, useStripe } from '@stripe/react-stripe-js';

const StripeCardInput = ({ onChange }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const card = elements?.getElement('card');

  return (
    <input
      id="mocked-input"
      onChange={() =>
        onChange({ complete: true, error: undefined }, { stripe, card })
      }
      title="stripe-mocked-input-element"
    />
  );
};

export default StripeCardInput;
