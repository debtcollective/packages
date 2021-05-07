import React, { SelectHTMLAttributes, useEffect, useState } from 'react';
import DonationDropdown from './DonationDropdown';
import { getDonationFunds, IFund } from '../utils/funds';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  onFundsLoaded: (fund: number) => void;
}

const DonationFundDropdown: React.FC<Props> = ({
  id,
  name,
  onChange,
  onFundsLoaded,
  required,
  value
}) => {
  const [options, setOptions] = useState<IFund[]>([]);

  useEffect(() => {
    const getOptions = async () => {
      const funds = await getDonationFunds();

      if (funds?.length) {
        setOptions(funds);
        onFundsLoaded(Number(funds[0].id));
      }
    };

    getOptions();
  }, [onFundsLoaded]);

  return (
    <>
      <label htmlFor={id} className="block mb-2 text-gray-100">
        Would you like to donate to a specific fund?
      </label>
      <DonationDropdown
        id={id}
        onChange={onChange}
        required={required}
        value={value}
        name={name}
      >
        {options.map((option) => (
          <option value={String(option.id)} key={String(option.id)}>
            {option.name}
          </option>
        ))}
      </DonationDropdown>
    </>
  );
};

export default DonationFundDropdown;
