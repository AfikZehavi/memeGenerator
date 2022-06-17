'use strict'
var gNewSavedMemes
function savedMemesInit() {
    displaySavedMemesSection()
    gNewSavedMemes = getSavedMemes()
    if (gNewSavedMemes) renderMemesGallery()
}

function renderMemesGallery() {
    const elGallery = document.querySelector('.saved-memes-container')
    const strHTMLs = gNewSavedMemes.map((meme) =>
    `<div class="img-container" id=${gNewSavedMemes.indexOf(meme)} onclick="onOpenMeme(this.id)">
        <img src="${meme.url}" >
    </div>`
)
elGallery.innerHTML = strHTMLs.join('')

}
function onOpenMeme(idx) {
    loadMeme(idx)
}

function displaySavedMemesSection() {
    document.querySelector('.canvas-editor').classList.add('display-none')
    document.querySelector('.canvas-container').classList.add('display-none')
    document.querySelector('.gallery-page').classList.add('display-none')
    document.querySelector('.saved-memes-container').classList.remove('display-none')
}