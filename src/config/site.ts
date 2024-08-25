import { dataManagementNavItems } from "./data-management.config";

export type SiteConfig = typeof siteConfig;


export const siteConfig = {
  name: "Vite + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "MAP",
      href: "/map",
    },
    dataManagementNavItems,   
    {
      label: "DASHBOARD",
      href: "/dashboard",
    },
    {
      label: "ABOUT",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "MAP",
      href: "/map",
    },
    {
      label: "DATA MANAGEMENT",
      href: "/data-management",
    },
    {
      label: "DASHBOARD",
      href: "/dashboard",
    },
    {
      label: "ABOUT",
      href: "/about",
    },
    {
      label: "OTHER TOOLS",
      href: "/other-tools",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
