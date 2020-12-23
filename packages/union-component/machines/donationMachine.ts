import { Machine, assign, AnyEventObject } from 'xstate';
import { sendDonation } from '../api/donation';
import { DonationMachineSchema, DonationMachineContext } from './donationType';

export const MINIMAL_DONATION = 5;

// TODO: properly address Machine state declaration with Event support

/**
 * A state machine to describe the transitions within the
 * donation workflow.
 *
 * https://xstate.js.org/viz/?gist=50ecf807d3b9c049fc58cda690f90594
 */
const donationWidgetMachine = Machine<
  DonationMachineContext,
  DonationMachineSchema,
  AnyEventObject
>(
  {
    id: 'donation',
    context: {
      donation: {
        message: '',
        status: '',
        errors: null
      },
      donationType: 'once',
      donationOnceAmount: MINIMAL_DONATION,
      donationMonthlyAmount: MINIMAL_DONATION,
      billingInformation: {
        address: '',
        city: '',
        zipCode: '',
        country: ''
      },
      cardInformation: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      },
      paymentServices: {
        stripe: null,
        stripeToken: null
      }
    },
    initial: 'amountForm',
    states: {
      amountForm: {
        initial: 'donateOnce',
        states: {
          donateOnce: {
            entry: ['setOnceDonation'],
            on: {
              'UPDATE.PAYMENT.SERVICE': { actions: ['updatePaymentServices'] },
              NEXT: '#donation.paymentForm',
              'START.MONTHLY': 'donateMonthly',
              'UPDATE.AMOUNT.ONCE': {
                target: 'donateOnce',
                actions: ['updateDonationOnceAmount']
              }
            }
          },
          donateMonthly: {
            entry: ['setMonthlyDonation'],
            on: {
              'UPDATE.PAYMENT.SERVICE': { actions: ['updatePaymentServices'] },
              NEXT: '#donation.paymentForm',
              'START.ONCE': 'donateOnce',
              'UPDATE.AMOUNT.MONTHLY': {
                target: 'donateMonthly',
                actions: ['updateDonationMonthlyAmount']
              }
            }
          },
          hist: {
            type: 'history',
            history: 'shallow'
          }
        }
      },
      paymentForm: {
        initial: 'addressForm',
        states: {
          cardForm: {
            on: {
              'UPDATE.PAYMENT.SERVICE': { actions: ['updatePaymentServices'] },
              NEXT: [
                {
                  target: '#donation.processDonation',
                  cond: 'isPaymentFormCompleted',
                  actions: ['updatePayeeInformation']
                }
              ],
              PREV: '#donation.amountForm.hist',
              'START.ONCE': '#donation.amountForm.donateOnce',
              'START.MONTHLY': '#donation.amountForm.donateMonthly'
            }
          },
          addressForm: {
            on: {
              'UPDATE.PAYMENT.SERVICE': { actions: ['updatePaymentServices'] },
              NEXT: [
                {
                  target: 'cardForm',
                  cond: 'isAddressFormCompleted',
                  actions: ['updateBillingInformation']
                }
              ],
              PREV: 'cardForm',
              'START.ONCE': '#donation.amountForm.donateOnce',
              'START.MONTHLY': '#donation.amountForm.donateMonthly'
            }
          }
        }
      },
      processDonation: {
        invoke: {
          id: 'submitDonation',
          src: 'donationService',
          onDone: {
            target: 'success',
            actions: assign({ donation: (context, event) => event.data })
          },
          onError: {
            target: 'failure',
            actions: assign<DonationMachineContext, any>({
              donation: (context, event) => ({
                status: 'failed',
                errors: [event.data.message]
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
          RETRY: { target: '#donation.paymentForm.cardForm' }
        }
      }
    }
  },
  {
    guards: {
      isPaymentFormCompleted: (context, event) => {
        const { firstName, lastName, email, phoneNumber } = event;
        const isValid = [firstName, lastName, email, phoneNumber].every(
          Boolean
        );

        if (!isValid) {
          console.error('invalid information', 'isPaymentFormCompleted');
        }

        return isValid;
      },
      isAddressFormCompleted: (context, event) => {
        const { address, city, zipCode, country } = event;
        const isValid = [address, city, zipCode, country].every(Boolean);

        if (!isValid) {
          console.error('invalid information', 'isAddressFormCompleted');
        }

        return isValid;
      }
    },
    actions: {
      updateDonationOnceAmount: assign({
        donationOnceAmount: (context, event) => {
          const { value } = event;
          return value;
        }
      }),
      updateDonationMonthlyAmount: assign({
        donationMonthlyAmount: (context, event) => {
          const { value } = event;
          return value;
        }
      }),
      updateBillingInformation: assign({
        billingInformation: (context, event) => {
          const { address, city, zipCode, country } = event;
          return { address, city, zipCode, country };
        }
      }),
      updatePayeeInformation: assign({
        cardInformation: (context, event) => {
          const { firstName, lastName, email, phoneNumber } = event;
          return { firstName, lastName, email, phoneNumber };
        }
      }),
      updatePaymentServices: assign({
        paymentServices: (context, event) => {
          const { stripe, stripeToken } = event;
          return { ...context.paymentServices, stripe, stripeToken };
        }
      }),
      setMonthlyDonation: assign<DonationMachineContext>({
        donationType: 'monthly'
      }),
      setOnceDonation: assign<DonationMachineContext>({
        donationType: 'once'
      })
    },
    services: {
      donationService: (context) => sendDonation(context)
    }
  }
);

export default donationWidgetMachine;
