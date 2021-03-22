import {
  CreateTokenCardData,
  loadStripe,
  StripeCardElementChangeEvent
} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import * as DonationWizard from './DonationWizard';
import StripeCardInput, { DonationPaymentProvider } from './StripeCardInput';
import DonationDropdown from './DonationDropdown';
import DonationPhoneInput from './DonationPhoneInput';
import chapters from '../constants/chapters';
import { DEFAULT_ERROR } from '../constants/errors';
import { environmentSetup } from '@utils/config';

export interface Props {
  amount: number;
  errors?: string[] | null;
  defaultValues: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
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
  errors = null,
  defaultValues,
  hasChapterSelection,
  onEditAmount,
  onSubmit,
  tokenData
}) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [paymentProvider, setPaymentProvider] = useState<
    DonationPaymentProvider | undefined
  >();
  const errorMessage: string | undefined = errors?.join(' ');

  const handleOnSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.persist();
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let token;

    if (amount !== 0) {
      if (!paymentProvider || !paymentProvider.card) {
        console.error('Error trying to submit payment form', paymentProvider);
        return;
      }
      const { token: stripeToken } = await paymentProvider.stripe.createToken(
        paymentProvider.card,
        tokenData
      );

      token = stripeToken;
    }

    const data = {
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      email: formData.get('email'),
      phoneNumber: formData.get('phone-number'),
      chapter: formData.get('chapter'),
      stripeToken: token
    };

    onSubmit(data, paymentProvider);
  };

  const onChangeInputCardElement = (
    e: StripeCardElementChangeEvent,
    pProvider?: DonationPaymentProvider
  ) => {
    if (e.complete) {
      setPaymentProvider(pProvider);
    }
    setIsSubmitDisabled(!e.complete);
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
          defaultValue={defaultValues.firstName}
          name="first-name"
          placeholder="Jane"
          required
          title="Card owner first name"
        />
        <DonationWizard.Input
          defaultValue={defaultValues.lastName}
          name="last-name"
          placeholder="Doe"
          required
          title="Card owner last name"
        />
        <DonationWizard.Input
          defaultValue={defaultValues.email}
          name="email"
          type="email"
          placeholder="jane.doe@debtcollective.org"
          required
          title="Contact email"
        />
        <DonationPhoneInput
          defaultValue={defaultValues.phoneNumber}
          name="phone-number"
          required
          title="Contact phone number"
        />
        {hasChapterSelection && (
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
        )}
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
