'use strict'

function galleryInit() {
    displayGallerySection()
    renderGallery()

}

function renderGallery(imgs = getImgs()) {
    const elGallery = document.querySelector('.gallery-container')
    
    //////Define the upload button first
    elGallery.innerHTML = `<div class="upload-img-container img-upload" onclick="onUploadImg(event)">
    <label for="file-upload" class="upload-img-symbol"><i class="fa fa-upload" aria-hidden="true"></i></label>
    <input type="file" id="file-upload">
    </div>`
    const strHTMLs = imgs.map((img) => {

        return `<div class="img-container" onclick="onImgSelect(${img.id})">
                <img src="${img.url}" >
                </div>`
    }
    )

    elGallery.innerHTML += strHTMLs.join('')
}

function onImgSelect(imgId) {
    const src = `imgs/${imgId}.jpg`
    setImg(src)
}

function onUploadImg(e) {

    var reader = new FileReader()
    reader.onload = function (event) {
        var img = new Image()
        img.onload = function () {
            setImg(img.src)
        }
        img.src = event.target.result
        img.id = 'uploaded-image'
        
    }
    reader.readAsDataURL(e.target.files[0])
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
    const filteredGallery = filterIGalleryOnSearch(keyword.toLowerCase())
    filteredGallery.length ? renderGallery(filteredGallery) : renderGallery()
}
