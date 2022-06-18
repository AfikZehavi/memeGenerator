'use strict'
var gNewSavedMemes
var gIsVisible = false
function savedMemesInit() {
    displaySavedMemesSection()
    gNewSavedMemes = getSavedMemes()
    if (gNewSavedMemes) renderMemesGallery()
    popUserMessage()

}

function renderMemesGallery() {
    const elGallery = document.querySelector('.saved-memes-container')
    elGallery.innerHTML = `<div class="delete-message-container">
    <h3>Are You Sure?</h3>
    <div class="del-buttons-container">
        <button class="btn-yes" style="cursor: pointer;">Yes</button>
        <button class="btn-no" style="cursor: pointer;">No</button</>
    </div>
</div>`
    const strHTMLs = gNewSavedMemes.map((meme) =>
        `<div class="img-container" style="position: relative;"id=${gNewSavedMemes.indexOf(meme)} onclick="onOpenMeme(this.id)">
        <img src="${meme.url}" >
        <button class="delete-meme-btn" onclick="getUserAnswer(event, ${gNewSavedMemes.indexOf(meme)})"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
    </div>`
    )
    elGallery.innerHTML += strHTMLs.join('')

}
function onOpenMeme(idx) {
    loadMeme(idx)
}
function _onRemoveMeme(idx, choice) {


    console.log(idx, choice);

    if (!choice) return
    gNewSavedMemes.splice(idx, 1);
    saveToStorage(MEMES_KEY, gNewSavedMemes)
    renderMemesGallery()

}

function getUserAnswer(ev, idx) {
    ev.stopPropagation();
    popUserMessage(true)

    document.querySelector('.btn-yes').addEventListener('click', function () {
        _onRemoveMeme(idx, true)
        popUserMessage()
    })
    document.querySelector('.btn-no').addEventListener('click', function () {
        popUserMessage()
        return
    })
}

function popUserMessage(isVisible = false) {
    const deleteMessage = document.querySelector('.delete-message-container')
    if (isVisible) {
        deleteMessage.style.visibility = 'visible'
    } else {
        deleteMessage.style.visibility = 'hidden'
    }
}
function displaySavedMemesSection() {
    document.querySelector('.canvas-editor').classList.add('display-none')
    document.querySelector('.canvas-container').classList.add('display-none')
    document.querySelector('.gallery-page').classList.add('display-none')
    document.querySelector('.saved-memes-container').classList.remove('display-none')
}
