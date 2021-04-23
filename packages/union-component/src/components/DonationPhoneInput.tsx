import React, { InputHTMLAttributes, useState } from 'react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';
import tw from 'twin.macro';

const FormControl = styled.div`
  .phone-input-element.react-tel-input input {
    ${tw`w-full h-auto px-3 py-2 pl-12 text-base leading-6 bg-white border rounded-md border-beige-500 focus:outline-none focus:border-blue-200`}
  }

  .phone-input-element.react-tel-input input.invalid-number,
  .phone-input-element.react-tel-input .flag-dropdown.invalid-number {
    ${tw`border border-pink`}
  }

  .flag-dropdown {
    ${tw`border rounded-md rounded-r-none border-beige-500`}
  }
`;

const ErrorNode = styled.p``;

const PHONE_NUMBER_MIN_LENGTH = 10;
const E_164_PHONE_FORMAT = /^\+[1-9]\d{1,14}$/;

const isPhoneNumberValid = (phoneNumber: string) => {
  return (
    E_164_PHONE_FORMAT.test(`+${phoneNumber}`) &&
    phoneNumber.length >= PHONE_NUMBER_MIN_LENGTH
  );
};

type Props = InputHTMLAttributes<HTMLInputElement> & {
  errorComponent?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  onPhoneChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    phone: string,
    isValid: boolean
  ) => void;
};

const DonationPhoneInput: React.FC<Props> = ({
  defaultValue,
  errorComponent: ErrorMessage = ErrorNode,
  onPhoneChange = () => null,
  ...rest
}) => {
  const [value, setValue] = useState<string>(`${defaultValue}`);
  const [error, setError] = useState(false);

  const handleOnChange = (
    phone: string,
    data: unknown,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    const isValid = isPhoneNumberValid(phone);

    setValue(formattedValue);
    setError(!isValid);
    onPhoneChange(event, phone, isValid);
  };

  return (
    <>
      <FormControl className="form-control">
        <PhoneInput
          country="us"
          containerClass="phone-input-element"
          value={value}
          onChange={handleOnChange}
          isValid={isPhoneNumberValid}
          inputProps={rest}
        />
      </FormControl>
      {/* <PhoneInput /> supports defaultErrorMessage but the style is difficult to fit our needs */}
      {error && (
        <ErrorMessage role="alert">
          Invalid phone number, please check.
        </ErrorMessage>
      )}
    </>
  );
};

export default DonationPhoneInput;
