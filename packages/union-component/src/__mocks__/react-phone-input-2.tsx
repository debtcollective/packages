import React from 'react';

/**
 * NOTE: the API of the phone input differs a lot from a normal input
 * ideally, we shouldn't mock this, but when running the test cases there is an issue
 * when using onChange prop https://github.com/bl00mber/react-phone-input-2/issues/262
 * https://github.com/bl00mber/react-phone-input-2/blob/9deb73afdde6d631ab6e7af9544a31a9ff176b3b/src/index.js#L462
 *
 * Check the full API of phone input at
 * ./node_modules/react-phone-input-2/index.d.ts
 * https://github.com/bl00mber/react-phone-input-2
 */
const PhoneInput = ({ containerClass, isValid, onChange, inputProps }: any) => {
  return (
    <div className={containerClass}>
      <input
        id="react-phone-input-2__PhoneInput__mock"
        name="phone-number"
        required
        title="Contact phone number"
        {...inputProps}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const phone = event.target.value.replace(/\D/g, '');
          const data = {};
          const formattedValue = `+${phone}`;
          onChange(phone, data, event, formattedValue);
          isValid(phone, 'JEST');
        }}
      />
    </div>
  );
};

export default PhoneInput;
