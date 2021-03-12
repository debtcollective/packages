import React from 'react';
import faker from 'faker';
import { Story, Meta } from '@storybook/react/types-6-0';
import { DonationPaymentForm } from '../components';
import { Props as DonationPaymentFormProps } from '../components/DonationPaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default {
  title: 'Example/DonationWidget'
} as Meta;

const PaymentFormTemplate: Story<DonationPaymentFormProps> = (args) => {
  const stripePublicToken =
    typeof window !== 'undefined' && (window as any).DC_STRIPE_PUBLIC_TOKEN;

  return (
    <Elements stripe={loadStripe(stripePublicToken)}>
      <DonationPaymentForm {...args} />
    </Elements>
  );
};

export const PaymentForm = PaymentFormTemplate.bind({});

PaymentForm.args = {
  amount: faker.random.number(100),
  defaultValues: { firstName: '', lastName: '', email: '', phoneNumber: '' },
  onSubmit: (data) => {
    alert('Check your console to see submitted data');
    console.log('PaymentForm submit', data);
  },
  tokenData: {
    address_country: 'US',
    address_zip: '32829',
    name: 'Jane Doe'
  }
};
