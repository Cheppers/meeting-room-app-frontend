import axios from 'axios';

export const getData = (url, token) => axios({
  method: 'GET',
  url,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.data.data);

export const postData = (url, token, formData) => axios({
  method: 'POST',
  url,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  },
  data: formData,
})
  .then((response) => response)
  .catch((err) => err);
