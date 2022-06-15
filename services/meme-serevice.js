'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            startX: 150,
            startY: 100,
            txt: 'I sometimes eat Falafel',
            widthX: 0,
            size: 40,
            align: 'left',
            color: 'black'
        }
    ],
}

function isTextClicked(clickedPos) {
    // const startX = gMeme['lines'][0].x 
    // const startY = gMeme['lines'][0].y
    // const txtWidth = gMeme['lines'][0].txtWidth

    const { startX, startY, widthX, size } = gMeme.lines[0]
    console.log(startX);
    return clickedPos.x > startX && clickedPos.x < startX + widthX && clickedPos.y < startY && clickedPos.y > startY - size
}
function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    gMeme['lines'][gMeme.selectedLineIdx]['txt'] = text
    console.log(gMeme['lines'][gMeme.selectedLineIdx]['txt']);
}