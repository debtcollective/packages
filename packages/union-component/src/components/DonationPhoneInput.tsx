import React, { InputHTMLAttributes, useState } from 'react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';
import tw from 'twin.macro';

const FormControl = styled.div`
  .phone-input-element.react-tel-input input {
    ${tw`w-full h-auto px-3 py-2 pl-12 text-base leading-6 bg-white border rounded-md border-beige-500 focus:outline-none focus:border-blue-200`}
  }

  .flag-dropdown {
    ${tw`border rounded-md rounded-r-none border-beige-500`}
  }
`;

const ErrorNode = styled.p``;

const PHONE_NUMBER_MIN_LENGTH = 10;
const E_164_PHONE_FORMAT = /^\+[1-9]\d{1,14}$/;

const isPhoneNumberValid = (phoneNumber: string) => {
  const formattedNumber = phoneNumber.replace(/\s/g, '');

  return (
    E_164_PHONE_FORMAT.test(formattedNumber) &&
    formattedNumber.length >= PHONE_NUMBER_MIN_LENGTH
  );
};

type Props = InputHTMLAttributes<HTMLInputElement> & {
  errorComponent: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
};

const DonationPhoneInput: React.FC<Props> = ({
  defaultValue,
  errorComponent: ErrorMessage = ErrorNode,
  ...rest
}) => {
  const [value, setValue] = useState<string>(`${defaultValue}`);
  const [error, setError] = useState('');

  const handleOnChange = (phone: string) => {
    if (!isPhoneNumberValid(phone)) {
      setError('You need to enter a valid phone number');
    } else {
      setError('');
    }

    setValue(phone);
  };

  return (
    <>
      <FormControl className="form-control">
        <PhoneInput
          country="us"
          containerClass="phone-input-element"
          value={value}
          onChange={handleOnChange}
          inputProps={rest}
        />
      </FormControl>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
    </>
  );
};

export default DonationPhoneInput;
