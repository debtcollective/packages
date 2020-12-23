import React from 'react';
import * as DonationWizard from './DonationWizard';

const DonationThankYou = () => {
  return (
    <DonationWizard.Container>
      <DonationWizard.Title>Hold on a bit...</DonationWizard.Title>
      <DonationWizard.Box>
        <DonationWizard.Spinner className="mb-16">
          <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
          </div>
        </DonationWizard.Spinner>
      </DonationWizard.Box>
    </DonationWizard.Container>
  );
};

export default DonationThankYou;
