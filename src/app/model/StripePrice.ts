import ModelCommon from './ModelCommon';
import StripeProduct from './StripeProduct';

export default interface StripePrice extends ModelCommon {
  currency: string;
  amount: number;
  stripeProduct: StripeProduct;
}
