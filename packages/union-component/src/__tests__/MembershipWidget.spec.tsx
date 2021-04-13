import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import MembershipWidget from '../MembershipWidget';
import * as HTTPService from '../api/membership';
import * as Stripe from '@stripe/react-stripe-js';

jest.mock('../components/StripeCardInput');
jest.mock('../components/DonationCountryDropdown');

const personalInformation = {
  firstName: faker.name.findName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email('bot', '', 'debtcollective.org'),
  phoneNumber: faker.phone.phoneNumber('+# ### ### ####')
};
const addressInformation = {
  street: faker.address.streetAddress(),
  city: faker.address.city(),
  zipCode: faker.address.zipCode(),
  country: 'VE'
};
const donationResponse = {
  status: 'succeeded',
  message: 'Your donation has been successfully processed'
};
const sendDonationSpy = jest.spyOn(HTTPService, 'sendMembershipDonation');

beforeAll(() => {
  // @ts-ignore
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(donationResponse)
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('allows to skip the payment form and complete flow using zero donation selection', async () => {
  const donationAmount = 0;
  const widgetTitle = `Paying $${donationAmount}`;
  render(<MembershipWidget hasChapterSelection />);

  const zeroOptionBtn = screen.getByRole('button', { name: /zero/i });
  userEvent.click(zeroOptionBtn);

  // Give address information
  expect(screen.getByText(widgetTitle)).toBeInTheDocument();

  userEvent.type(
    screen.getByRole('textbox', { name: /street/i }),
    addressInformation.street
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /city/i }),
    addressInformation.city
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /zip code/i }),
    addressInformation.zipCode
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: /country/i }),
    addressInformation.country
  );
  userEvent.click(screen.getByRole('button', { name: /next/i }));

  // Give personal information
  expect(screen.getByText(widgetTitle)).toBeInTheDocument();
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    personalInformation.firstName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    personalInformation.lastName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    personalInformation.email
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /phone/i }),
    personalInformation.phoneNumber
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: /chapter/i }),
    'massachusetts'
  );

  const submitBtn = screen.getByRole('button', { name: /next/i });
  expect(submitBtn).not.toBeDisabled();
  userEvent.click(submitBtn);

  expect(await screen.findByText(/gotten your help/i)).toBeInTheDocument();

  expect(sendDonationSpy).toHaveBeenCalledWith({
    addressInformation,
    personalInformation: {
      ...personalInformation,
      chapter: 'massachusetts'
    },
    api: {
      donation: undefined,
      errors: undefined
    },
    donationType: 'month',
    donationMonthlyAmount: donationAmount,
    paymentServices: {
      stripe: undefined,
      stripeToken: undefined
    }
  });
});

test('allows to complete flow using an amount donation selection', async () => {
  const donationAmount = 5;
  const widgetTitle = `Paying $${donationAmount}`;
  render(<MembershipWidget hasChapterSelection />);

  // Select an amount
  userEvent.click(
    screen.getByRole('radio', { name: `$${donationAmount} USD/mo` })
  );
  userEvent.click(screen.getByRole('button', { name: /pay/i }));

  // Give address information
  expect(screen.getByText(widgetTitle)).toBeInTheDocument();

  userEvent.type(
    screen.getByRole('textbox', { name: /street/i }),
    addressInformation.street
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /city/i }),
    addressInformation.city
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /zip code/i }),
    addressInformation.zipCode
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: /country/i }),
    addressInformation.country
  );
  userEvent.click(screen.getByRole('button', { name: /next/i }));

  // Give personal information
  expect(screen.getByText(widgetTitle)).toBeInTheDocument();
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    personalInformation.firstName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    personalInformation.lastName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    personalInformation.email
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /phone/i }),
    personalInformation.phoneNumber
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: /chapter/i }),
    'massachusetts'
  );
  userEvent.type(
    screen.getByRole('textbox', { name: 'stripe-mocked-input-element' }),
    faker.finance.creditCardNumber()
  );

  const submitBtn = screen.getByRole('button', { name: /next/i });
  expect(submitBtn).not.toBeDisabled();
  userEvent.click(submitBtn);

  expect(await screen.findByText(/gotten your help/i)).toBeInTheDocument();

  expect(sendDonationSpy).toHaveBeenCalledWith({
    addressInformation,
    personalInformation: {
      ...personalInformation,
      chapter: 'massachusetts'
    },
    api: {
      donation: undefined,
      errors: undefined
    },
    donationType: 'month',
    donationMonthlyAmount: donationAmount,
    paymentServices: {
      stripe: expect.any(Object),
      stripeToken: expect.any(Object)
    }
  });
});

test('avoid calling membersip api if the stripe token is missing', async () => {
  const donationAmount = 5;
  const widgetTitle = `Paying $${donationAmount}`;
  const useStripeMock = Stripe.useStripe as jest.Mock;
  useStripeMock.mockReturnValue({
    createToken: jest.fn().mockResolvedValue({ token: { id: null } })
  });

  render(<MembershipWidget hasChapterSelection />);

  // Select an amount
  userEvent.click(
    screen.getByRole('radio', { name: `$${donationAmount} USD/mo` })
  );
  userEvent.click(screen.getByRole('button', { name: /pay/i }));

  // Give address information
  expect(screen.getByText(widgetTitle)).toBeInTheDocument();

  userEvent.type(
    screen.getByRole('textbox', { name: /street/i }),
    addressInformation.street
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /city/i }),
    addressInformation.city
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /zip code/i }),
    addressInformation.zipCode
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: /country/i }),
    addressInformation.country
  );
  userEvent.click(screen.getByRole('button', { name: /next/i }));

  // Give personal information
  expect(screen.getByText(widgetTitle)).toBeInTheDocument();
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    personalInformation.firstName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    personalInformation.lastName
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    personalInformation.email
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /phone/i }),
    personalInformation.phoneNumber
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: /chapter/i }),
    'massachusetts'
  );
  userEvent.type(
    screen.getByRole('textbox', { name: 'stripe-mocked-input-element' }),
    faker.finance.creditCardNumber()
  );

  const submitBtn = screen.getByRole('button', { name: /next/i });
  expect(submitBtn).not.toBeDisabled();
  userEvent.click(submitBtn);

  expect(
    await screen.findByText(/error processing your request. please try again/i)
  ).toBeInTheDocument();
});
