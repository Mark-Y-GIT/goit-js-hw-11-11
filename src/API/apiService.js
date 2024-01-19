import axios from 'axios';
import refs from '../refs/refs';
import axiosParams from './params';
import { insertMarkup } from '../templates/markup';
import { Notify } from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

// export const fetchData = params => {
//   axios(params)
//     .then(res => {
//       const {
//         data: { hits },
//       } = res;

//       axiosParams.params.page += 1;
//       insertMarkup(hits);

//       refs.loadMoreBtn.classList.remove('is-hidden');
//     })
//     .catch(err => console.log(err))
//     .finally(() => {
//       refs.formEl.reset();
//     });
// };

export const fetchData = async params => {
  try {
    refs.loadMoreBtn.classList.add('is-hidden');
    Loading.dots();
    const response = await axios(params);
    const { data } = response;

    if (!data.totalHits) {
      Loading.remove();
      Notify.info("We're sorry, but there is no results.");
      refs.formEl.reset();
      axiosParams.params.q = '';

      return;
    }

    if (!data.hits.length) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      Loading.remove();
      return;
    }

    axiosParams.params.page += 1;
    insertMarkup(data.hits);

    Loading.remove(500);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 4,
      behavior: 'smooth',
    });

    refs.loadMoreBtn.classList.remove('is-hidden');
    refs.formEl.reset();
  } catch (error) {
    refs.formEl.reset();
    axiosParams.params.q = '';
    Loading.remove();
    Notify.failure(error);
  }
};
