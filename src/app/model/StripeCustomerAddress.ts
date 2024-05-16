import ModelCommon from './ModelCommon';

export default interface StripeCustomerAddress extends ModelCommon {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  line1: string;
  line2: string;
}
