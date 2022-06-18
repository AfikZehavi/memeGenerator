'use strict'
var gLastLink
var isMobileNavOpen = false
function openGallery(elLink = document.getElementById('gallery-link')) {
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
    const mobileNav =  document.querySelector('.mobile-navigation')
    if(!isMobileNavOpen){
        mobileNav.style.transform = 'translateY(5%)'
        document.body.style.overflow = 'hidden'
        el.classList.add('spin-anim')
        el.innerText = '✖'
        setTimeout(() => {
            el.classList.remove('spin-anim')
        }, 1000);

    } else {

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