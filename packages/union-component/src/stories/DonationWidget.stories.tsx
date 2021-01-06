import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { DonationWidget as Widget, DonationWidgetProps } from '../';

export default {
  title: 'Example/DonationWidget'
} as Meta;

/**
 * Showcase the widget composition with all forms
 */
const DonationWidgetTemplate: Story<DonationWidgetProps> = (args) => (
  <Widget {...args} />
);

export const DonationWidget = DonationWidgetTemplate.bind({});

DonationWidget.args = {
  id: 'donation-widget'
};
