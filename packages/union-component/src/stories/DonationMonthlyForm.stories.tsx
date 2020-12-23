import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { DonationMonthlyForm, DonationWizard } from '../components';
import { Props as DonationMonthlyFormProps } from '../components/DonationMonthlyForm';

export default {
  title: 'Example/DonationWidget'
} as Meta;

/**
 * Donation monthly form
 */
const MonthlyFormTemplate: Story<DonationMonthlyFormProps> = (args) => (
  <DonationWizard.Container>
    <DonationWizard.Title>
      Choose an amount to pay per month
    </DonationWizard.Title>
    <DonationMonthlyForm {...args} />
  </DonationWizard.Container>
);

export const MonthlyForm = MonthlyFormTemplate.bind({});

MonthlyForm.args = {
  defaultValues: { amount: 20 }
};
