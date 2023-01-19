import React, { InputHTMLAttributes, useState } from 'react';

import 'react-phone-number-input/style.css';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import styled from 'styled-components';
import tw from 'twin.macro';

// Allow to better understand when phone is being passed as intended E164 string
type stringE164 = string;

const FormControl = styled.div`
  .PhoneInput {
    ${tw`relative`}
  }

  .PhoneInputCountry {
    ${tw`absolute top-0 left-0 h-full pl-3`}
    --PhoneInputCountryFlag-borderColor--focus: #03a9f4; // blue-100
    --PhoneInputCountrySelectArrow-color--focus: #03a9f4;
  }

  .PhoneInputInput {
    ${tw`w-full h-auto p-3 text-base leading-6 bg-white border rounded-md pl-phoneInputLeft border-beige-500 focus:outline-none focus:border-blue-100`}
  }

  .input-error .PhoneInputInput {
    ${tw`border border-pink`}
  }
`;

const ErrorNode = styled.p``;

const isPhoneNumberValid = (phoneNumber: stringE164) => {
  // Avoid console error when input text is cleared
  if (!phoneNumber) return false;

  // https://gitlab.com/catamphetamine/react-phone-number-input#ispossiblephonenumbervalue-string-boolean
  return isPossiblePhoneNumber(phoneNumber);
};

type Props = InputHTMLAttributes<HTMLInputElement> & {
  errorComponent?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  onPhoneChange?: (phone: stringE164, isValid: boolean) => void;
};

const DonationPhoneInput: React.FC<Props> = ({
  errorComponent: ErrorMessage = ErrorNode,
  onPhoneChange = () => null,
  name,
  defaultValue,
  required,
  title
}) => {
  const [value, setValue] = useState<stringE164>(`${defaultValue}`);
  const [error, setError] = useState(false);

  const handleOnChange = (phone: stringE164) => {
    const isValid = isPhoneNumberValid(phone);

    setValue(phone);
    setError(!isValid);
    onPhoneChange(phone, isValid);
  };

  return (
    <>
      <FormControl className="form-control">
        <PhoneInput
          defaultCountry="US"
          placeholder="Enter phone number"
          value={value}
          onChange={handleOnChange}
          onFocus={() => setError(false)}
          className={error ? 'input-error' : ''}
          name={name}
          required={required}
          title={title}
        />
      </FormControl>
      {error && (
        <ErrorMessage role="alert">
          Invalid phone number, please check.
        </ErrorMessage>
      )}
    </>
  );
};

export default DonationPhoneInput;
