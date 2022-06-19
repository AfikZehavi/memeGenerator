'use strict'

var gElCanvas
var gCtx
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gStartPos
var gLongPress



function memeInit() {
    // toggle canvas and editor sections
    displayMemeSection()
    gElCanvas = document.getElementById('main-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    renderCanvas()
    renderSizeRange()
    addEventListeners()
    addTouchListeners()
    window.onresize = () => resizeCanvas(true)
}
function renderCanvas() {
    const meme = getMeme()
    onDrawImageById(meme.selectedImgId)

    onLineCountAndUpdate()
}
function renderSizeRange() {
    const slider = document.querySelector(".size-range-input")
    const min = slider.min
    const max = slider.max
    const value = slider.value
    slider.style.background = `linear-gradient(to right, orange 0%, orange ${(value - min) / (max - min) * 100}%, #DEE2E6 ${(value - min) / (max - min) * 100}%, #DEE2E6 100%)`

    slider.oninput = function () {
        this.style.background = `linear-gradient(to right, orange 0%, orange ${(this.value - this.min) / (this.max - this.min) * 100}%, #DEE2E6 ${(this.value - this.min) / (this.max - this.min) * 100}%, #DEE2E6 100%)`
        onChangeSize(this.value)
    };
}

function resizeCanvas(isSizeChanged = false) {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    if (isSizeChanged) renderCanvas()
}

function onDrawImageById(src) {
    var img = new Image(500, 500);
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        onDrawText()
    }
    img.src = src
}

function onDrawText() {
    var meme = getMeme()
    meme.lines.forEach((memeline) => {
        // gCtx.globalCompositeOperation = 'destination-over'
   
        gCtx.textAlign = memeline.align
        gCtx.fillStyle = memeline.color
        gCtx.font = `${memeline.size}px ${memeline.font}`
        gCtx.lineWidth = 4;
        gCtx.strokeStyle = 'black'
        gCtx.strokeText(memeline.txt, memeline.startX, memeline.startY)

        gCtx.fillText(memeline.txt, memeline.startX, memeline.startY, gElCanvas.width)


        memeline.widthX = gCtx.measureText(memeline.txt).width;
    }


    )
}

function onSetLineTxt(text) {
    // Add Line if there aren't any lines yet
    // ev.preventDefault()
    const meme = getMeme()
    if (!meme.lines || !meme.lines.length) {
        onAddLine()
    }
    setLineTxt(text)
    // Clear text input
    document.querySelector('.input-text-element').value = ''

    renderCanvas()
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onEditText(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev);
    const idx = getTextIdx(pos)

    if (idx > -1) {
        var elInputText = document.querySelector('.input-text-element')
        const elInputRange = document.querySelector('.size-range-input')
        const meme = getMeme()
        onLineCountAndUpdate()
        if (meme.lines[idx]) {
            elInputText.value = meme.lines[idx].txt
            elInputRange.value = meme.lines[idx].size
            renderSizeRange()
        }

    }
}


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

    }


    return pos
}


function onAddLine() {
    addLine()
    renderCanvas()

}

function onChangeSize(size = 30) {
    if (!isTextSelected()) return
    changeSize(size)
    renderCanvas()
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
    renderCanvas()
}

function isTextSelected() {
    const meme = getMeme()
    if (meme.selectedLineIdx > -1 && meme.lines.length > 0) return true
}

function onChangeColor(color) {
    if (!isTextSelected()) return
    changeTextColor(color)
    renderCanvas()
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
    renderCanvas()
}

function onRemoveLine() {
    if (!isTextSelected()) return
    removeLine()
    document.querySelector('.input-text-element').value = ''
    renderCanvas()
}

function onFontChange(font) {
    if (!isTextSelected()) return
    changeFont(font)
    renderCanvas()
}

function onSaveMeme() {
    const meme = getMeme()
    saveMeme(meme)
    togglePopUp('Saved to meme gallery')
}

function displayMemeSection() {
    document.querySelector('.canvas-editor').classList.remove('display-none')
    document.querySelector('.canvas-container').classList.remove('display-none')
    document.querySelector('.gallery-page').classList.add('display-none')
    document.querySelector('.saved-memes-container').classList.add('display-none')
}

function onAddEmoji(emoji) {
    onAddLine()
    onSetLineTxt(emoji)
    renderCanvas()
    // var text = document.querySelector('.input-text-element').value
    // text += emoji
    // onSetLineTxt(text)

}
function onDownloadMeme(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')// image/jpeg the default format
    elLink.href = imgContent
    togglePopUp('Downlading...')
}

function onShareMeme() {
    gElCanvas.toBlob(async (img) => {
        const files = [new File ([img], 'image.jpeg', {type: img.type})]
        const shareData = {
            files, 
        }
        if (navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error(err.name, err.message)
                }
            }
        }
    })
}
    
    


/////// Dragging function -->

function onGrabElement(ev) {
    const pos = getEvPos(ev);
    const idx = getTextIdx(pos)

    if (idx > -1) {
        const meme = getMeme()
        const memeline = meme.lines[idx]
        setElementDrag(true)
        gStartPos = pos
        gElCanvas.style.cursor = "grabbing";

    }
}

function onDragElement(ev) {
    ev.preventDefault()
    const meme = getMeme()
    const memeline = meme.lines[meme.selectedLineIdx]
    if (memeline && memeline.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        moveElement(dx, dy)
        gStartPos = pos
        renderCanvas()
    }

}

function onPlaceElement() {
    const memeline = getMeme().lines[getMeme().selectedLineIdx]
    if (!memeline) return
    setElementDrag(false)
    gElCanvas.style.cursor = 'grab'

}



/////// Calling Events and defining long press events
function addEventListeners() {
    // Handeling mouse click event
    gElCanvas.addEventListener('click', onEditText)
    // Listening to long click event
    gElCanvas.addEventListener('mousedown', function (ev) {
        onEditText(ev)
        if (gLongPress) clearTimeout(gLongPress)
        gLongPress = setTimeout(() => {

            onGrabElement(ev)
        }, 150);
    })
    gElCanvas.addEventListener('mousemove', onDragElement)
    document.querySelector('.canvas-container').addEventListener('mouseup', function () {

        // if (!gLongPress) return
        clearTimeout(gLongPress)
        onPlaceElement()
    })
}

function addTouchListeners() {

    gElCanvas.addEventListener('touchstart', function (ev) {
        onEditText(ev)
        if (gLongPress) clearTimeout(gLongPress)
        gLongPress = setTimeout(() => {
            onGrabElement(ev)
        }, 100);
    })
    gElCanvas.addEventListener('touchmove', onDragElement)
    document.querySelector('.canvas-container').addEventListener('touchend', function () {

        if (!gLongPress) return
        clearTimeout(gLongPress)
        onPlaceElement()
    })
}
