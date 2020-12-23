import React from 'react';
import faker from 'faker';
import { Story, Meta } from '@storybook/react/types-6-0';
import { DonationAddressForm } from '../components';

import { Props as DonationAddressFormProps } from '../components/DonationAddressForm';

export default {
  title: 'Example/DonationWidget'
} as Meta;

/**
 * Address form
 */
const AddressFormTemplate: Story<DonationAddressFormProps> = (args) => (
  <DonationAddressForm {...args} />
);

export const AddressForm = AddressFormTemplate.bind({});

AddressForm.args = {
  amount: faker.random.number(100),
  defaultValues: { address: '', city: '', zipCode: '', country: '' }
};
