import refs from '../refs/refs';

export const createMarkup = data => {
  return data
    .map(
      el =>
        `<div class="photo-card">
 <div class="thumb"> <img src=${el.webformatURL} alt=${el.tags} loading="lazy" /></div>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      <span>${el.likes}</span>
    </p>
    <p class="info-item">
      <b>Views:</b>
      <span>${el.views}</span>
    </p>
    <p class="info-item">
      <b>Comments:</b>
      <span>${el.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      <span>${el.downloads}</span>
    </p>
  </div>
</div>`
    )
    .join('');
};

export const insertMarkup = data => {
  const markup = createMarkup(data);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
};

export const deleteMarkup = () => (refs.gallery.innerHTML = '');
