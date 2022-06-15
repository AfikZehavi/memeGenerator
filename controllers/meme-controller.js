'use strict'

var gElCanvas
var gCtx
const gTouchEvs = ['dblclick', 'touchmove', 'touchend']
init()

function init() {
    gElCanvas = document.getElementById('main-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    // console.log('hii');
    renderMeme()
    addMouseListeners()
}
function renderMeme() {
    const meme = getMeme()
    onDrawImageById(meme.selectedImgId)
    onDrawText(meme.lines[0])
    console.log(meme['lines'][0]);
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onDrawImageById(id) {
    var img = new Image(500, 500);
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    img.src = `imgs/${id}.jpg`

}

function onDrawText(memeline) {
    gCtx.globalCompositeOperation = 'destination-over'
    gCtx.lineWidth = 6;
    gCtx.textAlign = memeline.align
    gCtx.fillStyle = memeline.color
    gCtx.font = `${memeline.size}px Impact`


    gCtx.fillText(memeline.txt, memeline.startX, memeline.startY, gElCanvas.width)


    memeline.widthX = gCtx.measureText(memeline.txt).width;
    console.log('textWidth', memeline.widthX);

}

function onSetLineTxt(text) {
    onClearCanvas()
    setLineTxt(text)
    renderMeme()
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onEditText(ev) {
    const pos = getEvPos(ev);
    if (!isTextClicked(pos)) return
    console.log('success');
}



function getEvPos(ev) {

    //Gets the offset pos , the default pos
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    // if (gTouchEvs.includes(ev.type)) {
    //     //soo we will not trigger the mouse ev
    //     ev.preventDefault()
    //     //Gets the first touch point
    //     ev = ev.changedTouches[0]
    //     //Calc the right pos according to the touch screen
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    //     }
    // }
    console.log(pos);
    return pos
}

function addMouseListeners() {
    gElCanvas.addEventListener('dblclick', onEditText)
}