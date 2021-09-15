import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import DonationWidget from '../DonationWidget';
import * as HTTPService from '../api/donation';
import { MINIMAL_DONATION } from '../machines/donationMachine';
import * as Stripe from '@stripe/react-stripe-js';

jest.mock('../components/StripeCardInput');

const cardInformation = {
  firstName: faker.name.findName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email('bot', '', 'debtcollective.org'),
  phoneNumber: '202 555 0191'
};

const billingInformation = {
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  zipCode: faker.address.zipCode(),
  country: faker.address.countryCode()
};
const donationAmount = 5;
const donationResponse = {
  status: 'succeeded',
  message: `Your ${donationAmount} donation has been successfully processed`
};
const sendDonationSpy = jest.spyOn(HTTPService, 'sendDonation');

beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(donationResponse)
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('send a donation request with all provided information', async () => {
  const widgetTitle = `Paying $${donationAmount}`;

  render(<DonationWidget />);

  // Give the amount to donate
  expect(screen.getByText(/choose an amount/i)).toBeInTheDocument();
  const amountInput = screen.getByRole('radio', {
    name: `$${donationAmount} USD`
  });
  userEvent.click(amountInput);
  userEvent.click(screen.getByRole('button', { name: /donate/i }));

  // Give the billing address
  expect(screen.getByText(widgetTitle)).toBeInTheDocument();

  userEvent.type(
    screen.getByRole('textbox', { name: /street/i }),
    billingInformation.address
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /city/i }),
    billingInformation.city
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /zip code/i }),
    billingInformation.zipCode
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: /country/i }),
    billingInformation.country
  );
  userEvent.click(screen.getByRole('button', { name: /next/i }));

  // Give the payment details
  const submitBtn = screen.getByRole('button', { name: /next/i });
  expect(submitBtn).toBeDisabled();

  expect(screen.getByText(widgetTitle)).toBeInTheDocument();

  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    cardInformation.firstName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    cardInformation.lastName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    cardInformation.email
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /phone/i }),
    cardInformation.phoneNumber
  );
  userEvent.type(
    screen.getByRole('textbox', { name: 'stripe-mocked-input-element' }),
    faker.finance.creditCardNumber()
  );

  expect(submitBtn).not.toBeDisabled();
  userEvent.click(submitBtn);

  await waitFor(() =>
    expect(sendDonationSpy).toHaveBeenCalledWith({
      billingInformation,
      cardInformation: {
        firstName: cardInformation.firstName,
        lastName: cardInformation.lastName,
        email: cardInformation.email,
        phoneNumber: `+1${cardInformation.phoneNumber.replace(/\D/g, '')}`
      },
      donation: {
        message: '',
        status: '',
        errors: null
      },
      donationType: 'once',
      donationOnceAmount: donationAmount,
      donationMonthlyAmount: MINIMAL_DONATION,
      paymentServices: {
        stripe: expect.any(Object),
        stripeToken: {
          id: 'test-token'
        }
      }
    })
  );

  expect(await screen.findByText(donationResponse.message)).toBeInTheDocument();
});

test('should display phone number error', async () => {
  const widgetTitle = `Paying $${donationAmount}`;
  const invalidPhoneNumber = '+123';

  render(<DonationWidget />);

  // Give the amount to donate
  expect(screen.getByText(/choose an amount/i)).toBeInTheDocument();
  const amountInput = screen.getByRole('radio', {
    name: `$${donationAmount} USD`
  });
  userEvent.click(amountInput);
  userEvent.click(screen.getByRole('button', { name: /donate/i }));

  // Give the billing address
  expect(screen.getByText(widgetTitle)).toBeInTheDocument();

  userEvent.type(
    screen.getByRole('textbox', { name: /street/i }),
    billingInformation.address
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /city/i }),
    billingInformation.city
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /zip code/i }),
    billingInformation.zipCode
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: /country/i }),
    billingInformation.country
  );
  userEvent.click(screen.getByRole('button', { name: /next/i }));

  // Give the payment details
  expect(screen.getByText(widgetTitle)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    cardInformation.firstName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    cardInformation.lastName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    cardInformation.email
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /phone/i }),
    invalidPhoneNumber
  );
  userEvent.type(
    screen.getByRole('textbox', { name: 'stripe-mocked-input-element' }),
    faker.finance.creditCardNumber()
  );

  expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
});

test('avoid calling membersip api if the stripe token is missing', async () => {
  const widgetTitle = `Paying $${donationAmount}`;
  const useStripeMock = Stripe.useStripe as jest.Mock;
  useStripeMock.mockReturnValue({
    createToken: jest.fn().mockResolvedValue({ token: { id: null } })
  });

  const spyOnConsole = jest
    .spyOn(console, 'error')
    .mockImplementation(jest.fn());
  render(<DonationWidget />);

  // Give the amount to donate
  expect(screen.getByText(/choose an amount/i)).toBeInTheDocument();
  const amountInput = screen.getByRole('radio', {
    name: `$${donationAmount} USD`
  });
  userEvent.click(amountInput);
  userEvent.click(screen.getByRole('button', { name: /donate/i }));

  // Give the billing address
  expect(screen.getByText(widgetTitle)).toBeInTheDocument();

  userEvent.type(
    screen.getByRole('textbox', { name: /street/i }),
    billingInformation.address
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /city/i }),
    billingInformation.city
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /zip code/i }),
    billingInformation.zipCode
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: /country/i }),
    billingInformation.country
  );
  userEvent.click(screen.getByRole('button', { name: /next/i }));

  // Give the payment details
  const submitBtn = screen.getByRole('button', { name: /next/i });
  expect(submitBtn).toBeDisabled();
  expect(screen.getByText(widgetTitle)).toBeInTheDocument();

  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    cardInformation.firstName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    cardInformation.lastName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    cardInformation.email
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /phone/i }),
    cardInformation.phoneNumber
  );
  userEvent.type(
    screen.getByRole('textbox', { name: 'stripe-mocked-input-element' }),
    faker.finance.creditCardNumber()
  );

  expect(submitBtn).not.toBeDisabled();
  userEvent.click(submitBtn);

  expect(
    await screen.findByText(/error processing your request. please try again/i)
  ).toBeInTheDocument();
  expect(spyOnConsole).toHaveBeenCalledTimes(1);
});

test('allows to go back to edit amount', () => {
  render(<DonationWidget />);

  const amountInput = screen.getByRole('radio', {
    name: `$${donationAmount} USD`
  });
  userEvent.click(amountInput);
  userEvent.click(screen.getByRole('button', { name: /donate/i }));

  const goBackBtn = screen.getByText(/edit amount/i);

  expect(screen.queryByText(/choose an amount/i)).not.toBeInTheDocument();

  userEvent.click(goBackBtn);

  expect(screen.getByText(/choose an amount/i)).toBeInTheDocument();
});

test('shows payment error when donation request fails', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      status: 'failed',
      errors: { stripe: ['your card has been declined'] }
    })
  });

  // Avoid to display all console errors generated when error
  const spyOnConsole = jest
    .spyOn(console, 'error')
    .mockImplementation(jest.fn());

  render(<DonationWidget />);

  // Give the amount to donate
  const amountInput = screen.getByRole('radio', {
    name: `$${donationAmount} USD`
  });
  userEvent.click(amountInput);
  userEvent.click(screen.getByRole('button', { name: /donate/i }));

  // Give the billing address
  userEvent.type(
    screen.getByRole('textbox', { name: /street/i }),
    billingInformation.address
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /city/i }),
    billingInformation.city
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /zip code/i }),
    billingInformation.zipCode
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: /country/i }),
    billingInformation.country
  );
  userEvent.click(screen.getByRole('button', { name: /next/i }));

  // Give the payment details
  const submitBtn = screen.getByRole('button', { name: /next/i });
  expect(submitBtn).toBeDisabled();

  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    cardInformation.firstName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    cardInformation.lastName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    cardInformation.email
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /phone/i }),
    cardInformation.phoneNumber
  );
  userEvent.type(
    screen.getByRole('textbox', { name: 'stripe-mocked-input-element' }),
    faker.finance.creditCardNumber()
  );

  expect(submitBtn).not.toBeDisabled();
  userEvent.click(screen.getByRole('button', { name: /next/i }));

  await waitFor(() => expect(sendDonationSpy).toHaveBeenCalled());
  expect(
    await screen.findByText(/error processing your request/i)
  ).toBeInTheDocument();
  expect(spyOnConsole).toHaveBeenCalledTimes(1);
});
