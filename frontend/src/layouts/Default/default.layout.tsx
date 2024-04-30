import { Footer, Header } from "@components/index";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
