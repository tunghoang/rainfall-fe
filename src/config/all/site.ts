import { dataManagementNavItems } from "./data-management.config";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "INDRA Rainfall",
  description: "Providing precipitation data over Northern Center of Vietnam",
  navItems: [
    {
      public: true,
      label: "MAP",
      href: "/map",
    },
    {
      label: "DASHBOARD",
      href: "/dashboard",
    },
    {
      label: "ABOUT",
      href: "/about",
      public: true
    },
    {
      label: "USER MANAGEMENT",
      href: '/user'
    },
    //dataManagementNavItems,
  ],
};
