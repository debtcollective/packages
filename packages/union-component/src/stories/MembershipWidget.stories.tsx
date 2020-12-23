import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { MembershipWidget as Widget, MembershipWidgetProps } from '..';

export default {
  title: 'Example/DonationWidget'
} as Meta;

/**
 * Showcase the widget composition with all forms
 */
const MembershipWidgetTemplate: Story<MembershipWidgetProps> = (args) => (
  <Widget {...args} />
);

export const MembershipWidget = MembershipWidgetTemplate.bind({});

MembershipWidget.args = {
  id: 'union-widget'
};
