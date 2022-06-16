'use strict'
const gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'cat'] },

];

//  <div class="img-container" style="grid-column: 1;">
// <img src="imgs/1.jpg" >
// </div>

function galleryInit() {
    displayGallerySection()
    renderGallery()
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const strHTMLs = gImgs.map((img) =>
        `<div class="img-container" onclick="onImgSelect(${img.id})">
            <img src="${img.url}" >
        </div>`
    )

    elGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
}

function displayGallerySection() {
    document.querySelector('.canvas-editor').classList.add('display-none')
    document.querySelector('.canvas-container').classList.add('display-none')
    document.querySelector('.saved-memes-container').classList.add('display-none')
    document.querySelector('.gallery-container').classList.remove('display-none')
}