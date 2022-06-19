'use strict'
var gLoadedMemes
var gIsVisible = false
function savedMemesInit() {
    displaySavedMemesSection()
    gLoadedMemes = getSavedMemes()
    if (gLoadedMemes) renderMemesGallery()
    toggleUserMessage()

}

function renderMemesGallery() {
    const elGallery = document.querySelector('.saved-memes-container')
    elGallery.innerHTML = `<div class="delete-message-container">
    <h3>Delete meme?</h3>
    <div class="del-buttons-container">
        <button class="btn-yes" style="cursor: pointer;">Yes</button>
        <button class="btn-no" style="cursor: pointer;">No</button</>
    </div>
</div>`
    const strHTMLs = gLoadedMemes.map((meme) =>
        `<div class="img-container" style="position: relative;"id=${gLoadedMemes.indexOf(meme)} onclick="onOpenMeme(this.id)">
        <img src="${meme.url}" >
        <button class="delete-meme-btn" onclick="getUserAnswer(event, ${gLoadedMemes.indexOf(meme)})">
        <i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
    </div>`
    )
    elGallery.innerHTML += strHTMLs.join('')

}
function onOpenMeme(idx) {
    loadMeme(idx)
    memeInit()
}
function _onRemoveMeme(idx, choice) {

    if (!choice) return
    gLoadedMemes.splice(idx, 1);
    saveToStorage(MEMES_KEY, gLoadedMemes)
    renderMemesGallery()

}

function getUserAnswer(ev, idx) {
    ev.stopPropagation();
    toggleUserMessage(true)

    document.querySelector('.btn-yes').addEventListener('click', function () {
        _onRemoveMeme(idx, true)
        toggleUserMessage()
    })
    document.querySelector('.btn-no').addEventListener('click', function () {
        toggleUserMessage()
        return
    })
}

function toggleUserMessage(isVisible = false) {
    const deleteMessage = document.querySelector('.delete-message-container')
    if (isVisible) {
        deleteMessage.style.visibility  = 'visible'

    } else {
        deleteMessage.style.visibility  = 'hidden'
    }
}
function displaySavedMemesSection() {
    document.querySelector('.canvas-editor').classList.add('display-none')
    document.querySelector('.canvas-container').classList.add('display-none')
    document.querySelector('.gallery-page').classList.add('display-none')
    document.querySelector('.saved-memes-container').classList.remove('display-none')
}
