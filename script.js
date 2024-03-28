console.log("Welcome to spotify");

//
let songIndex=0;
let audioElement=new Audio('songsmp3s/_1_Band darwaze  Judaa 3  Cover by Noor Chahal.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('soundWave');
let currentSongImg=document.getElementById('nowPlayingImg');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let currentSongName=document.getElementById('currentSongName');
let songs=[
    {songName:"Band Darwaze",filePath:"songsmp3s/_1_Band darwaze  Judaa 3  Cover by Noor Chahal.mp3",coverPath:"covers/cover1.jpeg",time:"01:53"},
    {songName:"Zindegi tere naal",filePath:"songsmp3s/_2_Zindagi Tere Naal  Cover by Noor Chahal.mp3",coverPath:"covers/cover2.jpg",time:"02:34"},
    {songName:"Aaja sohneya",filePath:"songsmp3s/_3_Aaja Sohneya  Cover by Noor Chahal.mp3",coverPath:"covers/cover3.jpg",time:"01:27"},
    {songName:"Yaariyan",filePath:"songsmp3s/_4_Yaarian  Amrinder Gill  Cover by Noor Chahal  Judaa.mp3",coverPath:"covers/cover4.jpg",time:"02:08"},
    {songName:"Bhij gyi kurti lal",filePath:"songsmp3s/_5_Bhij Gayi Kurti Lal  Harbhajan Mann  Cover by Noor Chahal.mp3",coverPath:"covers/cover5.jpg",time:"01:58"},
    {songName:"Akh kashni",filePath:"songsmp3s/_6_Akh Kashni  Cover by Noor Chahal  Surinder Kaur.mp3",coverPath:"covers/cover6.jpg",time:"02:52"},
    {songName:"Chupke chupke",filePath:"songsmp3s/_7_Chupke Chupke Raat Din Raw cover by Noor Chahal.mp3",coverPath:"covers/cover7.jpg",time:"01:20"},

];

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused ||audioElement.currentTime<=0){
        audioElement.play();
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }

})

//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

//assigning song names and covers
songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].textContent=songs[i].songName;
    element.getElementsByClassName('time')[0].textContent=songs[i].time;
})
// make all timestamp play/pause bettoms to play before on clicking any song
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
//playing songs from list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused ||audioElement.currentTime<=0){
            makeAllPlays();
            songIndex=parseInt(e.target.id);
            audioElement.src=songs[songIndex].filePath;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.currentTime=0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity=1;
            currentSongImg.src=songs[songIndex].coverPath;
            currentSongName.textContent=songs[songIndex].songName;
        }
        else{
            songIndex=parseInt(e.target.id);
            let audioNow=new Audio(songs[songIndex].filePath);
            if(audioElement.src==audioNow.src){
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                gif.style.opacity=0;
            }
            else{
                makeAllPlays();
                songIndex=parseInt(e.target.id);
                audioElement.src=songs[songIndex].filePath;
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                audioElement.currentTime=0;
                audioElement.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity=1;
                console.log(audioElement.paused);
                currentSongImg.src=songs[songIndex].coverPath;
                currentSongName.textContent=songs[songIndex].songName;
            }

        }
    })

})

// previous button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
        songIndex=6;
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');

    }
    else{
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
        songIndex-=1;
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    }
    currentSongImg.src=songs[songIndex].coverPath;
    currentSongName.textContent=songs[songIndex].songName;
    audioElement.src=songs[songIndex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
//next button
function playNext(songIndex,songs){
    if(songIndex>=6){
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
        songIndex=0;
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    }
    else{
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
        songIndex+=1;
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    }
    currentSongImg.src=songs[songIndex].coverPath;
    currentSongName.textContent=songs[songIndex].songName;
    audioElement.src=songs[songIndex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    return songIndex;
}
document.getElementById('next').addEventListener('click',()=>{
    console.log(songIndex);
    playNext(songIndex,songs);
    songIndex=playNext(songIndex,songs);
}) 
//replay
document.getElementById('replay').addEventListener('click',()=>{
    audioElement.currentTime=0;
})
audioElement.addEventListener('ended',()=>{
    console.log(songIndex);
    playNext(songIndex,songs);
    songIndex=playNext(songIndex,songs)
})