import React from 'react';
import { ToggleSelector, ToggleSelectorOption } from './DonationWizard';

export interface Props {
  defaultValues: {
    activeType: 'once' | 'monthly';
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DonationTypeControl: React.FC<Props> = ({ defaultValues, onChange }) => {
  return (
    <ToggleSelector>
      <ToggleSelectorOption>
        <input
          defaultChecked={defaultValues.activeType === 'once'}
          id="donationOnce"
          name="donationType"
          onChange={onChange}
          type="radio"
          value="once"
        />
        <label htmlFor="donationOnce">Give once</label>
      </ToggleSelectorOption>
      <ToggleSelectorOption>
        <input
          defaultChecked={defaultValues.activeType === 'monthly'}
          id="donateMonthly"
          name="donationType"
          onChange={onChange}
          type="radio"
          value="monthly"
        />
        <label htmlFor="donateMonthly">Monthly</label>
      </ToggleSelectorOption>
    </ToggleSelector>
  );
};

export default DonationTypeControl;
