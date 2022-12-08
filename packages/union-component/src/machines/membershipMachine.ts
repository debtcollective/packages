/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Stripe, Token } from '@stripe/stripe-js';
import { Machine, assign, AnyEventObject } from 'xstate';
import { sendMembershipDonation } from '../api/membership';

export const MINIMAL_DONATION = 5;

export const membershipMachineContext = {
  api: {
    donation: undefined
  },
  donationType: 'month',
  donationMonthlyAmount: MINIMAL_DONATION,
  addressInformation: {
    street: '',
    city: '',
    zipCode: '',
    country: ''
  },
  personalInformation: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    mobileConsent: false,
    chapter: ''
  },
  paymentServices: {
    stripe: undefined,
    stripeToken: undefined
  }
};

export type MembershipMachineContext = Omit<
  typeof membershipMachineContext,
  'paymentServices' | 'paymentAuthorizations' | 'api'
> & {
  api: {
    donation?: {
      status: 'failed' | 'succeeded';
      message?: string;
      errors?: string[];
    };
  };
  paymentServices: { stripe?: Stripe; stripeToken?: Token };
};

export type AddressData = {
  street: string;
  city: string;
  zipCode: string;
  country: string;
};

export type PersonalData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  mobileConsent: boolean;
  chapter:
    | 'pennsylvania'
    | 'massachusetts'
    | 'washington'
    | 'chicago'
    | 'none'
    | '';
};

export type PaymentServices = {
  stripe?: Stripe;
  stripeToken?: Token;
};

export type AddressNextEvent = { type: 'NEXT'; data: AddressData };
export type AmountNextEvent = { type: 'NEXT'; data: { value: number } };
export type PersonalNextEvent = {
  type: 'NEXT';
  data: PersonalData & PaymentServices;
};
export type EditAmountEvent = { type: 'EDIT.AMOUNT' };
export type NextZeroEvent = { type: 'NEXT.ZERO' };
export type PrevEvent = { type: 'PREV' };
export type RetryEvent = { type: 'RETRY' };

export type MembershipMachineEvent = AnyEventObject;

const actions = {
  updateChapterInformation: assign<MembershipMachineContext, PersonalNextEvent>(
    {
      personalInformation: (context, event) => {
        const { chapter } = event.data;

        return {
          ...context.personalInformation,
          chapter: chapter === 'none' ? '' : chapter
        };
      }
    }
  ),
  updateDonationMonthlyAmount: assign<
    MembershipMachineContext,
    AmountNextEvent
  >({
    donationMonthlyAmount: (context, event) => {
      return event.data.value;
    }
  }),
  updateAddressInformation: assign<MembershipMachineContext, AddressNextEvent>({
    addressInformation: (context, event) => {
      const { street, city, zipCode, country } = event.data;
      return { street, city, zipCode, country };
    }
  }),
  updatePayeeInformation: assign<MembershipMachineContext, PersonalNextEvent>({
    personalInformation: (context, event) => {
      const { firstName, lastName, email, phoneNumber, mobileConsent } = event.data;
      const phoneE164 = `+${phoneNumber.replace(/\D/g, '')}`;

      return {
        ...context.personalInformation,
        firstName,
        lastName,
        email,
        phoneNumber: phoneE164,
        mobileConsent
      };
    }
  }),
  updatePaymentServices: assign<MembershipMachineContext, PersonalNextEvent>({
    paymentServices: (context, event) => {
      const { stripe, stripeToken } = event.data;

      return { ...context.paymentServices, stripe, stripeToken };
    }
  })
};

const services = {
  donationService: (context: MembershipMachineContext) =>
    sendMembershipDonation(context)
};

const guards = {
  isAddressFormCompleted: (
    context: MembershipMachineContext,
    event: AddressNextEvent
  ) => {
    const { street, city, zipCode, country } = event.data;
    const isValid = [street, city, zipCode, country].every(Boolean);

    if (!isValid) {
      console.error(
        'invalid information on guard:',
        'isAddressFormCompleted',
        event
      );
    }

    return isValid;
  },
  isAmountSelected: (
    context: MembershipMachineContext,
    event: AmountNextEvent
  ) => {
    return event.data.value !== null;
  },
  isPersonalFormCompleted: (
    context: MembershipMachineContext,
    event: PersonalNextEvent
  ) => {
    const { firstName, lastName, email, phoneNumber } = event.data;

    const isValid = [firstName, lastName, email, phoneNumber].every(Boolean);

    if (!isValid) {
      console.error(
        'invalid information on guard:',
        'isPersonalFormCompleted',
        event
      );
    }

    return isValid;
  }
};

/**
 * A state machine to describe the transitions within a
 * membership donation workflow
 *
 * https://xstate.js.org/viz/?gist=184c760f3d2176086487396038edd346
 */
const membershipMachine = Machine<
  MembershipMachineContext,
  MembershipMachineEvent
>(
  {
    id: 'donation',
    context: membershipMachineContext,
    initial: 'amountForm',
    states: {
      amountForm: {
        initial: 'donateMonthly',
        states: {
          donateMonthly: {
            on: {
              NEXT: {
                target: '#donation.generalInformationForm',
                cond: 'isAmountSelected',
                actions: ['updateDonationMonthlyAmount']
              }
            }
          }
        }
      },
      generalInformationForm: {
        initial: 'addressInformationForm',
        states: {
          addressInformationForm: {
            on: {
              'EDIT.AMOUNT': '#donation.amountForm.donateMonthly',
              'NEXT.ZERO': [
                {
                  target: 'zeroPersonalInformationForm',
                  cond: 'isAddressFormCompleted',
                  actions: ['updateAddressInformation']
                }
              ],
              NEXT: [
                {
                  target: 'personalInformationForm',
                  cond: 'isAddressFormCompleted',
                  actions: ['updateAddressInformation']
                }
              ],
              PREV: '#donation.amountForm'
            }
          },
          personalInformationForm: {
            on: {
              'EDIT.AMOUNT': '#donation.amountForm.donateMonthly',
              NEXT: [
                {
                  target: '#donation.processMembership',
                  cond: 'isPersonalFormCompleted',
                  actions: [
                    'updatePaymentServices',
                    'updatePayeeInformation',
                    'updateChapterInformation'
                  ]
                }
              ],
              PREV: 'addressInformationForm'
            }
          },
          zeroPersonalInformationForm: {
            on: {
              'EDIT.AMOUNT': '#donation.amountForm.donateMonthly',
              NEXT: [
                {
                  target: '#donation.processMembership',
                  cond: 'isAddressFormCompleted',
                  actions: [
                    'updatePayeeInformation',
                    'updateChapterInformation'
                  ]
                }
              ],
              PREV: 'addressInformationForm'
            }
          },
          hist: {
            type: 'history',
            history: 'shallow'
          }
        }
      },
      processMembership: {
        invoke: {
          id: 'submitDonation',
          src: 'donationService',
          onDone: {
            target: 'success',
            actions: assign<MembershipMachineContext, any>({
              api: (context, event) => ({
                donation: event.data
              })
            })
          },
          onError: {
            target: 'failure',
            actions: assign<MembershipMachineContext, any>({
              api: (context, event) => ({
                donation: {
                  status: 'failed',
                  errors: [event.data.message]
                }
              })
            })
          }
        }
      },
      success: {
        type: 'final'
      },
      failure: {
        on: {
          RETRY: { target: '#donation.generalInformationForm.hist' }
        }
      }
    }
  },
  {
    // @ts-ignore TODO: Unable to related possible actions
    actions,
    // @ts-ignore TODO: Unable to related all possible events together
    guards,
    services
  }
);

export default membershipMachine;
