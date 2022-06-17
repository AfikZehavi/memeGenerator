'use strict'

var gElCanvas
var gCtx
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gStartPosf
var gDuplicator
var gIsDrag = false
var gDuplicatorPos
var gLineColor
var gLongPress
// memeInit()

function memeInit() {
    // toggle canvas and editor sections
    displayMemeSection()
    gElCanvas = document.getElementById('main-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    const meme = getMeme()
    const elContainer = document.querySelector('.canvas-container')

    elContainer.style.backgroundImage = `imgs/${meme.selectedImgId}.jpg`
    renderMeme()
    addEventListeners()
    addTouchListeners()
    window.onresize = () => resizeCanvas(true)
}
function renderMeme() {
    const meme = getMeme()
    console.log(meme.lines);
    onClearCanvas()
    onDrawImageById(meme.selectedImgId)
    onDrawText()

    onLineCountAndUpdate()
}

function resizeCanvas(isSizeChanged = false) {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    if (isSizeChanged) renderMeme()
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
        // gCtx.lineWidth = 6;
        gCtx.textAlign = memeline.align
        gCtx.fillStyle = memeline.color
        gCtx.font = `${memeline.size}px ${memeline.font}`


        gCtx.fillText(memeline.txt, memeline.startX, memeline.startY, gElCanvas.width)


        memeline.widthX = gCtx.measureText(memeline.txt).width;
    }


    )
}

function onSetLineTxt(text, size = 30) {
    // Add Line if there aren't any lines yet
    const meme = getMeme()
    if (!meme.lines || !meme.lines.length) {
        onAddLine()
    }
    setLineTxt(text, size)
    // Clear text input
    document.querySelector('.input-text-element').value = ''

    renderMeme()
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onEditText(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev);
    const idx = getTextIdx(pos)
    // renderMeme()
    if (idx > -1) {
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
    if (gTouchEvs.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.touches[0]
        //Calc the right pos according to the touch screen
        var rect = ev.target.getBoundingClientRect();
        pos = {
            x: ev.clientX - rect.left,
            y: ev.clientY - rect.top
        }
        // console.log(pos);



        // console.log(pos);

    }


    return pos
}


function onAddLine() {
    addLine()
    // onClearCanvas()
    renderMeme()

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
    if (meme.selectedLineIdx > -1 && meme.lines.length > 0) return true
}

function onChangeColor(color) {
    if (!isTextSelected()) return
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

function onAddEmoji(emoji) {

    onSetLineTxt(emoji, 60)
    renderMeme()
}

// Dragging function -->

function onGrabElement(ev) {
    // ev.preventDefault()
    const pos = getEvPos(ev);
    const idx = getTextIdx(pos)

    // console.log('work');
    if (idx > -1) {
        const meme = getMeme()
        const memeline = meme.lines[idx]
        // duplicateCanvasElement(pos.x-15, pos.y-15)

        gDuplicator = duplicateCanvasElement(pos.x - 15, pos.y - 15, meme, memeline)
        gIsDrag = true
        document.body.style.cursor = "grabbing";
    }
}

function duplicateCanvasElement(posX, posY, meme, memeline) {

    var elDuplicator = document.querySelector('.duplicator-object')

    elDuplicator.style.top = `${posY}px`
    elDuplicator.style.left = `${posX}px`
    elDuplicator.style.fontSize = `${memeline.size}px`
    elDuplicator.style.width = `${memeline.widthX}px`
    elDuplicator.style.fontFamily = memeline.font
    elDuplicator.style.color = memeline.color
    elDuplicator.innerText = memeline.txt
    elDuplicator.classList.remove('display-none')
    // onRemoveLine()
    gLineColor = memeline.color
    memeline.color = '#ffffff00'
    renderMeme()
    return elDuplicator
}
function onDragElement(ev) {
    ev.preventDefault()
    if (!gIsDrag) return
    gDuplicatorPos = getEvPos(ev)
    gDuplicator.style.top = `${gDuplicatorPos.y}px`
    gDuplicator.style.left = `${gDuplicatorPos.x}px`
}

function onPlaceElement(ev) {
    // ev.preventDefault()
    if (!gIsDrag) return
    gIsDrag = false
    gDuplicator.classList.add('display-none')
    const meme = getMeme()
    var memeline = meme.lines[meme.selectedLineIdx]
    memeline.startX = gDuplicatorPos.x
    memeline.startY = gDuplicatorPos.y + 25
    memeline.color = gLineColor
    document.body.style.cursor = "default";
    
    renderMeme()

}
function addEventListeners() {
    // Handeling mouse click event
    gElCanvas.addEventListener('click', onEditText)
    // Listening to long click event
    gElCanvas.addEventListener('mousedown', function (ev) {

        gLongPress = setTimeout(() => {
            onGrabElement(ev)
        }, 100);
    })
    gElCanvas.addEventListener('mousemove', onDragElement)
    document.querySelector('.canvas-container').addEventListener('mouseup', function () {

        if (!gLongPress) return
        clearTimeout(gLongPress)
        onPlaceElement()
    })
}

function addTouchListeners() {

    gElCanvas.addEventListener('touchstart', onGrabElement)
    gElCanvas.addEventListener('touchmove', onDragElement)
    document.querySelector('.canvas-container').addEventListener('touchend', onPlaceElement)
}