'use strict'
const MEMES_KEY = 'memesDB'
var gSavedMemes = []

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [],
}

function getTextIdx(clickedPos) {
    const idx = gMeme.lines.findIndex((line) => {
        const { startX, startY, widthX, size } = line
        return clickedPos.x > startX && clickedPos.x < startX + widthX && clickedPos.y < startY && clickedPos.y > startY - size
    })


    if (idx !== -1) {
        gMeme.selectedLineIdx = idx
        return idx
    }
    // return idx === -1 ? null : idx
}
function getMeme() {
    return gMeme
}

function setLineTxt(text, size = 30) {
    // if (!gMeme.selectedLineIdx) return
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    gMeme.lines[gMeme.selectedLineIdx].size = size

}

function setImg(imgId) {
    gMeme.lines =[]
    gMeme.selectedImgId = imgId;
    memeInit()
}

function addLine() {
    var newLine = {
        startX: gElCanvas.width / 3,
        startY: gElCanvas.height / 2,
        txt: 'Enter Text...',
        widthX: 0,
        size: 30,
        font: "impact",
        align: 'left',
        color: 'white',
        isDrag: false,
    }

    gMeme.lines.push(newLine);
}

function setElementDrag(idx, isDrag) {
    gMeme.lines[idx].isDrag = isDrag;
}

function moveElement(idx, dx, dy) {
    gMeme.lines[idx].x = dx;
    gMeme.lines[idx].y = dy;
}

function increaseSize() {
    var memeline = gMeme.lines[gMeme.selectedLineIdx]
    memeline.size += 10
}

function decreaseSize() {
    var memeline = gMeme.lines[gMeme.selectedLineIdx]
    memeline.size -= 10

}
function alignText(direction) {
    var memeline = gMeme.lines[gMeme.selectedLineIdx]
    switch (direction) {
        case 'end':
            memeline.startX = gElCanvas.width / 15
            break;
    
        case 'center':
            memeline.startX = gElCanvas.width / 3
            break;

        case 'start':
            memeline.startX = gElCanvas.width / 1.5
            break;
    }
}

function changeTextColor(color) {
    var memeline = gMeme.lines[gMeme.selectedLineIdx]
    memeline.color = color
}

function changeSelectedLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++
    } else {
        gMeme.selectedLineIdx = 0
    }
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}

function changeFont(font) {
    const memeline = gMeme.lines[gMeme.selectedLineIdx]
    memeline.font = `${font}`
}

function saveMeme(meme) {
    const memeDataURL = setCanvasToDataURL()
    const newMeme = Object.assign({}, meme, {url: memeDataURL})
    gSavedMemes.push(newMeme)
    

    _savedMemesToStorage()
}

function _savedMemesToStorage() {
    saveToStorage(MEMES_KEY, gSavedMemes)
}

function _loadSavedMemes() {
    return loadFromStorage(MEMES_KEY)
}

function getSavedMemes() {
    if (!gSavedMemes || !gSavedMemes.length) {
        gSavedMemes = _loadSavedMemes()
    }

    return gSavedMemes
}

function loadMeme(idx) {
    gMeme = gSavedMemes[idx]
    memeInit()
}

function setCanvasToDataURL() {
    return gElCanvas.toDataURL()
}