import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { DonationTypeControl } from '../components';
import { Props as DonationTypeControlProps } from '../components/DonationTypeControl';

export default {
  title: 'Example/DonationWidget'
} as Meta;

const TypeControlTemplate: Story<DonationTypeControlProps> = (args) => (
  <DonationTypeControl {...args} />
);

export const TypeControl = TypeControlTemplate.bind({});

TypeControl.args = {
  defaultValues: { activeType: 'once' }
};
