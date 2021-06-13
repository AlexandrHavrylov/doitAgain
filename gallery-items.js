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

const galleryBox = document.querySelector('.js-gallery')
const modalBox = document.querySelector('.js-lightbox')
const modalImage = document.querySelector('.lightbox__image')



// Создаем разметку

const createImg = pictures.map(({preview, original,description}, index) => {
  return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${preview}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      data-index="${index}"
    />
  </a>
</li>`

}).join("")

galleryBox.innerHTML = createImg


// Открытие модалки по клику

galleryBox.addEventListener('click', onImageClik)

function onImageClik(evt) {
  evt.preventDefault()

const galleryImg = evt.target.classList.contains('gallery__image')
  if (!galleryImg) {
 return
  }
  
  modalBox.classList.add("is-open")
  

  // Получаем и устанавливаем атрибуты для полной каринки 
  const imgURL = evt.target.dataset.source
  const imgAlt = evt.target.getAttribute('alt')
  const imgIndex = evt.target.dataset.index
 
  setAtributes (imgURL, imgAlt, imgIndex)
 

  // Закрытие модалки по нажатию эскейп
    window.addEventListener("keydown", (evt) => {
    if (evt.code === 'Escape') {
     modalBox.classList.remove("is-open")
   }
  })

// Смена картинки по нажатию стрелок на клавиатуре
  window.addEventListener("keydown", imageChange) 
     
  
    }


// Закрытие модалки
modalBox.addEventListener('click', closeModal)

function closeModal(evt) {

  const modalImg = evt.target.classList.contains('lightbox__image')
  if (modalImg) {
    return
  }

  // Снятие слушателей событий по кнопкам
   window.removeEventListener("keydown", (evt) => {
    if (evt.code === 'Escape') {
     modalBox.classList.remove("is-open")
   }
  })

    window.removeEventListener("keydown", imageChange) 

  modalBox.classList.remove("is-open")


modalImage.setAttribute("src", " " )
modalImage.setAttribute("alt", " ")



}

// Смена картинок
function imageChange (evt) {
       
  const currentImg = document.querySelector('.lightbox__image')
  const currentImgIndex = currentImg.dataset.index

  if (evt.code === 'ArrowRight') {
      
    if (currentImgIndex < pictures.length - 1) {
      const nextImgIndex = Number(currentImgIndex) + 1
      const nextImg = document.querySelector(`.gallery__image[data-index="${nextImgIndex}"]`)
      const nextImgUrl = nextImg.dataset.source
      const nextImgAlt = nextImg.getAttribute("alt")

     setAtributes (nextImgUrl, nextImgAlt, nextImgIndex)
    }
  }
    
  if (evt.code === 'ArrowLeft') {

    if (currentImgIndex > 0) {
      const prevImgIndex = Number(currentImgIndex) - 1

      const prevImg = document.querySelector(`.gallery__image[data-index="${prevImgIndex}"]`)
      const prevImgUrl = prevImg.dataset.source
      const prevImgAlt = prevImg.getAttribute("alt")

    setAtributes(prevImgUrl, prevImgAlt, prevImgIndex)
    }
  }
}


function setAtributes(imgURL, imgAlt, imgIndex) {
      
   modalImage.setAttribute("src", `${imgURL}` )
  modalImage.setAttribute("alt", `${imgAlt}`)
  modalImage.setAttribute("data-index", `${imgIndex}`)
    }