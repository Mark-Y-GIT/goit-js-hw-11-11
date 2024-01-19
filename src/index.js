import refs from './refs/refs';
import axiosParams from './API/params';
import { fetchData } from './API/apiService';
import { deleteMarkup } from './templates/markup';
import { Notify } from 'notiflix';

Notify.init({ borderRadius: '20px', position: 'center-center' });

const handleSubmit = e => {
  e.preventDefault();

  if (!e.target.searchQuery.value) {
    Notify.info('Введите запрос для поиска изображения');

    return;
  }

  if (e.target.searchQuery.value === axiosParams.params.q) {
    console.log('введите новый запрос для поиска');
    return;
  }

  axiosParams.params.q = e.target.searchQuery.value;
  axiosParams.params.page = 1;

  deleteMarkup();

  fetchData(axiosParams);
};

refs.formEl.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', () => fetchData(axiosParams));
