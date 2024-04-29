import { ICategory } from '@customtypes/category'
import { IProduct, IProductData, IProductFilters } from '@customtypes/product'
import axios from 'axios'

export function useApi() {
  const url = "http://localhost:5000"

  async function getProduct(id: string) {
    const { data } = await axios.get<IProduct>(`${url}/product/${id}`)
    return data
  }

  async function getProducts(page: number, pageSize: number, filter?: IProductFilters) {
    const params = {
      page,
      pageSize,
      ...filter
    }
    const { data } = await axios.get<IProductData>(`${url}/product/`, {params})
    return data
  }

  async function getCategory(id: number) {
    const { data } = await axios.get<ICategory>(`${url}/category/${id}`)
    return data  
  }

  async function getCategories() {
    const { data } = await axios.get<ICategory[]>(`${url}/category`)
    return data
  }

  return { getProducts, getProduct, getCategories, getCategory }
}