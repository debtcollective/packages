import {
  CreateTokenCardData,
  loadStripe,
  StripeCardElementChangeEvent
} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React, { useState, useEffect, useCallback } from 'react';
import * as DonationWizard from './DonationWizard';
import StripeCardInput, { DonationPaymentProvider } from './StripeCardInput';
import DonationDropdown from './DonationDropdown';
import DonationPhoneInput from './DonationPhoneInput';
import chapters from '../constants/chapters';
import { DEFAULT_ERROR } from '../constants/errors';
import { environmentSetup } from '../utils/config';

export interface Props {
  amount: number;
  errors?: string[] | null;
  defaultValues: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    mobileConsent?: boolean;
    email: string;
  };
  hasChapterSelection?: boolean;
  onEditAmount: () => void;
  onSubmit: (
    data: { [string: string]: unknown },
    paymentProvider?: DonationPaymentProvider
  ) => void;
  tokenData: CreateTokenCardData;
}

const DonationPaymentForm: React.FC<Props> = ({
  amount,
  defaultValues,
  errors = null,
  hasChapterSelection,
  onEditAmount,
  onSubmit,
  tokenData
}) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [
    paymentProvider,
    setPaymentProvider
  ] = useState<DonationPaymentProvider>();
  const [cardCompleted, setCardCompleted] = useState(false);
  const [formData, setFormData] = useState<{
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    mobileConsent?: boolean;
  }>({
    ...defaultValues
  });
  const errorMessage = errors?.join(' ');

  useEffect(() => {
    const { email, firstName, lastName, phoneNumber } = formData;
    const readyToSubmit = Boolean(
      paymentProvider && cardCompleted && Object.values(
        { email, firstName, lastName, phoneNumber }
      ).every(Boolean)
    );
    setIsSubmitDisabled(!readyToSubmit);
  }, [paymentProvider, formData, cardCompleted]);

  const handleOnSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.persist();
    e.preventDefault();

    const token = await getStripeToken();

    const data = {
      ...formData,
      stripeToken: token
    };

    onSubmit(data, paymentProvider);
  };

  const getStripeToken = async () => {
    if (amount === 0) return;

    if (!paymentProvider || !paymentProvider.card) {
      console.error('Error trying to submit payment form', paymentProvider);
      return;
    }
    const { token: stripeToken } = await paymentProvider.stripe.createToken(
      paymentProvider.card,
      tokenData
    );

    return stripeToken;
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onChangeInputCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(state => ({ ...state, [e.target.name]: e.target.checked }));
  };

  const onChangeInputPhone = (phone: string, isValid: boolean) => {
    // Make easier the validation on this component without knowing the format
    const phoneNumber = isValid ? phone : '';

    setFormData((state) => ({ ...state, phoneNumber }));
  };


  const onChangeInputCardElement = (
    e: StripeCardElementChangeEvent,
    pProvider?: DonationPaymentProvider
  ) => {
    if (e.complete) {
      setPaymentProvider(pProvider);
    }

    setCardCompleted(e.complete);
  };

  const stripePublicToken = environmentSetup.DC_STRIPE_PUBLIC_TOKEN;

  return (
    <DonationWizard.Container>
      <DonationWizard.Title>
        {`Paying $${amount}`}{' '}
        <DonationWizard.Button variant="transparent" onClick={onEditAmount}>
          (edit amount)
        </DonationWizard.Button>
      </DonationWizard.Title>
      <DonationWizard.Form onSubmit={handleOnSubmit}>

        <DonationWizard.Input
          onChange={onChangeInput}
          defaultValue={defaultValues.firstName}
          name="firstName"
          placeholder="Jane"
          required
          title="Card owner first name"
        />
        <DonationWizard.Input
          onChange={onChangeInput}
          defaultValue={defaultValues.lastName}
          name="lastName"
          placeholder="Doe"
          required
          title="Card owner last name"
        />
        <DonationWizard.Input
          onChange={onChangeInput}
          defaultValue={defaultValues.email}
          name="email"
          type="email"
          placeholder="jane.doe@debtcollective.org"
          required
          title="Contact email"
        />
        <DonationPhoneInput
          defaultValue={defaultValues.phoneNumber}
          errorComponent={DonationWizard.ErrorText}
          onPhoneChange={onChangeInputPhone}
          name="phoneNumber"
          required
          title="Contact phone number"
        />
        {defaultValues.mobileConsent !== undefined && (
          <DonationWizard.CheckboxWrapper className="form-control">
            <DonationWizard.Checkbox 
              name="mobileConsent"
              onChange={onChangeInputCheckbox}
            />
            <label>By entering your phone number and checking this box you are subscribing to receive mobile alerts from The Debt Collective about this and future actions.</label>
          </DonationWizard.CheckboxWrapper>
        )}
        {hasChapterSelection ? (
          <DonationDropdown
            id="chapter-dropdown"
            name="chapter"
            title="Select your related chapter"
            required
            defaultValue=""
          >
            <option disabled hidden value="">
              Are you part of a local chapter?{' '}
            </option>
            {chapters.map((chapter) => (
              <option key={chapter.value} value={chapter.value}>
                {chapter.label}
              </option>
            ))}
          </DonationDropdown>
        ) : null}
        {amount !== 0 ? (
          <Elements stripe={loadStripe(stripePublicToken)}>
            <StripeCardInput onChange={onChangeInputCardElement} />
          </Elements>
        ) : null}
        {errors !== null ? (
          <DonationWizard.ErrorText role="alert">
            {errorMessage || DEFAULT_ERROR}
          </DonationWizard.ErrorText>
        ) : null}
        <DonationWizard.Button
          type="submit"
          disabled={isSubmitDisabled && amount !== 0}
        >
          next step
        </DonationWizard.Button>
      </DonationWizard.Form>
    </DonationWizard.Container>
  );
};

export default DonationPaymentForm;
