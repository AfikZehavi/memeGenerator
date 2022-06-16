'use strict'

var gElCanvas
var gCtx
const gTouchEvs = ['dblclick', 'touchmove', 'touchend']
var gStartPosf
// memeInit()

function memeInit() {
    // toggle canvas and editor sections
    displayMemeSection()
    gElCanvas = document.getElementById('main-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    const meme = getMeme()
    renderMeme()
    addEventListeners()
}
function renderMeme() {
    const meme = getMeme()
    onClearCanvas()
    onDrawImageById(meme.selectedImgId)
    onDrawText()
    onLineCountAndUpdate()
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

function onDrawText() {
    var meme = getMeme()
    meme.lines.forEach((memeline) => {
        gCtx.globalCompositeOperation = 'destination-over'
        gCtx.lineWidth = 6;
        gCtx.textAlign = memeline.align
        gCtx.fillStyle = memeline.color
        gCtx.font = `${memeline.size}px ${memeline.font}`


        gCtx.fillText(memeline.txt, memeline.startX, memeline.startY, gElCanvas.width)


        memeline.widthX = gCtx.measureText(memeline.txt).width;
    }


    )
}

function onSetLineTxt(text) {
    // Add Line if there aren't any lines yet
    const meme = getMeme()
    if (!meme.lines || !meme.lines.length) {
        onAddLine()
    }
    setLineTxt(text)
    renderMeme()
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onEditText(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev);
    const idx = getTextIdx(pos)
    console.log('here work');
    renderMeme()
    if (idx) {
        var elInputText = document.querySelector('.input-text-element')
        const meme = getMeme()
        if (meme.lines[idx]) elInputText.value = meme.lines[idx].txt
    }



}

// function onDown(ev) {
//     const pos = getEvPos(ev)
//     const idx = getTextIdx(pos)

//     if (idx) {
//         setElementDrag(idx, true)
//         //Save the pos we start from 
//         gStartPos = pos
//         document.body.style.cursor = 'grabbing' 
//     }
// }

// function onMove(ev) {
//     var pos = getEvPos(ev)
//     const idx = getTextIdx(pos)
//     const meme = getMeme()

//     if (meme.lines[idx].isDrag) {
//         pos = getEvPos(ev)

//         const dx = pos.x - gStartPos.x
//         const dy = pos.y - gStartPos.y

//         moveElement(idx, dx, dy)
//         gStartPos = pos
//         //The canvas is render again after every move
//         renderCanvas()
//     }
// }

// function onUp() {
//     setElementDrag(idx, false)
//     document.body.style.cursor = 'grab'
// }

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
    return pos
}


function onAddLine() {
    addLine()
    // onClearCanvas()
    renderMeme()

}


function addEventListeners() {
    gElCanvas.addEventListener('click', onEditText)
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function onIncreaseSize() {
    if (!isTextSelected()) return
    increaseSize()
    renderMeme()
}

function onDecreaseSize() {
    if (!isTextSelected()) return
    decreaseSize()
    renderMeme()
}

function onTextAlign(alignValue) {
    if (!isTextSelected()) return
    switch (alignValue) {
        case 'align-left':
            alignText('end')
            break;

        case 'align-center':
            alignText('center')
            break;

        case 'align-right':
            alignText('start')
            break;
    

    }
    renderMeme()
}

function isTextSelected() {
    const meme = getMeme()
    if (meme.selectedLineIdx > -1 &&  meme.lines.length > 0) return true 
}

function onChangeColor(color) {
    // console.log(color);
    if(!isTextSelected()) return
    changeTextColor(color)
    renderMeme()
}

function onLineCountAndUpdate() {
    const elCounter = document.querySelector('.line-focus')
    const meme = getMeme()

    if (isTextSelected()) {
        elCounter.innerText = `${meme.selectedLineIdx + 1}/${meme.lines.length}`
    }
    else {
        elCounter.innerText = `${meme.selectedLineIdx}/${meme.lines.length}`
    }
}

function onChangeLine() {
    // console.log('work');
    changeSelectedLine()
    renderMeme()
}

function onRemoveLine() {
    if (!isTextSelected()) return
    removeLine()
    renderMeme()
}

function onFontChange(font) {
    if (!isTextSelected()) return
    changeFont(font)
    renderMeme()
}

function onSaveMeme() {
    const meme = getMeme()
    saveMeme(meme)
}

function displayMemeSection() {
    document.querySelector('.canvas-editor').classList.remove('display-none')
    document.querySelector('.canvas-container').classList.remove('display-none')
    document.querySelector('.gallery-container').classList.add('display-none')
    document.querySelector('.saved-memes-container').classList.add('display-none')
}
