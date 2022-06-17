'use strict'

function galleryInit() {
    displayGallerySection()
    renderGallery()

}

function renderGallery(imgs = getImgs()) {
    const elGallery = document.querySelector('.gallery-container')
    const strHTMLs = imgs.map((img) => {

        return `<div class="img-container" onclick="onImgSelect(${img.id})">
            <img src="${img.url}" >
        </div>`
    }
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
    document.querySelector('.gallery-page').classList.remove('display-none')
}

function onSearch(e) {
    e.preventDefault()
    const searchInput = document.querySelector('.search-input')
    const keyword = searchInput.value
    document.querySelector('.search-input').value = ''
    const filteredGallery = filterIGalleryOnSearch(keyword.toLowerCase())
    filteredGallery.length ? renderGallery(filteredGallery) : renderGallery()
}
