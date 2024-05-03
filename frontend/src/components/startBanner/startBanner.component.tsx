import { NavigateNext } from "@mui/icons-material";
import style from "./startBanner.module.scss";
import { Breadcrumbs } from "@mui/material";
import { ShopBanner } from "@assets/img";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import { HOME_ROUTE } from "@constants/routes";

export const StartBanner = () => {
  const location = useLocation();
  const path = location.pathname;
  const pages: string[] = path.split("/");
  const pageName = pages[lastIndex(pages)];

  function lastIndex(array: any[] | string): number {
    return array.length - 1;
  }

  function getPagePath(lastPageIndex: number): string {
    const result = pages
      .map((page, index) => (index <= lastPageIndex ? page : ""))
      .join("/");

    const lastCharacter = result[lastIndex(result)];

    if (lastCharacter === "/") {
      const resultSliced = result.slice(0, lastIndex(result));
      return resultSliced;
    }

    return result;
  }

  // pages.map((_, index) => console.log("page: ", getPagePath(index)));

  return (
    <section className={style.banner}>
      <img src={ShopBanner} alt="" className={style.bannerImage} />
      <div className={style.bannerWrapper}>
        <h2 className={style.bannerTitle}>{pageName}</h2>
        <Breadcrumbs
          separator={
            <NavigateNext sx={{ color: "black", marginInline: "0px" }} />
          }
        >
          {pages.map((page, index) => (
            <Link
              key={index}
              className={cn(style.link, {
                [style.lastLink]: index === lastIndex(pages),
              })}
              to={getPagePath(index)}
            >
              {page ? page : "Home"}
            </Link>
          ))}
        </Breadcrumbs>
      </div>
    </section>
  );
};
