import React from "react";
import style from "./productsList.module.scss";
import { IProduct } from "@customtypes/product";
import { Box, Button, Skeleton } from "@mui/material";
import { FavoriteBorderOutlined, Share, SyncAlt } from "@mui/icons-material";
import { priceFormater } from "../../hooks/usePriceFormater";

const ProductCard = ({ props }: { props: IProduct }) => {
  const currentPrice = priceFormater(
    props.discountPrice || props.price,
    "money"
  );
  const discountPrice = priceFormater(props.price, "money");
  const discountPercent = priceFormater(props.discountPercent, "percent");
  const linkToProduct = `/product/${props.id}`;

  return (
    <article className={style.product}>
      {props.discountPercent ? (
        <span className={style.discountPercent}>{discountPercent}</span>
      ) : (
        ""
      )}
      {props.isNew ? <span className={style.isNew}>New</span> : ""}

      <img className={style.image} src={props.imageLink} alt="" />

      <div className={style.productInfo}>
        <h4 className={style.name}>{props.name}</h4>
        <p className={style.category}>{props.category.name}</p>

        <div className={style.pricesWrapper}>
          <p className={style.price}>{currentPrice}</p>

          {props.discountPrice ? (
            <p className={style.dicountPrice}>{discountPrice}</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={style.details}>
        <Button
          href={linkToProduct}
          variant="contained"
          className={style.buttonLink}
        >
          See Details
        </Button>
        <div className={style.buttons}>
          <Button startIcon={<Share />} className={style.detailsButton}>
            Share
          </Button>
          <Button startIcon={<SyncAlt />} className={style.detailsButton}>
            Compare
          </Button>
          <Button
            startIcon={<FavoriteBorderOutlined />}
            className={style.detailsButton}
          >
            Like
          </Button>
        </div>
      </div>
    </article>
  );
};

export const ProductsList = ({
  products,
  pageSize,
  isLoading,
}: {
  products?: IProduct[];
  pageSize?: number;
  isLoading: boolean;
}) => {
  if (!isLoading && (!products || products.length === 0)) {
    return <p>No products found.</p>;
  }

  return (
    <section className={style.productsWrapper}>
      {(isLoading ? Array.from(new Array(pageSize || 8)) : products)?.map(
        (item, index) => (
          <React.Fragment key={index || `skeleton_${index}`}>
            {item ? (
              <ProductCard key={index} props={item} />
            ) : (
              <Box
                key={`skeleton_${index}`}
                height={360}
                width={260}
                position={"relative"}
              >
                <Skeleton
                  width="100%"
                  height="75%"
                  variant="rectangular"
                  sx={{ mb: 1.5 }}
                />
                <Skeleton
                  width={50}
                  height={50}
                  variant="circular"
                  sx={{
                    position: "absolute",
                    right: 25,
                    top: 25,
                    background: "",
                  }}
                />
                <Skeleton width="100%" height="10%" />
                <Skeleton width="20%" height="5%" />
                <Skeleton width="50%" height="7%" />
              </Box>
            )}
          </React.Fragment>
        )
      )}
    </section>
  );
};
