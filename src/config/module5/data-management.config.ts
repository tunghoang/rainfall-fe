export const dataConfigBase = [
  {
    key: 'name',
    label: 'Product',
    isColumn: true,
    createFormConfig: {
      label: 'Product',
      inputType: 'text',
      isRequired: true,
      isDisabled: true,
      metadata: {
        isDataName: true,
      }
    }
  },
  {
    key: 'description',
    label: 'Description',
    isColumn: true,
    createFormConfig: {
      label: 'Description',
      inputType: 'text',
    }
  },
  {
    key: 'time',
    label: 'Time',
    isColumn: true,
    createFormConfig: {
      label: 'Time',
      inputType: 'date-time',
      isRequired: true,
    }
  },
  {
    key: 'resolution',
    label: 'Resolution',
    isColumn: false,
    createFormConfig: {
      label: 'Select resolution', 
      inputType: 'select',
      isRequired: true,
      metadata: {
        options: [
          {
            key: 'four',
            value: 4,
            label: '4 KM'
          },
          {
            key: 'ten',
            value: 10,
            label: '10 KM'
          }
        ]
      }
    }
  },
  {
    key: 'frequency',
    label: 'Frequency',
    isColumn: false,
    createFormConfig: {
      label: 'Select frequency',
      inputType: 'select',
      isRequired: true,
      metadata: {
        options: [
          {
            key: 'hour',
            value: 'hourly',
            label: 'hourly'
          },
          {
            key: 'day',
            value: 'daily',
            label: 'daily'
          }
        ]
      }
    }
  },
  {
    key: 'isAvailable',
    label: 'Available',
    isColumn: true,
    createFormConfig: {
      label: 'Available',
      inputType: 'checkbox',
      isRequired: true,
      isDisabled: true,
    }
  },
  {
    key: 'file',
    label: 'File',
    isColumn: false,
    createFormConfig: {
      label: 'File',
      inputType: 'file',
      isRequired: true,
      acceptType: '.tif',
    }
  },
  {
    key: 'actions',
    label: 'Actions',
    isColumn: true,
  },
];

export const dataTypes = {
  hourly4: {
    label: '4km hourly',
    value: {
      resolution: 4,
      frequency: 'hourly'
    }
  },
  hourly10: {
    label: '10km hourly',
    value: {
      resolution: 10,
      frequency: 'hourly'
    }
  },
  daily10: {
    label: '10km daily',
    value: {
      resolution: 10,
      frequency: 'daily'
    }
  }
}

export const dataManagementNavItems = {
  label: "DATA MANAGEMENT",
  subItems: [
    {
      label: "CAPE",
      name: "CAPE",
      href: "/data-management/cape",
    },
    {
      label: "EWSS",
      name: "EWSS",
      href: "/data-management/ewss",
    },
    {
      label: "IE",
      name: "IE",
      href: "/data-management/ie",
    },
    {
      label: "ISOR",
      name: "ISOR",
      href: "/data-management/isor",
    },
    {
      label: "KX",
      name: "KX",
      href: "/data-management/kx",
    },
    {
      label: "PEV",
      name: "PEV",
      href: "/data-management/pev",
    },
    {
      label: "R250",
      name: "R250",
      href: "/data-management/r250",
    },
    {
      label: "R500",
      name: "R500",
      href: "/data-management/r500",
    },
    {
      label: "R850",
      name: "R850",
      href: "/data-management/r850",
    },
    {
      label: "SLHF",
      name: "SLHF",
      href: "/data-management/slhf",
    },
    {
      label: "SLOR",
      name: "SLOR",
      href: "/data-management/slor",
    },
    {
      label: "SSHF",
      name: "SSHF",
      href: "/data-management/sshf",
    },
    {
      label: "TCLW",
      name: "TCLW",
      href: "/data-management/tclw",
    },
    {
      label: "TCW",
      name: "TCW",
      href: "/data-management/tcw",
    },
    {
      label: "TCWV",
      name: "TCWV",
      href: "/data-management/tcwv",
    },
    {
      label: "U250",
      name: "U250",
      href: "/data-management/u250",
    },
    {
      label: "U850",
      name: "U850",
      href: "/data-management/u850",
    },
    {
      label: "V250",
      name: "V250",
      href: "/data-management/v250",
    },
    {
      label: "V850",
      name: "V850",
      href: "/data-management/v850",
    },
    {
      label: "DEM",
      name: "DEM",
      href: "/data-management/dem",
    },
  ]
};
