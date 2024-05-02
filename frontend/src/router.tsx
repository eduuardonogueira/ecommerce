import {
  ABOUT_ROUTE,
  CART_ROUTE,
  CONTACT_ROUTE,
  HOME_ROUTE,
  NOT_FOUND_ROUTE,
  PRODUCT_ROUTE_DEFINITION,
  SHOP_ROUTE,
} from "@constants/routes";
import { About, Contact, Shop, NotFound, Product, Home } from "@pages/index";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DefaultLayout, BannerLayout } from "./layouts";

export const RouterAllRoutes = () => {
  // const Home = lazy(() => import("@pages/Home/home.page"));
  //fallback={AppLoader}

  return (
    <>
      <Suspense>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index path={HOME_ROUTE} element={<Home />} />
            <Route path={PRODUCT_ROUTE_DEFINITION} element={<Product />} />
          </Route>

          <Route element={<BannerLayout />}>
            <Route path={SHOP_ROUTE} element={<Shop />} />
            <Route path={ABOUT_ROUTE} element={<About />} />
            <Route path={CONTACT_ROUTE} element={<Contact />} />
            <Route
              path={CART_ROUTE}
              element={
                <div>
                  <h1>Olá</h1>
                </div>
              }
            />
          </Route>

          <Route path={NOT_FOUND_ROUTE} element={<NotFound />} />
          <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
        </Routes>
      </Suspense>
    </>
  );
};
