import FileMetaInfo from './FileMetaInfo';
import StripePrice from './StripePrice';
import StripeProduct from './StripeProduct';

export default interface StripeCustomerProductsOwned {
  id: number;
  stripeProduct: StripeProduct;
  stripePrice: StripePrice;
  fileMetaInfo: FileMetaInfo;
}
