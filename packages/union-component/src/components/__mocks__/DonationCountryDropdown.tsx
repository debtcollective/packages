/**
 * This mock is intended to reduce the amount of countries to display
 * on testing mode to make easier the debugging process
 */

import React, { SelectHTMLAttributes } from 'react';
import { Input } from '../DonationWizard';

type Props = SelectHTMLAttributes<HTMLSelectElement>;

const DonationCountryDropdown: React.FC<Props> = (props) => {
  const { className = '' } = props;

  return (
    <div className="relative form-control">
      <Input
        as="select"
        id="country-dropdown"
        name="country"
        title="Country"
        defaultValue="US"
        {...props}
        className={`${className} appearance-none`}
      >
        <option value="VE">Venezuela, Bolivarian Republic of</option>
        <option value="VN">Viet Nam</option>
      </Input>
      <span
        className="material-icons pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
        style={{ display: 'flex' }}
      >
        expand_more
      </span>
    </div>
  );
};

export default DonationCountryDropdown;
