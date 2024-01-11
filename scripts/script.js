function togglePlaylists() {
    const set1 = document.getElementById('Set1');
    const set2 = document.getElementById('Set2');

    if (set1.style.display === 'block') {
        set1.style.display = 'none';
        set2.style.display = 'block';
    } else {
        set1.style.display = 'block';
        set2.style.display = 'none';
    }
}

var backgroundAudio = document.getElementById("backgroundAudio");
var currentPlaying = null;
var progressElement = document.getElementById("progressElement");
var volumeControl = document.getElementById("volumeControl");
var progressSlider = document.getElementById("progressSlider"); // New progress slider
var currentPlaybackPosition = 0;
var progressUpdateInterval;


function seekSong(value) {
    var newPosition = (value / 100) * backgroundAudio.duration;
    backgroundAudio.currentTime = newPosition;
}

function playPause(playDiv) {
    var bar = document.getElementById("playbar");
    var back = document.getElementsByClassName("right")[0];
    var barDisplayStyle = window.getComputedStyle(bar).getPropertyValue("display");

    back.style.transition = 'background-image 5s ease';

    if (barDisplayStyle === 'none') {
        bar.style.display = 'block';
        setTimeout(function () {
            bar.style.opacity = '1';
        }, 10);
    } else {
        bar.style.opacity = '0';
        setTimeout(function () {
            bar.style.display = 'none';
        }, 500);
    }

    var song = playDiv.parentNode.getAttribute("data-song");
    if (song === currentPlaying && !backgroundAudio.paused) {
        currentPlaybackPosition = backgroundAudio.currentTime;
        backgroundAudio.pause();
        playDiv.innerHTML = '<img src="img/svg/play.svg">';
        clearInterval(progressUpdateInterval);
    } else {
        backgroundAudio.src = song;
        backgroundAudio.addEventListener("loadedmetadata", function () {
            backgroundAudio.currentTime = currentPlaybackPosition;
            backgroundAudio.play();
            playDiv.innerHTML = '<img src="img/svg/pause.svg">';
            // Set an interval to update the progress regularly
            progressUpdateInterval = setInterval(updateProgress, 1000);
        }, { once: true });

        backgroundAudio.addEventListener("ended", function () {

            bar.style.opacity = '0';
            setTimeout(function () {
                bar.style.display = 'none';
            }, 500);

            playDiv.innerHTML = '<img src="img/svg/play.svg">';
        }, { once: true });
    }
    currentPlaying = song;
}


document.getElementById("mute").addEventListener("click", function () {
    currentPlaying = null;
});

function toggleMute() {
    backgroundAudio.muted = !backgroundAudio.muted;
}

function adjustVolume() {
    backgroundAudio.volume = volumeControl.value;
}

setInterval(function () {
    updateProgress();
}, 1000);

backgroundAudio.addEventListener("ended", function () {
    hideAnimationDivs();
});

function updateProgress() {
    var currentTime = formatTime(backgroundAudio.currentTime);
    var duration = formatTime(backgroundAudio.duration);
    progressElement.textContent = "Playtime : " + currentTime + " / " + duration;
}

function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function hideAnimationDivs() {
    var animationDivs = document.querySelectorAll(".animationDiv");
    animationDivs.forEach(function (div) {
        div.style.display = "none";
    });
}
function toggleNav() {
    document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left="0"
})
}

function OffNav() {
    document.getElementById("homeIcon").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-100%"
})
}
