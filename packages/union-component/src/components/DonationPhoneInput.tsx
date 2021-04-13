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

const DonationPhoneInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  defaultValue,
  ...rest
}) => {
  const [value, setValue] = useState<string>(`${defaultValue}`);

  const handleOnChange = (phone: string) => setValue(phone);

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
