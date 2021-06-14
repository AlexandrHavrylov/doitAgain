const pictures = [
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

const galleryEl = document.querySelector('.js-gallery')

const modalContainer = document.querySelector(".js-lightbox")
const modalImg = document.querySelector(".lightbox__image")

const imgEl = galleryGenerator(pictures);

galleryEl.insertAdjacentHTML('afterbegin', imgEl)

/* Генератор разметки*/

function galleryGenerator(pictures) {
  return pictures.map(({ preview, original, description }) => {
    return ` <li class= "gallery__item">
      <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  }
  
  ).join("")
}

const openModal = galleryEl.addEventListener('click', onImageClick)

/* Открытие модалки с правльной картинкой*/

function onImageClick(evt) {

  evt.preventDefault()
  
  const imgEl = evt.target.classList.contains('gallery__image')

  if (!imgEl) {
 return
  }
  const imgURL = evt.target.dataset.source
  const imgALT = evt.target.getAttribute("alt")
  
  modalContainer.classList.add ("is-open")

  setImgAtributes(imgURL, imgALT)

  window.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      modalContainer.classList.remove("is-open")
    }
  })
}

/* Поулчаем атрибуты для картинки в модалке*/

function setImgAtributes(url, alt) {
  modalImg.setAttribute("src", `${url}`)
  modalImg.setAttribute("alt", `${alt}`) 
}

/* Закрытие модалки*/
modalContainer.addEventListener('click', closeModal)

function closeModal(evt) {

  const isModalOpen = modalContainer.classList.contains("is-open")
  if (!isModalOpen) {
    return
  }
  else if (evt.target === modalImg) {
    return
  };

  modalContainer.classList.remove("is-open")
  
   /* Закртые по клику на кнопку ескейп */
  window.removeEventListener("keydown")
    
    atributesCleaning()

}

/* Чистим атрибуты*/

function atributesCleaning() {
  modalImg.setAttribute("src", " ")
  modalImg.setAttribute("alt", " ")
}

window.addEventListener('keydown', imageSwitch)

function imageSwitch(evt) {
  const isModalOpen = modalContainer.classList.contains("is-open")
  if (!isModalOpen) {
    return
  }
  
  if (evt.code === "ArrowRight") {

    for (let i = 0; i < pictures.length - 1; i++) {
      if (modalImg.src === pictures[i].original) {
        modalImg.src = pictures[(i += 1)].original
      }
    }
  }

    if (evt.code === "ArrowLeft") {

      for (let i = 1; i < pictures.length; i++) {
        if (modalImg.src === pictures[i].original) {
          modalImg.src = pictures[(i-=1)].original
        }
      
      }
      }
    }

