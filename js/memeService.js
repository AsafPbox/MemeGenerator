'use strict;'

var gImgs = setImages();

function getImg(imgId){
    return gImgs.find(img => imgId === img.id);
}

function setImages(){
    var images = [
        [1, 'img/1.jpg', ['funny']],
        [2, 'img/2.jpg', ['cute']],
        [3, 'img/3.jpg', ['cute']],
        [4, 'img/4.jpg', ['animal']],
        [5, 'img/5.jpg', ['funny']],
        [6, 'img/6.jpg', ['funny']],
        [7, 'img/7.jpg', ['funny']],
        [8, 'img/8.jpg', ['weird']],
        [9, 'img/9.jpg', ['funny']],
        [10, 'img/10.jpg', ['funny']],
        [11, 'img/11.jpg', ['weird']],
        [12, 'img/12.jpg', ['weird']],
        [13, 'img/13.jpg', ['awesome']],
        [14, 'img/14.jpg', ['awesome']],
        [15, 'img/15.jpg', ['awesome']],
        [16, 'img/16.jpg', ['funny', 'awesome']],
        [17, 'img/17.jpg', ['awesome']],
        [18, 'img/18.jpg', ['awesome', 'weird']],
    ].map(img => setImgProperties(...img))       
    return images;
}

function setImgProperties(imgId, imgUrl, imgKeywords){
    return {
        id : imgId,
        url : imgUrl,
        keywords : imgKeywords
    }
}

