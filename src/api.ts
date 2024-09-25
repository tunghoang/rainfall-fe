import { toast } from "react-toastify";

const BASE_URL = 'http://127.0.0.1:8888/api';

export const getDatasets = async (
  productName: string, 
  resolution: number,
  // 4 || 10 
  frequency: string,
  //  'daily' || 'hourly'
  fromTime?: Date, 
  toTime?: Date,
  mockData?: any[]
) => {
  const url = `${BASE_URL}/datasets/${productName}/${resolution}/${frequency}`;

  const params = new URLSearchParams();

  if(fromTime) {
    params.append('fromTime', fromTime.toISOString());
  }

  if(toTime) {
    params.append('toTime', toTime.toISOString());
  }

  const queryString = params.toString();

  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const response = await fetch(`${url}?${queryString}`);
    const data = await response.json();
    return data;
  } catch {
    toast.error('Failed to fetch data', { autoClose: 1000 });
    return mockData || [];
  }

}

export const postDataset = async (
  productName: string,
  resolution: number,
  frequency: string,
  time: Date,
  img: File
) => {
  const url = `${BASE_URL}/datasets`;

  const formData = new FormData();
  formData.append('productName', productName);
  formData.append('resolution', resolution.toString());
  formData.append('frequency', frequency);
  formData.append('time', time.toISOString());
  formData.append('img', img);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch {
    toast.error('Failed to create dataset', {autoClose: 2000});
    throw new Error('Failed to create dataset');
  }
}
