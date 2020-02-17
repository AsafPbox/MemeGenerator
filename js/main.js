'use strict;'

// default values :

// var gDefaultFontSize = 40;
var gDefaultFontSizeUpperLine = 40;
var gDefaultFontSizeLowerLine = 40;
var gDefaultUpperLinePos = { posX: 275, posY: 50 };
var gDefaultLowerLinePos = { posX: 275, posY: 500 };

// 

var gCanvas;
var gCtx;
var gImg;
var gCurrentImgSrc;

var gMeme = {
    selectedImgId: '',
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: gDefaultFontSizeUpperLine,
            align: 'center',
            color: '#ffffff'
        },
        {
            txt: '',
            size: gDefaultFontSizeLowerLine,
            align: 'center',
            color: '#ffffff'
        }
    ]
};

function init() {
    renderGallery()
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
}

function renderGallery() {
    var gallery = gImgs;
    var strHTMLs = gallery.map(function (img){
        return `
        <img src=${img.url} class="image" id="img${img.id}" onclick="showGen(this)">`
    })
    var elGalleryList = document.querySelector('.image-gallery');
    elGalleryList.innerHTML = strHTMLs.join('');
}

function showGen(elImg) {
    var memeImg = elImg;
    gMeme.selectedImgId = memeImg.src.split('/')[4].split('.')[0] // need regex
    gCurrentImgSrc = memeImg.src;
    document.querySelector('.image-gallery').style.display = 'none'
    document.querySelector('.MemeGen').style.display = 'grid';
    // gDefaultFontSizeUpperLine = 40;
    // gDefaultFontSizeLowerLine = 40;
    drawImg(elImg.src)
    writeLine()
}

function drawImg() {
    img = new Image()
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText()
    }
    img.src = gCurrentImgSrc;
}

function drawText() {
    gCtx.lineWidth = '2';
    // gCtx.strokeStyle = 'black'
    gCtx.fillStyle = gMeme.lines[0].color;
    gCtx.textAlign = gMeme.lines[0].align
    gCtx.font = gDefaultFontSizeUpperLine.toString() + 'px impact';
    gCtx.fillText(gMeme.lines[0].txt, gDefaultUpperLinePos.posX, gDefaultUpperLinePos.posY);
    gCtx.strokeText(gMeme.lines[0].txt, gDefaultUpperLinePos.posX, gDefaultUpperLinePos.posY);

    gCtx.fillStyle = gMeme.lines[1].color;
    gCtx.textAlign = gMeme.lines[1].align
    gCtx.font = gDefaultFontSizeLowerLine.toString() + 'px impact';
    gCtx.fillText(gMeme.lines[1].txt, gDefaultLowerLinePos.posX, gDefaultLowerLinePos.posY)
    gCtx.strokeText(gMeme.lines[1].txt, gDefaultLowerLinePos.posX, gDefaultLowerLinePos.posY)
}

function writeLine() {
    document.querySelector('#inputLine').addEventListener('keyup', function () {
        if (gMeme.selectedLineIdx === 0) {
            gMeme.lines[0].txt = this.value;
        } else {
            gMeme.lines[1].txt = this.value;
        }
        drawImg()
    });
}

function switchLine() {
    document.querySelector('#inputLine').value = ''
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = 1;
        document.querySelector('input').value = gMeme.lines[1].txt;
    }
    else {
        gMeme.selectedLineIdx = 0;
        document.querySelector('input').value = gMeme.lines[0].txt;
    }
}

function getCurrentLine() {
    return gMeme.selectedLineIdx
}


// need to combine both function to one 
function moveLineUp() {
    if (getCurrentLine() === 0) {
        console.log(gDefaultUpperLinePos.posY)
        if (gDefaultUpperLinePos.posY <= 35) return
        gDefaultUpperLinePos.posY -= 5;
        drawImg()
    }
    else if (getCurrentLine() === 1) {
        if (gDefaultLowerLinePos.posY <= 35) return;
        gDefaultLowerLinePos.posY -= 5;
        drawImg()
    }
}

function moveLineDown() {
    if (getCurrentLine() === 0) {
        console.log(gDefaultUpperLinePos.posY)
        if (gDefaultUpperLinePos.posY === 495) return;
        gDefaultUpperLinePos.posY += 5;
        drawImg()
    }
    else if (getCurrentLine() === 1) {
        if (gDefaultLowerLinePos.posY === 495) return;
        gDefaultLowerLinePos.posY += 5;
        drawImg()
    }
}

// need to combine both function to one 
function increaseFontSize() {
    if (getCurrentLine() === 0) {
        if (gDefaultFontSizeUpperLine === 55) return;
        else {
            gDefaultFontSizeUpperLine += 1;
            drawImg()
        }
    } else if (getCurrentLine() === 1) {
        if (gDefaultFontSizeLowerLine === 55) return;
        else {
            gDefaultFontSizeLowerLine += 1;
            drawImg()
        }
    }
}

function decreaseFontSize() {
    if (getCurrentLine() === 0) {
        if (gDefaultFontSizeUpperLine === 35) return;
        else {
            gDefaultFontSizeUpperLine -= 1;
            drawImg()
        }
    } else if (getCurrentLine() === 1) {
        if (gDefaultFontSizeLowerLine === 35) return;
        else {
            gDefaultFontSizeLowerLine -= 1;
            drawImg()
        }
    }
}

function saveMeme() {
    console.log('saveMeme');
}

function shareMeme(event) { // not working yet
    var elShareForm = document.querySelector('#shareForm')
    console.log(elShareForm)
    console.log('event :', event)
    uploadImg(elShareForm, event);
}

function openGallery() {
    document.querySelector('.image-gallery').style.display = 'grid';
    document.querySelector('.MemeGen').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.body.classList.remove('menu-open');
}


function openAbout(){ // need to improve function to detect which model is open
    document.body.classList.remove('menu-open');
    document.querySelector('.image-gallery').style.display = 'none';
    document.querySelector('.MemeGen').style.display = 'none';
    document.querySelector('.about').style.display = 'grid';
}

function openGenerator() { // note : need to continue;
    document.body.classList.remove('menu-open');
    document.querySelector('.image-gallery').style.display = 'none'
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.MemeGen').style.display = 'grid';
    if (gCurrentImgSrc === undefined) {
        gCurrentImgSrc = document.querySelectorAll('img')[0].src;
        drawImg(gCurrentImgSrc)
        writeLine()
    };
}

function onGetColor() {
    elColorInput = document.querySelector('#setColor');
    elColorInput.addEventListener('input', function () {
        if (getCurrentLine() === 0) gMeme.lines[0].color = elColorInput.value;
        else { gMeme.lines[1].color = elColorInput.value };
        drawImg()
    })
}

function onSetAlign(alignId) {
    console.log(alignId)
    switch (alignId) {
        case 'setAlignLeft':
            console.log('Left')
            var align = 'left';
            break;
        case 'setAlignCenter':
            console.log('Center')
            var align = 'center';
            break;
        case 'setAlignRight':
            console.log('right')
            var align = 'right';
            break;
    }
    if (getCurrentLine() === 0) gMeme.lines[0].align = align;
    else { gMeme.lines[1].align = align };
}

function downloadMeme(elLink) {
    var memeContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = memeContent
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}
