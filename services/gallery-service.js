'use strict'

const gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'trumpet'] },
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

function getImgs() {
    return gImgs
}

function filterIGalleryOnSearch(word) {
    const filteredGallery = gImgs.filter(img => {
        return img.keywords.some(keyword => keyword === word)
    })

    return filteredGallery ? filteredGallery : false
    
}