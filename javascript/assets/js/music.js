const allMusic = [
    {
        name: "Addict (Instrumental)",
        artist: "NEFFEX",
        img: "music_img1",
        audio: "music_audio01"
    },
    {
        name: "Chasing the Dragons",
        artist: "Joel Cummins, Kris Myers, Andy Farag",
        img: "music_img2",
        audio: "music_audio02"
    },
    {
        name: "Gemini",
        artist: "half.cool",
        img: "music_img3",
        audio: "music_audio03"
    },
    {
        name: "Housin",
        artist: "Yung Logos",
        img: "music_img4",
        audio: "music_audio04"
    },
    {
        name: "I Feel It All So Deeply",
        artist: "Bail Bonds",
        img: "music_img5",
        audio: "music_audio05"
    },
    {
        name: "I Just Wanna Be Great",
        artist: "NEFFEX",
        img: "music_img6",
        audio: "music_audio06"
    },
    {
        name: "Inspired (Instrumental)",
        artist: "NEFFEX",
        img: "music_img7",
        audio: "music_audio07"
    },
    {
        name: "Insta Beat Vixens",
        artist: "half.cool",
        img: "music_img8",
        audio: "music_audio08"
    },
    {
        name: "Island Dream",
        artist: "Chris Haugen",
        img: "music_img9",
        audio: "music_audio09"
    },
    {
        name: "Resolve",
        artist: "Joel Cummins",
        img: "music_img10",
        audio: "music_audio10"
    },
]

const musicWrap = document.querySelector(".music__wrap");
const musicView = musicWrap.querySelector(".music__view .img img");
const musicName = musicWrap.querySelector(".music__view .title h3");
const musicArtist = musicWrap.querySelector(".music__view .title p");
const musicAudio = musicWrap.querySelector("#main-audio");
const musicPlay = musicWrap.querySelector("#control-play");
const musicPause = musicWrap.querySelector("#control-pause");
const musicPrevBtn = musicWrap.querySelector("#control-prev");
const musicNextBtn = musicWrap.querySelector("#control-next");
const musicProgressBar = musicWrap.querySelector(".progress .bar");
const musicProgressCurrent = musicWrap.querySelector(".progress .timer .current");
const musicProgressDuratiuon = musicWrap.querySelector(".progress .timer .duration");

let musicIndex = 1;

// 음악 재생
function loadMusic(num){
    musicName.innerText = allMusic[num-1].name;
    musicArtist.innerText = allMusic[num-1].artist;
    musicView.src = "../assets/img/"+allMusic[num-1].img+".png";
    musicView.art = allMusic[num-1].name;
    musicAudio.src = "../assets/audio/"+allMusic[num-1].audio+".mp3";
}

// 재생
function playMusic(){
    musicAudio.play();
    musicWrap.classList.add("paused");
    musicPlay.setAttribute("class", "stop");
    musicPlay.title = "정지"
}

// 정지
function pauseMusic(){
    musicAudio.pause();
    musicWrap.classList.remove("paused");
    musicPlay.setAttribute("class", "play");
    musicPlay.title = "재생"
}

// 이전 곡 듣기
function prevMusic(){
    musicIndex == 1 ? musicIndex = allMusic.length : musicIndex--;
    loadMusic(musicIndex);
    playMusic()
}

// 다음 곡 듣기
function nextMusic(){
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;
    loadMusic(musicIndex);
    playMusic()
}
// 음악 진행 바
musicAudio.addEventListener("timeupdate", e =>{
    const currentTime = e.target.currentTime; //오디오의 현재 재생된 시간
    const duration = e.target.duration; //오디오의 총 재생 시간
    let progressWidth = (currentTime / duration) * 100;   //총 재생시간 중 현재 재생시간이 차지하는 비율을 백분율로 나타냄

    musicProgressBar.style.width = `${progressWidth}%`;

    // 전체시간
    musicAudio.addEventListener("loadeddata", ()=>{
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60); //전체 시간을 분 단위로 쪼개어 줌
        let totalSec = Math.floor(audioDuration % 60); //전체 시간를 분단위로 쪼개어 남은 초를 저장
        if (totalSec < 10) totalSec = `0${totalSec}`; //초를 두자리로 표시함
        musicProgressDuratiuon.innerText = `${totalMin}:${totalSec}`; //완성된 시간 문자열을 출력
    });

    // 진행시간
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10) currentSec = `0${currentSec}`;
    musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;
});

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
});

// 플레이 버튼 클릭
musicPlay.addEventListener("click", ()=>{
    const isMusicPaused = musicWrap.classList.contains("paused"); //음악이 재생됨
    isMusicPaused ? pauseMusic() : playMusic();
});

// 이전곡 버튼 클릭
musicPrevBtn.addEventListener("click", ()=>{
    prevMusic();
});

//다음곡 버튼 클릭
musicNextBtn.addEventListener("click", ()=>{
    nextMusic();
});