import React from 'react';

export const CardElement = () => (
  <input
    type="text"
    id="react-stripe-js__CardElement__mock"
    title="stripe-mocked-input-element"
  />
);

export const Elements = ({ children }: any) => (
  <div id="react-stripe-js__Elements__mock">{children}</div>
);

const STRIPE_MOCKED_CARD = { id: 'stripe-element-card' };

export const useStripe = jest.fn().mockReturnValue({
  createToken: jest.fn().mockResolvedValue({ token: { id: 'test-token' } }),
  elements: jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(STRIPE_MOCKED_CARD),
    getElement: jest.fn().mockReturnValue(STRIPE_MOCKED_CARD)
  })
});

export const useElements = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(STRIPE_MOCKED_CARD),
  getElement: jest.fn().mockReturnValue(STRIPE_MOCKED_CARD)
});
