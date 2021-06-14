const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightBox: document.querySelector('.lightbox'),
  link: document.querySelector('.gallery__link'),
  overlay: document.querySelector('.lightbox__overlay'),
  img: document.querySelector('.lightbox__image'),
  lightboxContent: document.querySelector('.lightbox__content'),
  closeLightboxBtn: document.querySelector('.lightbox__button'),
};
const markup = markupConstructor(galleryItems);


function markupConstructor(galleryItems) {
  return galleryItems.map(({ preview, original, description}, idx) => {
        return `
        <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index-number="${idx}"
      alt="${description}"
    />
  </a>
</li>
`;
    }).join('');   
};

refs.gallery.insertAdjacentHTML('afterbegin', markup);

let modalPicture = refs.img;

const onGalleryClick = (e) => {
  e.preventDefault();
  let newPicture = modalPicture;
  const imageSource = e.target.dataset.source;
  // const imageIndex = e.target.dataset.indexNumber;
  const dataset = e.target.dataset.indexNumber;
  const imageAlt = e.target.alt;
  refs.lightBox.classList.toggle('is-open');

  newPicture.src = imageSource;
  newPicture.alt = imageAlt;
  newPicture.dataset.indexNumber = dataset;
   refs.overlay.addEventListener('click', modalClose, { once: true });
  // console.log(newPicture);

// Выход с помощью ESC или нажимая на overlay
  
  // refs.lightBox.addEventListener('keydown', onArrowRightClick);
  // refs.lightBox.addEventListener('keydown', onArrowLeftClick);
  return modalPicture = newPicture;
};

const imageData = document.querySelectorAll('.gallery__image');


refs.gallery.addEventListener('click', onGalleryClick);

const modalClose = (e) => {
  refs.lightBox.classList.remove('is-open');
  
  // location.reload();
  

  modalPicture.src = '';
  modalPicture.alt = '';
};
refs.overlay.addEventListener('click', modalClose, { once: true });
refs.closeLightboxBtn.addEventListener('click', modalClose);

const onKeyPress = (e) => {
    if (e.key !== "Escape" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") {
      return;
    };
    if (e.key === "Escape") {
      console.log("escape");
      modalClose();
    };
    
    if (e.key === "ArrowRight") {
      onArrowRightClick();
    };
    if (e.key === "ArrowLeft") {
      onArrowLeftClick();
    };
  };
  window.addEventListener('keydown', onKeyPress);

function onArrowRightClick() {
  let newPicture = modalPicture;
  console.log(newPicture);
  let number = Number(modalPicture.dataset.indexNumber);
        for (let i = number; i < imageData.length; i++) {
          if (newPicture.dataset.indexNumber === number.toString() && number <imageData.length - 1) {
            number += 1;
            const newImage = imageData[`${number}`];
            console.log(newImage);
            newPicture.src = newImage.dataset.source;
            newPicture.alt = newImage.dataset.alt;
            newPicture.dataset.indexNumber = newImage.dataset.indexNumber;
            return newPicture;
          };
        }
};

function onArrowLeftClick() {
  let newPicture = modalPicture;
  let number = Number(modalPicture.dataset.indexNumber);
        for (let i = number; i < imageData.length; i++) {
          if (newPicture.dataset.indexNumber === number.toString() && number >= 1) {
            number -= 1;
            const newImage = imageData[`${number}`];
            newPicture.src = newImage.dataset.source;
            newPicture.alt = newImage.dataset.alt;
            newPicture.dataset.indexNumber = newImage.dataset.indexNumber;
          };
          return newPicture;
        }
};