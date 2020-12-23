import React, { InputHTMLAttributes, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';
import tw from 'twin.macro';

const FormControl = styled.div`
  .phone-input-element.react-tel-input input {
    ${tw`py-2 px-3 pl-12 rounded-md bg-white border border-beige-500 focus:outline-none focus:border-blue-200 w-full leading-6 text-base h-auto`}
  }

  .flag-dropdown {
    ${tw`border border-beige-500 rounded-md rounded-r-none`}
  }
`;

const DonationPhoneInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  defaultValue,
  ...rest
}) => {
  const [value, setValue] = useState<string>(`${defaultValue}`);

  const handleOnChange = (phone: string) => {
    setValue(phone);
  };

  return (
    <FormControl className="form-control">
      <PhoneInput
        country="us"
        containerClass="phone-input-element"
        value={value}
        onChange={handleOnChange}
        inputProps={rest}
      />
    </FormControl>
  );
};

export default DonationPhoneInput;
