import React from "react";
import style from "./categoriesList.module.scss";
import { Link } from "react-router-dom";
import { ICategory } from "@customtypes/category";
import { Box, Skeleton } from "@mui/material";
import { SHOP_ROUTE } from "@constants/routes";

const CategoryCard = ({
  link,
  imageLink,
  name,
}: {
  link: string;
  imageLink: string;
  name: string;
}) => {
  return (
    <article className={style.category}>
      <img className={style.image} src={imageLink} alt="" />
      <h4 className={style.title}>{name}</h4>
      <Link to={link} className={style.link} />
    </article>
  );
};

export const CategoriesList = ({
  categories,
  isLoading,
}: {
  categories?: ICategory[];
  isLoading: boolean;
}) => {
  return (
    <section className={style.categoriesWrapper}>
      {(isLoading ? Array.from(new Array(3)) : categories)?.map(
        (item, index) => (
          <React.Fragment key={index || `skeleton_${index}`}>
            {item ? (
              <CategoryCard
                key={index}
                imageLink={item.imageLink}
                name={item.name}
                link={`${SHOP_ROUTE}?category=${item.name}`}
              />
            ) : (
              <Box height={360} width={300} key={index}>
                <Skeleton
                  width="100%"
                  height="85%"
                  variant="rectangular"
                  sx={{ mb: 2 }}
                />
                <Skeleton width="100%" height="10%" />
              </Box>
            )}
          </React.Fragment>
        )
      )}
    </section>
  );
};
