import { dataConfigBase } from '@/config/data-management.config';

export const useCreateFormConfig = () => {
  const createInputFields = dataConfigBase.filter((config) => config.createFormConfig);

  return {createInputFields};
};