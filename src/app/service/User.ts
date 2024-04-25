import Authority from './Authority';

export default interface User {
  id: number;
  username: string;
  email: string;
  authorityList: Array<Authority>;
}
