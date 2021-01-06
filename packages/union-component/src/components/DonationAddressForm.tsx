import React from 'react';
import DonationCountryDropdown from './DonationCountryDropdown';
import * as DonationWizard from './DonationWizard';

export interface Props {
  amount: number;
  defaultValues: {
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  onEditAmount: () => void;
  onSubmit: (data: { [string: string]: unknown }) => void;
}

const DonationAddressForm: React.FC<Props> = ({
  amount,
  defaultValues,
  onEditAmount,
  onSubmit
}) => {
  const handleOnSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.persist();
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      address: formData.get('address'),
      city: formData.get('city'),
      zipCode: formData.get('zipCode'),
      country: formData.get('country')
    };

    onSubmit(data);
  };

  return (
    <DonationWizard.Container>
      <DonationWizard.Title>
        {`Paying ${amount}$`}{' '}
        <DonationWizard.Button variant="transparent" onClick={onEditAmount}>
          (edit amount)
        </DonationWizard.Button>
      </DonationWizard.Title>
      <DonationWizard.Form onSubmit={handleOnSubmit}>
        <DonationWizard.Input
          defaultValue={defaultValues.address}
          name="address"
          placeholder="Billing address"
          required
          title="Full street billing address"
        />
        <DonationWizard.Input
          defaultValue={defaultValues.city}
          name="city"
          placeholder="City"
          required
          title="City for your billing address"
        />
        <DonationWizard.Input
          className="appearance-none"
          defaultValue={defaultValues.zipCode}
          name="zipCode"
          placeholder="Zip code"
          required
          title="Zip code for your billing address"
        />
        <DonationCountryDropdown
          defaultValue={defaultValues.country || 'US'}
          name="country"
          required
          title="Country"
        />
        <DonationWizard.Button type="submit">next step</DonationWizard.Button>
      </DonationWizard.Form>
    </DonationWizard.Container>
  );
};

export default DonationAddressForm;
