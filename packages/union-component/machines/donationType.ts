/* eslint-disable @typescript-eslint/ban-types */

import { StripeCardElement, Stripe, Token } from '@stripe/stripe-js';

export type BillingInfoEvent = {
  type: 'NEXT';
  address: string;
  city: string;
  zipCode: string;
  country: string;
};

export type PaymentInfoEvent = {
  type: 'NEXT';
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  token: StripeCardElement;
};

export type AmountEvent = {
  type: 'UPDATE.AMOUNT.ONCE' | 'UPDATE.AMOUNT.MONTHLY';
  value: number;
};

export type DonationTypeEvent = {
  type: 'START.MONTHLY' | 'START.ONCE';
};

export type TransitionEvent = {
  type: 'NEXT' | 'PREV' | 'RETRY';
};

// TODO: the usage of the event definition yield error on machine implementation
export type DonationMachineEvent =
  | BillingInfoEvent
  | PaymentInfoEvent
  | AmountEvent
  | TransitionEvent
  | DonationTypeEvent;
/**
 * Overall definition of the Machine schema
 */
export interface DonationMachineSchema {
  initial: 'amountForm';
  states: {
    amountForm: {
      states: {
        donateOnce: {};
        donateMonthly: {};
        hist: {};
      };
    };
    paymentForm: {
      states: {
        cardForm: {};
        addressForm: {};
      };
    };
    processDonation: {};
    success: {};
    failure: {};
  };
}

// TODO: allow to being able to declare possible state machines states
export type DonationMachineStateValueMap = any;

/**
 * The extended state value of the machine that
 * holds the information while the user uses the widget
 */
export type DonationMachineContext = {
  /**
   * A key to hold the response once the donation service respond
   */
  donation: {
    message?: string;
    status: string;
    /**
     * A key to hold the errors that may be faced while progressing into the widget
     */
    errors?: string[] | null;
  };
  /**
   * The type of donation the user is attempting to do
   */
  donationType: 'once' | 'monthly';
  /**
   * Holds the value of a single donation process
   */
  donationOnceAmount: number;
  /**
   * Holds the value of a monthly donation process
   */
  donationMonthlyAmount: number;
  /**
   * Holds the billing address information
   */
  billingInformation: {
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  /**
   * Holds the payment information of the tool that's going to be used
   * in order to proceed with the donation
   */
  cardInformation: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  /**
   * Holds a set of services to perform payments
   */
  paymentServices: {
    stripe: Stripe | null;
    stripeToken: Token | null;
  };
};
