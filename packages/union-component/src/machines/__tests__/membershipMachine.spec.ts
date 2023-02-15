/* eslint-disable @typescript-eslint/ban-ts-comment */
import faker from 'faker';
import membershipMachine, {
  AddressData,
  MINIMAL_DONATION,
  PaymentServices,
  PersonalData,
  DebtData
} from '../membershipMachine';

// Convenient alias for better suite reading
const machine = membershipMachine;

test('goes into process membership state after filling all information', () => {
  const personalInformation: PersonalData = {
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email('bot', '', 'debtcollective.org'),
    phoneNumber: faker.phone.phoneNumber('+# ### ### ####'),
    mobileConsent: false,
    chapter: 'massachusetts'
  };

  const addressInformation: AddressData = {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    zipCode: faker.address.zipCode(),
    country: faker.address.country()
  };

  const debtInformation: DebtData = {
    student: true, medical: true, housing: false, carceral: false,
    utility: false, credit: false, other: '', none: false
  };

  const paymentServices: PaymentServices = {
    // @ts-ignore No need to create real stripe instance
    stripe: { id: 'fake-stripe' },
    // @ts-ignore No need to create real stripe token
    stripeToken: { id: 'fake-stripe-token' }
  };

  let machineState = machine.initialState;

  // Enter to the card information form
  let action = { type: 'NEXT', data: { value: MINIMAL_DONATION } };
  machineState = machine.transition(machineState, action);

  // Enter to address information form
  // @ts-ignore TODO: solve issue with TS event definition
  action = { type: 'NEXT', data: addressInformation };
  machineState = machine.transition(machineState, action);

  // Enter to debt information form
  // @ts-ignore TODO: solve issue with TS event definition
  action = { type: 'NEXT', data: debtInformation };
  machineState = machine.transition(machineState, action);

  // Enter to personal information form
  // @ts-ignore TODO: solve issue with TS event definition
  action = {
    type: 'NEXT',
    // @ts-ignore
    data: { ...personalInformation, ...paymentServices }
  };
  machineState = machine.transition(machineState, action);

  expect(machineState.context).toEqual({
    addressInformation,
    debtInformation,
    personalInformation: {
      ...personalInformation,
      phoneNumber: personalInformation.phoneNumber.replace(/ /g, '')
    },
    api: {
      donation: undefined,
      error: undefined
    },
    donationType: 'month',
    donationMonthlyAmount: MINIMAL_DONATION,
    paymentServices: {
      stripe: { id: 'fake-stripe' },
      stripeToken: { id: 'fake-stripe-token' }
    }
  });
  expect(machineState.value).toEqual('processMembership');
});
