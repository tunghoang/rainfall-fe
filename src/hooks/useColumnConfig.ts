import { dataConfigBase } from '@/config/data-management.config';

export const useColumnConfig = () => {
  const configColumns = dataConfigBase.filter((config) => config.isColumn);

  return {configColumns}
};