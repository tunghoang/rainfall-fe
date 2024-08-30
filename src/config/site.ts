export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "MAP",
      href: "/map",
    },
    {
      label: "DATA MANAGEMENT",
      subItems: [
        {
          label: "DATA SOURCES",
          href: "/data-management/data-sources",
        },
        {
          label: "DATA CATALOG",
          href: "/data-management/data-catalog",
        },
        {
          label: "DATA COLLECTION",
          href: "/data-management/data-collection",
        },
        {
          label: "DATA ANALYSIS",
          href: "/data-management/data-analysis",
        },
        {
          label: "DATA VISUALIZATION",
          href: "/data-management/data-visualization",
        },
        {
          label: "DATA REPORT",
          href: "/data-management/data-report",
        },
      ]
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
