import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { DonationOnceForm } from '../components';
import { Props as DonationOnceFormProps } from '../components/DonationOnceForm';

export default {
  title: 'Example/DonationWidget'
} as Meta;

/**
 * Donation once form
 */
const OnceFormTemplate: Story<DonationOnceFormProps> = (args) => (
  <DonationOnceForm {...args} />
);

export const OnceForm = OnceFormTemplate.bind({});

OnceForm.args = {
  defaultValues: { amount: 5 },
  onSubmit: (data) => alert(JSON.stringify(data))
};
