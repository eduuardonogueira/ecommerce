import { useEffect, useState } from "react";
import { ProductsList, Pagination, Banner } from "@components/index";
import { IProduct, IProductFilters } from "@customtypes/product";
import { useApi, useStore, useParams } from "@hooks/index";
import style from "./shop.module.scss";
import {
  Breadcrumbs,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { NavigateNext, TuneRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "@constants/routes";
import { SHOP_ROUTE } from "../../constants/routes";
import { ShopBanner } from "@assets/img";
import SvgGridBigRound from "@assets/icons/GridBigRound";
import SvgViewList from "@assets/icons/ViewList";
import cn from "classnames";

export const Shop = () => {
  const { getProducts } = useApi();
  const { getParams } = useParams();
  const { sortProductbyPrice, getPageDetails } = useStore();
  const [products, setProducts] = useState<IProduct[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 16,
    pageQty: 1,
    totalItems: 0,
  });
  const [params, setParams] = useState<IProductFilters | undefined>(
    getParams()
  );
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [order, setOrder] = useState("");
  const pageDetails = getPageDetails(pageInfo);
  const breadcrumbs = [
    <Link to={HOME_ROUTE} className={style.link}>
      Home
    </Link>,
    <Link to={SHOP_ROUTE} className={style.lastLink}>
      Shop
    </Link>,
  ];
  const filterOptions = [{ value: "true", label: "isNew" }];

  function handleChangePage(page: number) {
    setPageInfo((prev) => ({ ...prev, page }));
  }

  function handleChangeOrder(event: SelectChangeEvent) {
    setOrder(event.target.value);
  }

  function handleChangePageSize(event: SelectChangeEvent) {
    setPageInfo((prev) => ({
      ...prev,
      pageSize: parseInt(event.target.value),
    }));
  }

  useEffect(() => {
    setIsLoading(true);
    async function fecthData() {
      try {
        const { products, pagination } = await getProducts(
          pageInfo.page,
          pageInfo.pageSize,
          params
        );
        setPageInfo((prev) => ({
          ...prev,
          pageQty: pagination.pageQty,
          totalItems: pagination.total,
        }));
        const sortedProducts = sortProductbyPrice(products, order);
        setProducts(sortedProducts);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fecthData();
    // eslint-disable-next-line
  }, [pageInfo.page, pageInfo.pageSize, params]);

  useEffect(() => {
    if (products) {
      const sortedProducts = sortProductbyPrice(products, order);
      setProducts(sortedProducts);
    }
    // eslint-disable-next-line
  }, [order]);

  return (
    <>
      <section className={style.banner}>
        <img src={ShopBanner} alt="" className={style.bannerImage} />
        <div className={style.bannerWrapper}>
          <h2 className={style.bannerTitle}>Shop</h2>
          <Breadcrumbs
            separator={
              <NavigateNext sx={{ color: "black", marginInline: "0px" }} />
            }
          >
            {breadcrumbs}
          </Breadcrumbs>
        </div>
      </section>

      <section className={style.filters}>
        {products ? (
          <div className={style.filterWrapper}>
            <div className={style.options}>
              <Button
                onClick={() => setMenuIsOpen(true)}
                startIcon={<TuneRounded />}
                className={style.filterButton}
              >
                Filter
              </Button>
              <Menu
                open={menuIsOpen}
                onClose={() => setMenuIsOpen(false)}
                className={style.filterMenu}
              >
                {filterOptions.map((item, index) => (
                  <MenuItem
                    className={cn({
                      [style.itemActive]: params?.isNew === "true",
                    })}
                    key={index}
                    onClick={() =>
                      setParams((prev) => ({
                        ...prev,
                        isNew: prev?.isNew === "" ? "true" : "",
                      }))
                    }
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                aria-label="delete"
                sx={{ color: "#000", padding: 0 }}
              >
                <SvgViewList />
              </IconButton>
              <IconButton
                aria-label="delete"
                sx={{ color: "#000", padding: 0 }}
              >
                <SvgGridBigRound />
              </IconButton>
              <Divider orientation="vertical" flexItem />
              <p>{pageDetails}</p>
            </div>

            <div className={style.inputs}>
              <div className={style.show}>
                <p>Show</p>
                <Select
                  className={style.selectInput}
                  value={pageInfo.pageSize.toString()}
                  onChange={handleChangePageSize}
                  displayEmpty
                >
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={32}>32</MenuItem>
                </Select>
              </div>
              <div className={style.shortBy}>
                <p>Short by</p>
                <Select
                  value={order}
                  onChange={handleChangeOrder}
                  className={style.selectInput}
                  displayEmpty
                >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="asc">Crescent</MenuItem>
                  <MenuItem value="decreasing">Decreasing</MenuItem>
                </Select>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </section>

      <section className={style.products}>
        <ProductsList
          products={products}
          isLoading={isLoading}
          pageSize={pageInfo.pageSize}
        />
        <Pagination props={pageInfo} changePage={handleChangePage} />
      </section>

      <Banner />
    </>
  );
};
