import { useEffect, useState } from "react";
import { ProductsList, Pagination } from "@components/index";
import { IProduct, IProductFilters } from "@customtypes/product";
import { useApi, useStore, useParams } from "@hooks/index";
import style from "./shop.module.scss";
import {
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Check, TuneRounded } from "@mui/icons-material";
import SvgGridBigRound from "@assets/icons/GridBigRound";
import SvgViewList from "@assets/icons/ViewList";
import { ICategory } from "@customtypes/category";
import cn from "classnames";

export const Shop = () => {
  const { getProducts, getCategories } = useApi();
  const { getParams } = useParams();
  const { sortProductbyPrice, getPageDetails } = useStore();

  const [category, setCategory] = useState<ICategory[]>();
  const [products, setProducts] = useState<IProduct[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 16,
    pageQty: 1,
    totalItems: 0,
  });

  const [order, setOrder] = useState("");
  const [params, setParams] = useState<IProductFilters | undefined>(
    getParams()
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const filterOptions: { key: keyof IProductFilters; label: string }[] = [
    { key: "isNew", label: "New" },
    { key: "discountPercent", label: "Discount" },
  ];
  const pageDetails = getPageDetails(pageInfo);

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

  function handleClickMenuCategories(categoryName: string) {
    setParams((prev) => ({
      ...prev,
      category: prev?.category === categoryName ? undefined : categoryName,
    }));
    setPageInfo((prev) => ({ ...prev, page: 1 }));
  }

  function handleClickMenuFilter(key: keyof IProductFilters) {
    setParams((prev) => ({
      ...prev,
      [key]: prev && prev[key] === "true" ? undefined : "true",
    }));
    setPageInfo((prev) => ({ ...prev, page: 1 }));
  }

  const handleClickMenu = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
        console.error(err);
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

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getCategories();
        setCategory(categories);
      } catch (err) {
        console.error(err);
      }
    }

    fetchCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section className={style.filters}>
        {products ? (
          <div className={style.filterWrapper}>
            <div className={style.options}>
              <Button
                onClick={handleClickMenu}
                startIcon={<TuneRounded />}
                className={cn(style.filterButton, {
                  [style.filterButtonActive]: anchorEl,
                })}
              >
                Filter
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                className={style.filterMenu}
                sx={{ mt: 1.5 }}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem disabled className={style.menuItemTitle}>
                  Products
                </MenuItem>
                {filterOptions.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleClickMenuFilter(item.key)}
                  >
                    {params && params[item.key] ? (
                      <>
                        <ListItemIcon>
                          <Check />
                        </ListItemIcon>
                        {item.label}
                      </>
                    ) : (
                      <ListItemText inset>{item.label}</ListItemText>
                    )}
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem disabled className={style.menuItemTitle}>
                  Categories
                </MenuItem>
                {category?.map((category, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleClickMenuCategories(category.name)}
                    className={style.menuItemText}
                  >
                    {params?.category === category.name ? (
                      <>
                        <ListItemIcon>
                          <Check />
                        </ListItemIcon>
                        {category.name}
                      </>
                    ) : (
                      <ListItemText inset>{category.name}</ListItemText>
                    )}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton className={style.filterButton} aria-label="delete">
                <SvgGridBigRound />
              </IconButton>
              <IconButton className={style.filterButton} aria-label="delete">
                <SvgViewList />
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
    </>
  );
};
