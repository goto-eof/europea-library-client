import ModelCommon from './ModelCommon';
import StripePrice from './StripePrice';

export default interface StripeProduct extends ModelCommon {
  name: string;
  description: string;
  fileMetaInfoId: number;
  stripePrice?: StripePrice;
}
