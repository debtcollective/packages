import React from 'react';
import faker from 'faker';
import { Story, Meta } from '@storybook/react/types-6-0';
import { DebtInformationForm as DebtInfoFormComponent } from '../components';

import { Props as DebtInfoFormProps } from '../components/DebtInformationForm';

export default {
  title: 'Example/DonationWidget'
} as Meta;

/**
 * Debt Types
 */
const DebtInfoFormTemplate: Story<DebtInfoFormProps> = args => (
  <DebtInfoFormComponent {...args} />
);

export const DebtInfoForm = DebtInfoFormTemplate.bind({});

DebtInfoForm.args = {
  amount: faker.random.number(100),
  defaultValues: { 
    student: false,
    medical: false,
    housing: false,
    carceral: false,
    utility: false,
    credit: false,
    other: false,
    none: false
  }
};
