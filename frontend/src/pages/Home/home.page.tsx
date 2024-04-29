import style from "./home.module.scss";
import { useEffect, useState } from "react";
import { IProduct, ICategory } from "@customtypes/index";
import { Banner, CategoriesList, ProductsList } from "@components/index";
import { useApi } from "@hooks/useApi";
import { Button } from "@mui/material";
import { SHOP_ROUTE } from "@constants/routes";
import { HomeBanner } from "@assets/img";

export const Home = () => {
  const { getCategories, getProducts } = useApi();
  const [categories, setCategories] = useState<ICategory[]>();
  const [productsData, setProductsData] = useState<IProduct[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pagination = {
    page: 1,
    pageSize: 8,
  };

  useEffect(() => {
    async function init() {
      try {
        const categories = await getCategories();
        const { products } = await getProducts(
          pagination.page,
          pagination.pageSize
        );
        setCategories(categories);
        setProductsData(products);
        setIsLoading(false);
      } catch (err) {
        /* empty */
      }
    }
    // setTimeout(init, 5000);
    setIsLoading(true);
    init();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section className={style.banner}>
        <span className={style.background} />
        <img
          src={HomeBanner}
          className={style.bannerImage}
          alt="Sala com cadeira, móvel, abajur e planta"
        />
        <div className={style.textWrapper}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
        </div>
      </section>

      <div className={style.container}>
        <section className={style.categories}>
          <h2 className={style.categoriesTitle}>Browse the Range</h2>
          <CategoriesList categories={categories} isLoading={isLoading} />
        </section>

        <section className={style.products}>
          <h2 className={style.productsTitle}>Our products</h2>
          <ProductsList
            products={productsData}
            isLoading={isLoading}
            pageSize={pagination.pageSize}
          />
          <Button
            variant="outlined"
            href={SHOP_ROUTE}
            className={style.homeButton}
          >
            Show More
          </Button>
        </section>
      </div>
      <Banner />
    </>
  );
};

export default Home;
