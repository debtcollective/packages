import React, { useState, useRef } from 'react';
import debtTypes from '../constants/debtTypes';
import tw from 'twin.macro';
import styled from 'styled-components';
import * as DonationWizard from './DonationWizard';

export interface Props {
  amount: number;
  defaultValues: {
    student: boolean,
    medical: boolean,
    housing: boolean,
    carceral: boolean,
    utility: boolean,
    credit: boolean,
    other: string,
    none: boolean
  },
  onEditAmount: () => void;
  onSubmit: (data: { [string: string]: unknown }) => void;
};

const DebtInformationForm: React.FC<Props> = ({
  amount,
  defaultValues,
  onEditAmount,
  onSubmit
}) => {

  const [error, setError] = useState(false);
  const [formData, setFormData] = useState<{
    student: boolean;
    medical: boolean;
    housing: boolean;
    carceral: boolean;
    utility: boolean;
    credit: boolean;
    other: string;
    none: boolean
  }>({
    ...defaultValues
  });
  const [otherCustom, setOtherCustom] = useState('');

  const isFormComplete = (): boolean => Object.values(formData).some(Boolean);
  const checkboxValues: { [key: string]: any } = {...formData};

  const handleOnSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.persist();
    e.preventDefault();

    if (!isFormComplete()) {
      setError(true);
    } else {
      onSubmit({
        ...formData,
        other: formData.other ? otherCustom : ''
      });
    };
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {name, checked} = e.target;
    setFormData(state => ({
      ...state, 
      none: false,
      [name]: checked
    }));
    if (checked)  setError(false);
  };

  const onChangeOther = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {value} = e.target;
    setOtherCustom(() => value);
  };
  
  const toggleNone = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {checked} = e.target;
    setFormData(state => ({
      student: false,
      medical: false,
      housing: false,
      carceral: false,
      utility: false,
      credit: false,
      other: '',
      none: checked
    }));
  };

  return (
    <DonationWizard.Container>
      <DonationWizard.Title>
        {`Paying $${amount}`}{' '}
        <DonationWizard.Button variant="transparent" onClick={onEditAmount}>
          (edit amount)
        </DonationWizard.Button>
      </DonationWizard.Title>
      <p className="p-2 pb-0 sm:px-6 text-center font-bold">What debt types do you have and/or what are you interested in? (check all that apply)</p>
      <form onSubmit={handleOnSubmit} className='grid grid-cols-2 p-2 pb-3 sm:px-6 relative'>
        {debtTypes.map(({label, value}, i)  => (
          <DonationWizard.CheckboxWrapper key={i}>
            <DonationWizard.Checkbox
              name={value} id={value}
              checked={checkboxValues[value]}
              onChange={
                value === 'none'
                  ? toggleNone
                  : onChangeInput
              }
            />
            <label>{label}</label>
          </DonationWizard.CheckboxWrapper>
        ))}
        <div
          className={`col-span-2 transition-all ease-in-out duration-200 ${
            formData.other ? 'visible opacity-100 py-2': 'invisible opacity-0 py-0'
          }`}
        >
          <DonationWizard.Input
            className="h-full text-sm"
            name="other-custom"
            placeholder="Enter other type of debt you have"
            onChange={onChangeOther}
            required={Boolean(formData.other)}
            type="text"
          />
        </div>
        <DonationWizard.ErrorText
          role="alert"
          className={`text-center col-span-2 absolute w-full ${
            error ? 'visible' : 'invisible'
          }`}
          style={{
            fontSize: '0.875rem',
            bottom: '4rem'
          }}
        >
          Select at least one option to continue
        </DonationWizard.ErrorText>
        <DonationWizard.Button type="submit" className='col-span-2'>next step</DonationWizard.Button>
      </form>
    </DonationWizard.Container>
  );
};

export default DebtInformationForm;
