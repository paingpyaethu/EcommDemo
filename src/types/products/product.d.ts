interface IProductsResType {
  success: boolean;
  data: IProductsData[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}

interface IProductsData {
  id: number;
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

interface IProductDetailResType {
  success: boolean;
  data: IProductDetailData;
}

interface IProductDetailData {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  categoryId: number;
  category: ICategoryData;
  colors: IColorType[];
  sizes: ISizeType[];
  createdAt: string;
  updatedAt: string;
}

interface IColorType {
  id: number;
  colorId: number;
  productId: number;
  stock: boolean;
  color: {
    id: number;
    name: string;
    bgColor: string;
  };
}

interface ISizeType {
  id: number;
  sizeId: number;
  productId: number;
  stock: boolean;
  size: {
    id: number;
    name: string;
  };
}
