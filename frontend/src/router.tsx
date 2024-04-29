import {
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  HOME_ROUTE,
  NOT_FOUND_ROUTE,
  PRODUCT_ROUTE_DEFINITION,
  SHOP_ROUTE,
} from "@constants/routes";
import { About, Contact, Shop, NotFound, Product } from "@pages/index";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Footer, Header } from "./components/index";

export const RouterAllRoutes = () => {
  const Home = lazy(() => import("@pages/Home/home.page"));
  //fallback={AppLoader}

  return (
    <>
      <Header />
      <main>
        <Suspense>
          <Routes>
            <Route path={HOME_ROUTE} element={<Home />} />
            <Route path={SHOP_ROUTE} element={<Shop />} />
            <Route path={ABOUT_ROUTE} element={<About />} />
            <Route path={CONTACT_ROUTE} element={<Contact />} />
            <Route path={PRODUCT_ROUTE_DEFINITION} element={<Product />} />

            <Route path={NOT_FOUND_ROUTE} element={<NotFound />} />
            <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
};
