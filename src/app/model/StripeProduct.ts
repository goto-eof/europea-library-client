import ModelCommon from './ModelCommon';

export default interface StripeProduct extends ModelCommon {
  name: string;
  description: string;
  fileMetaInfoId: number;
}
