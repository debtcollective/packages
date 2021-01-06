import React from 'react';
import plans from '../constants/plans';
import DonationQuickOption from './DonationQuickOption';
import * as DonationWizard from './DonationWizard';

export interface Props {
  defaultValues: { amount: number };
  onSubmit: (data: { [string: string]: unknown }, formId: string) => void;
}

const DonationOnceForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const handleOnSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.persist();
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = Number(formData.get('amount'));

    onSubmit(
      { value: isNaN(value) ? formData.get('other') : value },
      e.currentTarget.id
    );
  };

  return (
    <DonationWizard.Container>
      <DonationWizard.Title>Choose an amount to give</DonationWizard.Title>
      <DonationWizard.Form id="once" onSubmit={handleOnSubmit}>
        <DonationQuickOption
          options={[...plans, 'other']}
          name="amount"
          defaultChecked={defaultValues.amount || 20}
        />
        <DonationWizard.Button type="submit">donate</DonationWizard.Button>
      </DonationWizard.Form>
    </DonationWizard.Container>
  );
};

export default DonationOnceForm;
