
const imgs={
    signupImg:`https://res.cloudinary.com/dii16awkb/image/upload/v1684522130/signgupSvg_hawhuc.webp`,
    hero:`https://pbs.twimg.com/media/DrgpTAGXgAg9ZAg?format=jpg&name=large`,
    user:`https://res.cloudinary.com/dii16awkb/image/upload/v1684053261/unprofile_ji7zus_z2immz.png`,
    laptop:'https://res.cloudinary.com/dii16awkb/image/upload/v1686059916/laptop-clipart-animasi-1_zzi2wf.webp',
    play:'https://res.cloudinary.com/dii16awkb/image/upload/v1686059268/png-transparent-play-icon-video-player-information-play-icon-miscellaneous-angle-text_ru7mzw.png',
    giveTalk:'https://res.cloudinary.com/dii16awkb/image/upload/v1686129032/Latest-SSB-Lecturate-Topics-2017_kf3cz1.jpg'
}

export  const imgService={
    getImg,
}

function getImg(type){
        return imgs[type]
}
