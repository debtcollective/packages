import { environmentSetup } from './config';

export interface IFund {
  id: unknown;
  name: string;
}

export const getDonationFunds = async () => {
  try {
    const data = await fetch(environmentSetup.DC_FUNDS_API_URL);
    const funds: IFund[] = await data.json();

    return funds;
  } catch (error) {
    console.error(error);
  }
};
