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
const musicProgress = musicWrap.querySelector(".progress");
const musicProgressBar = musicWrap.querySelector(".progress .bar");
const musicProgressCurrent = musicWrap.querySelector(".progress .timer .current");
const musicProgressDuratiuon = musicWrap.querySelector(".progress .timer .duration");
const musicRepeat = musicWrap.querySelector("#control-repeat");
const musicListBtn = musicWrap.querySelector("#control-list");
const musicList = musicWrap.querySelector(".music__list");
const musicListUL = musicWrap.querySelector(".music__list ul");

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

// 반복 버튼 클릭
musicRepeat.addEventListener("click", ()=>{
    let getAttr = musicRepeat.getAttribute("class");

    switch(getAttr){
        case "repeat" :
            musicRepeat.setAttribute("class", "repeat_one");
            musicRepeat.setAttribute("title", "한곡 반복");
        break;
        case "repeat_one" :
            musicRepeat.setAttribute("class", "shuffle");
            musicRepeat.setAttribute("title", "랜덤 반복");
        break;
        case "shuffle" :
            musicRepeat.setAttribute("class", "repeat");
            musicRepeat.setAttribute("title", "전체반복");
        break;
    }
});

// 오디오가 끝나면
musicAudio.addEventListener("ended", ()=>{
    let getAttr = musicRepeat.getAttribute("class");

    switch(getAttr){
        case "repeat" :
            nextMusic();
        break;
        case "repeat_one" :
            playMusic();
        break;
        case "shuffle" :
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1);   //랜덤한 인덱스를 생성함. Math.random()은 0~1 사이의 랜덤한 수를 출력
            
            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1);
            } while (musicIndex == randomIndex) // 현재 재생된느 곡의 인덱스와 랜덤한 곡의 인덱스가 같으면 새로운 랜덤 인덱스를 생성
            musicIndex = randomIndex;
            loadMusic(musicIndex);
            playMusic();
        break;
    }
});

// 진행 버튼 클릭
musicProgress.addEventListener("click", (e)=>{
    let progressWidth = musicProgress.clientWidth; // 진행바의 전체 길이
    let clickedOffsetX = e.offsetX; // 진행바를 기준으로 측정되는 클릭한 부분의 X좌표
    let songduration = musicAudio.duration; //오디오 전체 길이. 위에 있지만 가져오기가 어려워서 새로 만들었음.
    
    musicAudio.currentTime = (clickedOffsetX / progressWidth) * songduration; //클릭 부분이 전체에서 차지하는 비율을 백분율로 표시
});

// 뮤직 리스트 버튼 클릭
musicListBtn.addEventListener("click", ()=>{
    musicList.classList.add("show");
});

// 뮤직 리스트 구현하기
for(let i=0; i<allMusic.length; i++){
    let li = `
        <li>
            <strong>${allMusic[i].name}</strong>
            <em>${allMusic[i].artist}</em>
            <span>재생시간</span>
        </li>
    `;
    musicListUL.innerHTML += li;
}


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


// 로드
window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
});