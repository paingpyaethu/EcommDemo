interface IOrderDataResType {
  success: boolean;
  data: IOrderData[];
}

interface IOrderData {
  id: number;
  userId: number;
  name: string;
  price: number;
  totalPrice: number;
  address: string;
  status: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  items: IOrderItemsData[]
}

interface IOrderItemsData {
  id: number;
  color: string;
  size: string;
  quantity: number;
  orderId: number;
}
