interface IProductsResType {
  success: boolean;
  data: IProductsData[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}

interface IProductsData {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: ICategoryData;
}

interface ICategoriesResType {
  success: boolean;
  data: ICategoryData[];
}
interface ICategoryData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
