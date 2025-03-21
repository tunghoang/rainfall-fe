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
      label: "HIMAWARI",
      name: "deepModel",
      href: "/data-management/deepModel",
      public: true,
      onMap: true
    },
    {
      label: "AWS",
      name: "AWS",
      href: "/data-management/aws",
      public: true,
      onMap: true
    },
    {
      label: "integrated",
      name: "integrated",
      href: "/data-management/integrated",
      public: true,
      onMap: true
    },
    {
      label: "IMERG_E",
      name: "IMERG_E",
      href: "/data-management/imerg_e",
      public: true
    },
    {
      label: "IMERG_L",
      name: "IMERG_L",
      href: "/data-management/imerg_l",
      public: true
    },
    {
      label: "IMERG_F",
      name: "IMERG_F",
      href: "/data-management/imerg_f",
      public: true
    },
    {
      label: "GSMaP",
      name: "GSMaP",
      href: "/data-management/gsmap",
      public: true
    },
    {
      label: "CCS",
      name: "CCS",
      href: "/data-management/ccs",
      public: true
    },
    {
      label: "FY4A",
      name: "FY4A",
      href: "/data-management/fy4a",
      public: true
    }
  ]
};
