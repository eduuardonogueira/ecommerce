import { ICategory } from "./category";

export type IProductData = {
  products: IProduct[],
  pagination: {
    pageQty: number,
    total: number
  }
}

export type IProduct = {
  id: number;
  name: string;
  sku: string;
  categoryId: number;
  description: string;
  largeDescription: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  isNew: boolean;
  imageLink: string;
  otherImagesLink: string[];
  createdDate: Date;
  updatedDate: Date;
  category: ICategory;
};

export type IProductFilters = {
  hasDiscount?: string;
  isNew?: string;
  category?: string;
  categoryId?: string;
}