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
var progressSlider = document.getElementById("progressSlider");
var currentPlaybackPosition = 0;
var progressUpdateInterva


function updateProgress() {
    var percentage = (backgroundAudio.currentTime / backgroundAudio.duration) * 100;
    var currentPercentage = parseFloat(progressSlider.value);
    var targetPercentage = Math.min(percentage, currentPercentage + 1); 

    animateSlider(currentPercentage, targetPercentage);
}


function animateSlider(currentValue, targetValue) {
    var duration = 1000; 
    var startTime = Date.now();

    function update() {
        var currentTime = Date.now();
        var elapsedTime = currentTime - startTime;
        var progress = Math.min(1, elapsedTime / duration);
        var newValue = currentValue + (targetValue - currentValue) * progress;

        progressSlider.value = newValue.toFixed(2); 

        if (progress === 1) {
            clearInterval(animationInterval);
        }
    }

    var animationInterval = setInterval(update, 16); 
}


function seekSong(value) {
    var newPosition = (value / 100) * backgroundAudio.duration;
    backgroundAudio.currentTime = newPosition;
}

function playPause(playDiv) {
    var bar = document.getElementById("playbar");
    var barDisplayStyle = window.getComputedStyle(bar).getPropertyValue("display");

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
           
            progressUpdateInterval = setInterval(updateProgress, 1000);
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




