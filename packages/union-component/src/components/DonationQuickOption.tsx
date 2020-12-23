import React, { useRef, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { ErrorText, Input } from './DonationWizard';

export interface Props {
  name: string;
  options: Array<number | 'other'>;
  defaultChecked?: number;
  suffix?: string;
}

const currencyFormat = (
  number: number,
  { currency } = { currency: 'USD' }
): string => {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency
  })
    .format(number)
    .replace(/\.00/g, '');
};

const getCurrencySymbol = ({ currency } = { currency: 'USD' }): string => {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency
  })
    .format(0)
    .charAt(0);
};

const DonationQuickOption: React.FC<Props> = ({
  options,
  name,
  defaultChecked,
  suffix = 'USD'
}) => {
  const [error, setError] = useState(false);
  const groups = Math.ceil(options.length / 3);
  const rows = Array(groups)
    .fill('')
    .map((_, i) => options.slice(i * 3, (i + 1) * 3));

  const inputOther = useRef<HTMLInputElement>(null);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id.includes('other') && inputOther.current) {
      inputOther.current.focus();
    }
  };

  const onChangeOtherValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(Number(e.target.value) > 50000);
  };

  return (
    <QuickOptionContainer>
      {rows.map((row, i) => (
        <QuickOptionRow key={`row-${i}`}>
          {row.map((option) => {
            return (
              <QuickOption key={`key-${option}`}>
                <input
                  className="absolute w-full h-full"
                  defaultChecked={option === defaultChecked}
                  id={`option-${option}`}
                  name={name}
                  type="radio"
                  value={option}
                  onChange={handleOnChange}
                />
                {option === 'other' && (
                  <div id="option-other-input" className="relative w-full">
                    <Input
                      className="h-full text-sm"
                      min="5"
                      max="50000"
                      name="other"
                      placeholder="Other"
                      onChange={onChangeOtherValue}
                      ref={inputOther}
                      step="5"
                      title="Other"
                      type="number"
                      style={{ paddingLeft: '1.5rem' }}
                    />
                    <span className="absolute top-0 left-0 flex items-center h-full p-0 px-3 text-gray-500">
                      {getCurrencySymbol()}
                    </span>
                  </div>
                )}
                <label
                  className={`text-sm label-${option}`}
                  htmlFor={`option-${option}`}
                >
                  {option === 'other' ? `Other amount` : currencyFormat(option)}{' '}
                  <span className="block text-gray-300 normal-case text-xss sm:inline-block">
                    {option === 'other' ? '' : suffix}
                  </span>
                </label>
              </QuickOption>
            );
          })}
        </QuickOptionRow>
      ))}
      {error && (
        <ErrorText>
          We are only able to process up to $50,000 online. Want to donate more?{' '}
          <a
            className="underline text-primary"
            href="mailto:admin@debtcollective.org"
          >
            contact us
          </a>
        </ErrorText>
      )}
    </QuickOptionContainer>
  );
};

export default DonationQuickOption;

const QuickOptionRow = styled.div`
  ${tw`flex flex-wrap justify-between mt-1 -ml-1 sm:-ml-2 sm:mt-2`}
`;

const QuickOption = styled.div`
  ${tw`relative flex items-center w-1/3 ml-1 last:flex-1 sm:ml-2`}

  label {
    ${tw`block w-full px-3 py-3 text-center border rounded-md cursor-pointer bg-white-100 border-beige-500 focus:border-blue-200 focus:outline-none`}
  }

  .label-other {
    ${tw`flex items-center justify-center`}
  }

  input {
    ${tw`appearance-none`}

    &:checked + label {
      ${tw`bg-blue-200 border-blue-200`}
    }
  }

  #option-other {
    &-input {
      ${tw`hidden mt-0`}
    }

    &:checked ~ label {
      ${tw`hidden`}
    }

    &:checked ~ #option-other-input {
      ${tw`block`}
    }
  }
`;

const QuickOptionContainer = styled.div`
  ${QuickOptionRow}:firt-child {
    ${tw`mt-0`}
  }
`;
