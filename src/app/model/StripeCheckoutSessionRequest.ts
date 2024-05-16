export default interface StripeCheckoutSessionRequest {
  fileMetaInfoId: number;
  checkoutBaseUrl: string;
  quantity: number;
}
