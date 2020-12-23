import donationMachine, { MINIMAL_DONATION } from '../donationMachine';
import faker from 'faker';

// Convenient alias for better suite reading
const machine = donationMachine;

test('starts using one time donation with minimal amount', () => {
  expect(machine.initialState.context).toEqual(
    expect.objectContaining({
      donationType: 'once',
      donationOnceAmount: MINIMAL_DONATION,
      donationMonthlyAmount: MINIMAL_DONATION
    })
  );
});

describe('when triggering "UPDATE.AMOUNT.*"', () => {
  it('updates donation amount within "one time donation" amount form', () => {
    const newAmount = faker.random.number(20);
    let machineState = machine.initialState;
    machineState = machine.transition(machineState, {
      type: 'UPDATE.AMOUNT.ONCE',
      value: newAmount
    });

    expect(machineState.value).toEqual({ amountForm: 'donateOnce' });
    expect(machineState.context).toEqual(
      expect.objectContaining({
        donationOnceAmount: newAmount
      })
    );
  });

  it('updates donation amount within "monthly donation" amount form', () => {
    const newAmount = faker.random.number(20);
    let machineState = machine.initialState;
    machineState = machine.transition(machineState, 'START.MONTHLY');
    machineState = machine.transition(machineState, {
      type: 'UPDATE.AMOUNT.MONTHLY',
      value: newAmount
    });

    expect(machineState.value).toEqual({ amountForm: 'donateMonthly' });
    expect(machineState.context).toEqual(
      expect.objectContaining({
        donationMonthlyAmount: newAmount
      })
    );
  });
});

describe('when toggling donation type', () => {
  it('updates context with "monthly" and minimal amount', () => {
    let machineState = machine.initialState;
    machineState = machine.transition(machineState, 'START.MONTHLY');

    expect(machineState.context).toEqual(
      expect.objectContaining({
        donationType: 'monthly',
        donationOnceAmount: MINIMAL_DONATION,
        donationMonthlyAmount: MINIMAL_DONATION
      })
    );
  });

  it('updates context with "once" and minimal amount', () => {
    let machineState = machine.initialState;
    machineState = machine.transition(machineState, 'START.MONTHLY');
    machineState = machine.transition(machineState, 'START.ONCE');

    expect(machineState.context).toEqual(
      expect.objectContaining({
        donationType: 'once',
        donationOnceAmount: MINIMAL_DONATION,
        donationMonthlyAmount: MINIMAL_DONATION
      })
    );
  });
});

test('goes into process donation after filling all information', () => {
  const cardInformation = {
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email('bot', '', 'debtcollective.org'),
    phoneNumber: faker.phone.phoneNumber()
  };

  const billingInformation = {
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    zipCode: faker.address.zipCode(),
    country: faker.address.country()
  };

  const paymentServices = {
    stripe: { id: 'fake-stripe' },
    stripeToken: { id: 'fake-stripe-token' }
  };

  const donationAmount = faker.random.number(100);

  // TODO: gather events to happen on NEXT instead using diff event for each edition
  let machineState = machine.initialState;
  // Edit amount and move next
  machineState = machine.transition(machineState, {
    type: 'UPDATE.AMOUNT.ONCE',
    value: donationAmount
  });
  machineState = machine.transition(machineState, 'NEXT');
  // Edit address and move next
  machineState = machine.transition(machineState, {
    type: 'NEXT',
    ...billingInformation
  });
  // Edit payment information internals and move next
  machineState = machine.transition(machineState, {
    type: 'UPDATE.PAYMENT.SERVICE',
    ...paymentServices
  });
  machineState = machine.transition(machineState, {
    type: 'NEXT',
    ...cardInformation
  });

  expect(machineState.value).toEqual('processDonation');

  expect(machineState.context).toEqual({
    billingInformation,
    cardInformation,
    donation: {
      message: '',
      status: '',
      errors: null
    },
    donationType: 'once',
    donationOnceAmount: donationAmount,
    donationMonthlyAmount: MINIMAL_DONATION,
    paymentServices
  });
});
