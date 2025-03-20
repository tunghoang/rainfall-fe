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
  daily10: {
    label: '10km daily',
    value: {
      resolution: 10,
      frequency: 'daily'
    }
  },
  hourly10: {
    label: '10km hourly',
    value: {
      resolution: 10,
      frequency: 'hourly'
    }
  },
  hourly4: {
    label: '4km hourly',
    value: {
      resolution: 4,
      frequency: 'hourly'
    }
  }
}

export const dataManagementNavItems = {
  label: "DATA MANAGEMENT",
  subItems: [
    {
      label: "HIMAWARI",
      name: "deepModel",
      href: "/data-management/deepModel",
      public: true,
      onDashboard: true,
      onMap: true
    },
    {
      label: "IMERG_E",
      name: "IMERG_E",
      href: "/data-management/imerg_e",
      onMap: true,
      onDashboard: true,
      public: true
    },
    {
      label: "IMERG_L",
      name: "IMERG_L",
      href: "/data-management/imerg_l",
      onMap: true,
      onDashboard: true,
      public: true
    },
    {
      label: "IMERG_F",
      name: "IMERG_F",
      href: "/data-management/imerg_f",
      onMap: true,
      onDashboard: true,
      public: true
    },
    {
      label: "GSMaP",
      name: "GSMaP",
      href: "/data-management/gsmap",
      onMap: true,
      onDashboard: true,
      public: true
    },
    {
      label: "CCS",
      name: "CCS",
      href: "/data-management/ccs",
      onMap: true,
      onDashboard: true,
      public: true
    },
    {
      label: "FY4A",
      name: "FY4A",
      href: "/data-management/fy4a",
      onMap: true,
      onDashboard: true,
      public: true
    },
    {
      label: "Radar",
      name: "Radar",
      href: "/data-management/radar",
      onMap: true,
      onDashboard: true,
      public: true
    },
    {
      label: "AWS",
      name: "AWS",
      href: "/data-management/aws",
      public: true,
      onDashboard: true,
      onMap: true
    },
    {
      label: "integrated",
      name: "integrated",
      href: "/data-management/integrated",
      public: true,
      onDashboard: true,
      onMap: true
    },
    {
      label: "CAPE",
      name: "CAPE",
      href: "/data-management/cape",
      public: true
    },
    {
      label: "EWSS",
      name: "EWSS",
      href: "/data-management/ewss",
      public: true
    },
    {
      label: "IE",
      name: "IE",
      href: "/data-management/ie",
      public: true
    },
    {
      label: "ISOR",
      name: "ISOR",
      href: "/data-management/isor",
      public: true
    },
    {
      label: "KX",
      name: "KX",
      href: "/data-management/kx",
      public: true
    },
    {
      label: "PEV",
      name: "PEV",
      href: "/data-management/pev",
      public: true
    },
    {
      label: "R250",
      name: "R250",
      href: "/data-management/r250",
      public: true
    },
    {
      label: "R500",
      name: "R500",
      href: "/data-management/r500",
      public: true
    },
    {
      label: "R850",
      name: "R850",
      desc: "Relative Humidity at 850hPa",
      unit: '\%',
      href: "/data-management/r850",
      onMap: true,
      stretchRange: '[5,100]',
      public: true
    },
    {
      label: "SLHF",
      name: "SLHF",
      href: "/data-management/slhf",
      public: true
    },
    {
      label: "SLOR",
      name: "SLOR",
      href: "/data-management/slor",
      public: true
    },
    {
      label: "SSHF",
      name: "SSHF",
      href: "/data-management/sshf",
      public: true
    },
    {
      label: "TCLW",
      name: "TCLW",
      desc: "Total column cloud liquid water",
      unit: "kg/m2",
      href: "/data-management/tclw",
      onMap: true,
      stretchRange: '[0,1]',
      public: true
    },
    {
      label: "TCW",
      name: "TCW",
      href: "/data-management/tcw",
      public: true
    },
    {
      label: "TCWV",
      name: "TCWV",
      desc: "Total column vertically-integrated water vapour",
      unit: 'kg/m2',
      href: "/data-management/tcwv",
      stretchRange: '[10,20]',
      onMap: true,
      public: true
    },
    {
      label: "U250",
      name: "U250",
      href: "/data-management/u250",
      public: true
    },
    {
      label: "U850",
      name: "U850",
      desc: "Wind U-component at 850hPa",
      unit: 'm/s',
      href: "/data-management/u850",
      onMap: true,
      stretchRange: '[-5,5]',
      public: true
    },
    {
      label: "V250",
      name: "V250",
      href: "/data-management/v250",
      public: true
    },
    {
      label: "V850",
      name: "V850",
      desc: "Wind V-component at 850hPa",
      unit: 'm/s',
      href: "/data-management/v850",
      onMap: true,
      stretchRange: '[-5,5]',
      public: true
    },
    {
      label: "DEM",
      name: "DEM",
      desc: "Digital Elevation Model",
      unit: "m",
      href: "/data-management/dem",
      onMap: true,
      stretchRange: '[0,2000]',
      public: true
    },
  ]
};
