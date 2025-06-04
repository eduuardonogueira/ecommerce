import { IProduct } from "@customtypes/product";

export const useStore = () => {
  function sortProductbyPrice(products: IProduct[], order: string): IProduct[] {
    return [...products].sort((a, b) => {
      if (order === "decreasing") {
        return (
          (b.discountPrice ? b.discountPrice : b.price) -
          (a.discountPrice ? a.discountPrice : a.price)
        );
      } else {
        return (
          (a.discountPrice ? a.discountPrice : a.price) -
          (b.discountPrice ? b.discountPrice : b.price)
        );
      }
    });
  }

  function getPageDetails(pageInfo: {
    page: number;
    pageSize: number;
    pageQty: number;
    totalItems: number;
  }) {
    const firstPageItem = (pageInfo.page - 1) * pageInfo.pageSize + 1;
    const lastPageItem = Math.min(
      firstPageItem + pageInfo.pageSize - 1,
      pageInfo.totalItems
    );
    const pageDetails = `Showing ${firstPageItem}-${lastPageItem} of ${pageInfo.totalItems} results`;

    return pageDetails;
  }

  return { sortProductbyPrice, getPageDetails };
};
