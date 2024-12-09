import { dataManagementNavItems } from "./data-management.config";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "INDRA Rainfall",
  description: "Providing precipitation data over Northern Center of Vietnam",
  navItems: [
    {
      label: "USER MANAGEMENT",
      href: '/user'
    },
    dataManagementNavItems,
  ],
};
