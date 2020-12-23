import React from 'react';
import * as DonationWizard from './DonationWizard';

export interface Props {
  children: React.ReactNode;
}

const DonationThankYou: React.FC<Props> = ({ children }) => {
  return (
    <DonationWizard.Container>
      <DonationWizard.Title>We&apos;ve gotten your help!</DonationWizard.Title>
      <DonationWizard.Box>
        <span className="material-icons" style={{ fontSize: '4rem' }}>
          check_circle_outline
        </span>
        {children}
      </DonationWizard.Box>
    </DonationWizard.Container>
  );
};

export default DonationThankYou;
