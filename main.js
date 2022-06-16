'use strict'
var gLastLink
function openGallery(elLink = document.getElementById('gallery-link')) {
    // gLastLink = elLink
    changeLinkTextColor(elLink)
    galleryInit();
}

function openSavedMemes(elLink) {
    changeLinkTextColor(elLink)
    savedMemesInit()
}

function changeLinkTextColor(elLink) {
    if (gLastLink) {
        gLastLink.classList.remove('active-link');
    }
    elLink.classList.add('active-link');
    gLastLink = elLink;

}