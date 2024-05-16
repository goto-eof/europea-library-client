import ModelCommon from './ModelCommon';
import StripeCustomerAddress from './StripeCustomerAddress';

export default interface StripeCustomer extends ModelCommon {
  firstName: string;
  lastName: string;
  email: string;
  currentStripeCustomerAddress?: StripeCustomerAddress;
}
