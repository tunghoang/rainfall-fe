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
          label: "WORKSPACES",
          name: "Workspaces",
          href: "/data-management/workspaces",
          dataConfig: [
              {
                key: 'name',
                label: 'Workspace Name',
                isColumn: true,
                isCreate: true,
                inputType: 'text',
              },
              {
                key: 'default',
                label: 'Default',
                isColumn: true,
                isCreate: true,
                inputType: 'checkbox',
              },
              {
                key: 'isolated',
                label: 'Isolated',
                isColumn: true,
                isCreate: true,
                inputType: 'checkbox',
              },
          ]
        },
        {
          label: "STORES",
          name: "Stores",
          href: "/data-management/stores",
          dataConfig: [
            {
              key: 'dataType',
              label: 'Data Type',
              isColumn: true,
              isCreate: true,
              inputType: 'text',
            },
            {
              key: 'workspace',
              label: 'Workspace',
              isColumn: true,
              isCreate: true,
              inputType: 'text',
            },
            {
              key: 'storeName',
              label: 'Store Name',
              isColumn: true,
              isCreate: true,
              inputType: 'text',
            },
            {
              key: 'type',
              label: 'Type',
              isColumn: true,
              isCreate: true,
              inputType: 'text',
            },
            {
              key: 'enabled',
              label: 'Enabled',
              isColumn: true,
              isCreate: true,
              inputType: 'checkbox',
            },
            {
              key: 'url',
              label: 'Connection Parameters',
              inputType: 'file',
              isColumn: false,
              isCreate: true,
            },
            {
              key: 'actions',
              label: 'Actions',
              // inputType: 'file',
              isColumn: true,
              isCreate: false,
            },
        ]
        },
        {
          label: "LAYERS",
          name: "Layers",
          href: "/data-management/layers",
          dataConfig: [
            {
              key: 'type',
              label: 'Type',
              isColumn: true,
              isCreate: true,
              inputType: 'text',
            },
            {
              key: 'title',
              label: 'Title',
              isColumn: true,
              isCreate: true,
              inputType: 'text',
            },
            {
              key: 'name',
              label: 'Name',
              isColumn: true,
              isCreate: true,
              inputType: 'text',
            },
            {
              key: 'store',
              label: 'Store',
              isColumn: true,
              isCreate: true,
              inputType: 'text',
            },
            {
              key: 'enabled',
              label: 'Enabled',
              isColumn: true,
              isCreate: true,
              inputType: 'checkbox',
            },
            {
              key: 'nativeSRS',
              label: 'Native SRS',
              isColumn: true,
              isCreate: true,
              inputType: 'text',
            }
          ] 
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
