import { toast } from "react-toastify";
import { debounce } from 'lodash'

import {formatDate, formatDateTime, toISOStringWithTimezone} from "@/utils"

//const BASE_URL = 'http://127.0.0.1:8888/api';
const BASE_URL = '/api';

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
    params.append('from_time', formatDate(fromTime));
  }

  if(toTime) {
    params.append('to_time', formatDate(toTime));
  }

  const queryString = params.toString();

  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const response = await fetch(`${url}?${queryString}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail)
    }
    return data;
  } 
  catch(err) {
    toast.error(err.message, { autoClose: 1000 });
    return mockData || [];
  }

}

export const postDataset = async (
  product: string,
  resolution: string,
  frequency: string,
  time: Date,
  img: File,
  token: string
) => {
  const _token = token || localStorage.getItem('token')
  const url = `${BASE_URL}/datasets`;

  const formData = new FormData();
  formData.append('product', product);
  formData.append('resolution', resolution.toString());
  formData.append('frequency', frequency);
  formData.append('time', toISOStringWithTimezone(time));
  formData.append('img', img);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${_token}`
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(JSON.stringify(data))
    }
    return data;
  } catch {
    toast.error('Failed to create dataset', {autoClose: 2000});
    throw new Error('Failed to create dataset');
  }
}

export const deleteDatasets = async (ids: string[], token: string) => {
  const _token = token || localStorage.getItem('token')
  const url = `${BASE_URL}/datasets`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({ids}),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${_token}`
      }
    });
    const data = await response.json()
    if (response.status !== 200) {
        throw new Error(response.statusText)
    }
    toast.success('Success')
  }
  catch(e) {
    toast.error(e.message)
  }
}

export const downloadDataset = async (id_: string, token) => {
  const url = `${BASE_URL}/datasets/download/${id_}`
  try {
    const _token = token || localStorage.getItem('token')
    if (!_token || _token === 'undefined' || _token === 'null') {
        throw new Error('User not logged in')
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${_token}`
        }, 
    });
    const blob = await response.blob()
    const _url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = _url
    a.download = `${id_}.tif`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
  catch(e) {
    toast.error(e.message)
    throw e
  }
}

export const downloadDatasetRaw = async (id_: string) => {
  const url = `${BASE_URL}/datasets/download/${id_}`
  try {
    const response = await fetch(url)
    return response
  }
  catch(e) {
    toast.error(e.message)
    throw e
  }
}

export const downloadDatasetRaw1 = async (product: string, resolution:int, frequency:string, time:Date) => {
  const url = `${BASE_URL}/datasets/download/${product}/${resolution}/${frequency}/${formatDateTime(time)}`
  try {
    const response = await fetch(url)
    return response
  }
  catch(e) {
    toast.error(e.message)
    throw e
  }
}
export const downloadDatasetRaw2 = async (product: string, resolution:int, frequency:string, timeStr:string, token:string) => {
  const url = `${BASE_URL}/datasets/download/${product}/${resolution}/${frequency}/${timeStr}`
  try {
    const _token = token || localStorage.getItem('token')
    /*if (!_token || _token === 'undefined' || _token === 'null') {
        throw new Error('User not logged in')
    }*/
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${_token}`
        }, 
    });
    return response
  }
  catch(e) {
    toast.error(e.message)
    throw e
  }
}

export const getDateTimeLimits = async (product: string, resolution: string, frequency: string) => {
  const url = `${BASE_URL}/datasets/time_limits/${product}/${resolution}/${frequency}`
  try {
    const response = await fetch(url)
    const limits = await response.json();
    if (!response.ok) {
        throw new Error(JSON.stringify(limits))
    }
    return limits
  }
  catch(e) {
    toast.error(e.message)
    throw e
  }
}

export const login = async (username, password) => {
    const url = `${BASE_URL}/users/login`
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                u: username,
                p: password
            }),
        });

        const payload = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(payload))
        }
        return payload
    }
    catch(e) {
        toast.error(e.message)
        throw e
    }
}

export const listUsers = async (limit, offset, token) => {
    const _token = token || localStorage.getItem('token')
    const url = `${BASE_URL}/users?limit=${limit}&offset=${offset}`
    try {
        if (!_token || _token === 'undefined' || _token === 'null') {
            throw new Error('User not logged in')
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${_token}`
            }, 
        });

        const payload = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(payload))
        }
        return payload
    }
    catch(e) {
        toast.error(e.message)
        throw e
    }
}

export const newUser = async (user, token) => {
    const _token = token || localStorage.getItem('token')
    const url = `${BASE_URL}/users`
    try {
        if (!_token || _token === 'undefined' || _token === 'null') {
            throw new Error('User not logged in')
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${_token}`
            }, 
            body: JSON.stringify(user)
        });

        const payload = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(payload))
        }
        return payload
    }
    catch(e) {
        toast.error(e.message)
        throw e
    }
}
export const deleteUsers = async (userIds, token) => {
    const _token = token || localStorage.getItem('token')
    const url = `${BASE_URL}/users`
    try {
        if (!_token || _token === 'undefined' || _token === 'null') {
            throw new Error('User not logged in')
        }
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${_token}`
            }, 
            body: JSON.stringify({userIds: userIds})
        });

        const payload = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(payload))
        }
        return payload
    }
    catch(e) {
        toast.error(e.message)
        throw e
    }
}
export const getLocations = async (level,gid, token) => {
    const _token = token || localStorage.getItem('token')
    const url = `${BASE_URL}/locations`
    try {
        if (!_token || _token === 'undefined' || _token === 'null') {
            throw new Error('User not logged in')
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${_token}`
            }, 
            body: JSON.stringify({action: 'get', gid, level})
        });

        const payload = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(payload))
        }
        return payload
    }
    catch(e) {
        toast.error(e.message)
        throw e
    }
}
export const searchLocations = async (searchStr, cbFn, token) => {
    const _token = token || localStorage.getItem('token')
    const url = `${BASE_URL}/locations`
    try {
        if (!_token || _token === 'undefined' || _token === 'null') {
            throw new Error('User not logged in')
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${_token}`
            }, 
            body: JSON.stringify({action: 'search', query: searchStr})
        });

        const payload = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(payload))
        }
        cbFn(payload)
    }
    catch(e) {
        toast.error(e.message)
        throw e
    }
}
export const debouncedSearchLocations = debounce(searchLocations, 1000)
export const getLocation = async (gid, token) => {
    const _token = token || localStorage.getItem('token')
    const url = `/geoserver/gadm/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gadm%3Aau&outputFormat=application%2Fjson&featureId=au.${gid}`
    try {
        if (!_token || _token === 'undefined' || _token === 'null') {
            throw new Error('User not logged in')
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const payload = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(payload))
        }
        return payload
    }
    catch(e) {
        toast.error(e.message)
        throw e
    }
}

export const analyze = async (product, gid, level, from, to, token) => {
    const _token = token || localStorage.getItem('token')
    const url = `${BASE_URL}/analyze`
    console.log("analyze")
    try {
        if (!_token || _token === 'undefined' || _token === 'null') {
            throw new Error('User not logged in')
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${_token}`
            }, 
            body: JSON.stringify({product, gid, level, fromDate: from, to})
        });

        if (response.status === 200) {
            const payload = await response.json()
            return payload
        }
        else {
            const payload = await response.json()
            throw new Error(JSON.stringify(payload))
        }
    }
    catch(e) {
        toast.error(e.message)
        throw e
    }
}

export const getDescription = async (product) => {
    const url = `${BASE_URL}/describe/${product}/${localStorage.getItem('lang') || 'en'}`
    try {
        const response = await fetch(url);

        if (response.status === 200) {
            const payload = await response.json()
            return payload
        }
        else {
            const payload = await response.json()
            throw new Error(JSON.stringify(payload))
        }
    }
    catch(e) {
        toast.error(e.message)
        throw e
    }
}
