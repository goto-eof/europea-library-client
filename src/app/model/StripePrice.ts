import ModelCommon from './ModelCommon';

export default interface StripePrice extends ModelCommon {
  currency: string;
  amount: number;
}
