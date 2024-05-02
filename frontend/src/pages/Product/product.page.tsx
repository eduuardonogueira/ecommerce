import { useEffect, useState } from "react";
import { useApi } from "@hooks/useApi";
import { IProduct } from "@customtypes/index";
import { useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Divider,
  IconButton,
  Link,
  Rating,
} from "@mui/material";
import {
  Add,
  AddOutlined,
  FacebookRounded,
  LinkedIn,
  NavigateNext,
  Remove,
  Twitter,
} from "@mui/icons-material";
import style from "./product.module.scss";
import { ProductsList } from "@components/index";
import { HOME_ROUTE, SHOP_ROUTE } from "@constants/routes";
import cn from "classnames";
import { priceFormater } from "@hooks/usePriceFormater";

const ShowMoreButton = ({
  pageSize,
  category,
  handleShowMore,
}: {
  pageSize: number;
  category: string | undefined;
  handleShowMore: () => void;
}) =>
  pageSize === 4 ? (
    <Button
      variant="outlined"
      className={style.productButton}
      onClick={handleShowMore}
    >
      Show More
    </Button>
  ) : (
    <Button
      href={`${SHOP_ROUTE}?category=${category}`}
      variant="outlined"
      className={style.productButton}
      onClick={handleShowMore}
    >
      Show More
    </Button>
  );

export const Product = () => {
  const { id } = useParams();
  const { getProduct, getProducts } = useApi();

  const [productInfo, setProductInfo] = useState<IProduct>();
  const [currentImage, setCurrentImage] = useState<string>("");
  const [rating, setRating] = useState<number | null>(4.5);

  const [products, setProducts] = useState<IProduct[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 4,
    pageQty: 1,
    totalItems: 0,
  });
  const [options, setOptions] = useState({
    size: "",
    color: "",
    quantity: 1,
  });

  const producInfoSizes = ["l", "xl", "xs"];
  const producInfoColors = ["#816DFA", "#000000", "#B88E2F"];

  const breadcrumbs = [
    <Link key={1} href={HOME_ROUTE} className={style.link}>
      Home
    </Link>,
    <Link key={2} href={SHOP_ROUTE} className={style.link}>
      Shop
    </Link>,
    <div key={3} className={style.breadcrumbsLastItem}>
      <Divider orientation="vertical" flexItem />
      <span className={style.lastItemText}>{productInfo?.name}</span>
    </div>,
  ];

  function handleShowMore() {
    if (pageInfo.pageSize === 4) {
      setPageInfo((prev) => ({ ...prev, pageSize: 8 }));
    } else {
    }
  }

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        if (id) {
          const info = await getProduct(id);
          setProductInfo(info);
          setProductInfo(
            (prev) =>
              prev && {
                ...prev,
                otherImagesLink: [prev.imageLink, ...prev.otherImagesLink],
              }
          );
          setCurrentImage(info.imageLink);

          if (info) {
            const { products, pagination } = await getProducts(
              pageInfo.page,
              pageInfo.pageSize,
              {
                category: info.category ? info.category.name : "",
              }
            );

            setPageInfo((prev) => ({
              ...prev,
              pageQty: pagination.pageQty,
              totalItems: pagination.total,
            }));
            setProducts(products);
            setOptions((prev) => ({
              ...prev,
              size: producInfoSizes[0],
              color: producInfoColors[0],
            }));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    //eslint-disable-next-line
  }, [id, pageInfo.pageSize]);

  return (
    <>
      <section className={style.breadcrumbs}>
        <div className={style.container}>
          <Breadcrumbs
            separator={
              <NavigateNext sx={{ color: "black", marginInline: "10px" }} />
            }
          >
            {breadcrumbs}
          </Breadcrumbs>
        </div>
      </section>

      <div className={style.container}>
        <section className={style.productWrapper}>
          <div className={style.imagesWrapper}>
            <div className={style.thumbnailWrapper}>
              {productInfo?.otherImagesLink.map((link, index) => (
                <img
                  src={link}
                  className={cn([style.thumbnail], {
                    [style.thumbnailActive]: currentImage === link,
                  })}
                  onClick={() => setCurrentImage(link)}
                  alt="Miniaturas do produto"
                  key={index}
                />
              ))}
            </div>
            <img
              src={currentImage}
              alt="Imagem principal do Produto"
              className={style.image}
            />
          </div>
          <div className={style.productInfoWrapper}>
            <h3 className={style.name}>{productInfo?.name}</h3>
            {productInfo ? (
              <hgroup className={style.priceWrapper}>
                <h4 className={style.price}>
                  {priceFormater(
                    productInfo.discountPrice || productInfo.price,
                    "money"
                  )}
                </h4>
                {productInfo.discountPrice ? (
                  <h4 className={style.dicountPrice}>
                    {priceFormater(productInfo.price, "money")}
                  </h4>
                ) : (
                  ""
                )}
              </hgroup>
            ) : (
              ""
            )}

            <div className={style.rating}>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(_, newValue) => {
                  setRating(newValue);
                }}
              />
              <Divider orientation="vertical" flexItem />
              <p className={style.ratingText}>5 Customer Review</p>
            </div>

            <p className={style.description}>{productInfo?.description}</p>

            <div className={style.sizes}>
              <h6 className={style.OptionTitle}>Size</h6>
              {producInfoSizes.map((size, index) => (
                <button
                  className={cn(style.buttonSize, {
                    [style.buttonSizeActive]: size === options.size,
                  })}
                  key={index}
                  onClick={() =>
                    setOptions((prev) => ({ ...prev, size: size }))
                  }
                >
                  {size}
                </button>
              ))}
            </div>

            <div className={style.colors}>
              <h6 className={style.OptionTitle}>Color</h6>
              {producInfoColors.map((color, index) => (
                <button
                  className={cn(style.buttonColor, {
                    [style.buttonColorActive]: color === options.color,
                  })}
                  style={{ background: color }}
                  key={index}
                  onClick={() =>
                    setOptions((prev) => ({ ...prev, color: color }))
                  }
                />
              ))}
            </div>

            <div className={style.buttons}>
              <div className={style.buttonQuantity}>
                <IconButton
                  disabled={options.quantity === 1}
                  onClick={() =>
                    setOptions((prev) => ({
                      ...prev,
                      quantity: (prev.quantity -= 1),
                    }))
                  }
                >
                  <Remove />
                </IconButton>
                <span className={style.buttonQuantityText}>
                  {options.quantity.toString()}
                </span>
                <IconButton
                  onClick={() =>
                    setOptions((prev) => ({
                      ...prev,
                      quantity: (prev.quantity += 1),
                    }))
                  }
                >
                  <Add />
                </IconButton>
              </div>
              <Button className={style.ButtonOutlined}>Add To Cart</Button>
              <Button
                startIcon={<AddOutlined />}
                className={style.ButtonOutlined}
              >
                Compare
              </Button>
            </div>

            <hr className={style.divisor} />

            <ul className={style.types}>
              <li className={style.typeWrapper}>
                <p className={style.type}>SKU</p>
                <span className={style.points}>:</span>
                <p className={style.value}>{productInfo?.sku}</p>
              </li>
              <li className={style.typeWrapper}>
                <p className={style.type}>Category</p>
                <span className={style.points}>:</span>
                <p className={style.value}>{productInfo?.category.name}</p>
              </li>
              <li className={style.typeWrapper}>
                <p className={style.type}>Tags</p>
                <span className={style.points}>:</span>
                <p className={style.value}>Aqui fica as tags</p>
              </li>
              <li className={style.typeWrapper}>
                <p className={style.type}>Share</p>
                <span className={style.points}>:</span>
                <div className={style.share}>
                  <IconButton className={style.socialMedia}>
                    <FacebookRounded />
                  </IconButton>
                  <IconButton className={style.socialMedia}>
                    <LinkedIn />
                  </IconButton>
                  <IconButton className={style.socialMedia}>
                    <Twitter />
                  </IconButton>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <hr className={style.divisor} />

      <div className={style.container}>
        <section className={style.descriptionWrapper}>
          <hgroup className={style.titleWrapper}>
            <h3 className={style.descriptionTitle}>Description</h3>
            <h4 className={style.descriptionSubtitle}>
              Additional Information
            </h4>
          </hgroup>
          <p className={style.descriptionText}>
            {productInfo?.largeDescription}
          </p>
        </section>

        <section className={style.products}>
          <h2 className={style.productsTitle}>Related Products</h2>
          <ProductsList
            products={products}
            isLoading={isLoading}
            pageSize={pageInfo.pageSize}
          />
          <ShowMoreButton
            pageSize={pageInfo.pageSize}
            category={productInfo?.category.name}
            handleShowMore={handleShowMore}
          />
        </section>
      </div>
    </>
  );
};
