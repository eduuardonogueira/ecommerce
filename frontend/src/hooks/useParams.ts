import { IProductFilters } from "@customtypes/product";
import { useLocation } from "react-router-dom";

export function useParams() {
  const { search } = useLocation()

  function getParams() {
    if(search) {
      const params = search.slice(1).split("&");
      const queryParams: IProductFilters = {}
      
      params.forEach((param) => {
        const parts = param.split("=");
        const key = parts[0];
        const value = parts[1].replace(/_/g, " ");

        queryParams[key as keyof IProductFilters] = value;
      });

      return queryParams
    }
  }

  return { getParams };
}
