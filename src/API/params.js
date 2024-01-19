const axiosParams = {
  method: 'get',
  url: 'https://pixabay.com/api/',
  params: {
    key: '23240141-7440ad27c2a7f631b6af362f8',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 10,
    q: '',
  },
};

export default axiosParams;
