export  class Review {
  id: number;
  product: number;
  created_by?: {
    id: number;
    username: string;
  };
  rate: number;
  text: string;
}
