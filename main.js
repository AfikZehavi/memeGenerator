'use strict'
var gLastLink
var isMobileNavOpen = false
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

function openGalleryMobile() {
    toggleMobileNevigation()
    galleryInit();
}

function openSavedMemesMobile() {
    toggleMobileNevigation()
    savedMemesInit()
}

function toggleMobileNevigation() {
    const el = document.querySelector('.hamburger-button')
    if(!isMobileNavOpen){
        const mobileNav =  document.querySelector('.mobile-navigation')
        mobileNav.style.transform = 'translateY(5%)'
        document.body.style.overflow = 'hidden'
        el.classList.add('spin-anim')
        el.innerText = '✖'
        setTimeout(() => {
            el.classList.remove('spin-anim')
        }, 1000);
    } else {
        const mobileNav =  document.querySelector('.mobile-navigation')
        mobileNav.style.transform = 'translateY(-100%)'
        document.body.style.overflow = 'auto'
        el.classList.add('spin-anim')
        el.innerText = '☰'
        setTimeout(() => {
            el.classList.remove('spin-anim')
        }, 1000);
    }
    isMobileNavOpen = !isMobileNavOpen
}