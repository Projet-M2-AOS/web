export type Order = {
  _id: string;
  user: string;
  address: string;
  products: string[];
  price: number;
  paymentState: string;
};
