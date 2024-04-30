import { Banner, Footer, Header, StartBanner } from "@components/index";
import { Outlet } from "react-router-dom";

export const BannerLayout = () => {
  return (
    <>
      <Header />
      <StartBanner />
      <Outlet />
      <Banner />
      <Footer />
    </>
  );
};
