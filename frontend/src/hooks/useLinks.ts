import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  SHOP_ROUTE,
} from "@constants/routes";

export const useLinks = () => {
  const headerLinks = [
    {
      route: HOME_ROUTE,
      label: "home",
    },
    {
      route: SHOP_ROUTE,
      label: "shop",
    },
    {
      route: ABOUT_ROUTE,
      label: "about",
    },
    {
      route: CONTACT_ROUTE,
      label: "contact",
    },
  ];

  const footerLinks = [
    {
      route: "/",
      label: "payment options",
    },
    {
      route: "/",
      label: "returns",
    },
    {
      route: "/",
      label: "privacy policies",
    },
  ];

  return { headerLinks, footerLinks };
};
