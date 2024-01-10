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
var progressUpdateInterval; // Variable to store the interval ID


function updateProgress() {
    var percentage = (backgroundAudio.currentTime / backgroundAudio.duration) * 100;

    // Gradually increase the slider value
    var currentPercentage = parseFloat(progressSlider.value);
    var targetPercentage = Math.min(percentage, currentPercentage + 1); // Adjust the increment as needed

    animateSlider(currentPercentage, targetPercentage);
}

// Function to animate the slider gradually
function animateSlider(currentValue, targetValue) {
    var duration = 1000; // Duration of the animation in milliseconds
    var startTime = Date.now();

    function update() {
        var currentTime = Date.now();
        var elapsedTime = currentTime - startTime;
        var progress = Math.min(1, elapsedTime / duration);
        var newValue = currentValue + (targetValue - currentValue) * progress;

        progressSlider.value = newValue.toFixed(2); // Round to 2 decimal places

        if (progress === 1) {
            clearInterval(animationInterval);
        }
    }

    var animationInterval = setInterval(update, 16); // Run the update function approximately every 16 milliseconds
}


// Function to seek the song to a specific position based on the slider value
function seekSong(value) {
    var newPosition = (value / 100) * backgroundAudio.duration;
    backgroundAudio.currentTime = newPosition;
}

function playPause(playDiv) {
    // Assuming bar is a global variable
    var bar = document.getElementById("playbar");
    // Get the computed style of the bar element
    var barDisplayStyle = window.getComputedStyle(bar).getPropertyValue("display");

    if (barDisplayStyle === 'none') {
        // Display the bar with a fade-in effect
        bar.style.display = 'block';
        setTimeout(function () {
            bar.style.opacity = '1';
        }, 10); // A small delay to allow the display property to take effect
    } else {
        // Hide the bar with a fade-out effect
        bar.style.opacity = '0';
        setTimeout(function () {
            bar.style.display = 'none';
        }, 500); // Adjust the duration to match the transition duration in CSS
    }

    var song = playDiv.parentNode.getAttribute("data-song");
    if (song === currentPlaying && !backgroundAudio.paused) {
        // Pause the audio and store the current playback position
        currentPlaybackPosition = backgroundAudio.currentTime;
        backgroundAudio.pause();
        playDiv.innerHTML = '<img src="img/svg/play.svg">';
        clearInterval(progressUpdateInterval); // Clear the interval
    } else {
        // Set the new song and resume playback
        backgroundAudio.src = song;

        // Wait for the audio to load, then set the playback position and play
        backgroundAudio.addEventListener("loadedmetadata", function () {
            backgroundAudio.currentTime = currentPlaybackPosition;
            backgroundAudio.play();
            playDiv.innerHTML = '<img src="img/svg/pause.svg">';
            // Set an interval to update the progress regularly
            progressUpdateInterval = setInterval(updateProgress, 1000);
        }, { once: true });
    }

    currentPlaying = song;
}

// Add a click event listener to reset the currentPlaying on button click
document.getElementById("mute").addEventListener("click", function () {
    currentPlaying = null;
});

function toggleMute() {
    backgroundAudio.muted = !backgroundAudio.muted;
}

function adjustVolume() {
    backgroundAudio.volume = volumeControl.value;
}

// Call updateProgress every 1000 milliseconds (1 second)
setInterval(function () {
    updateProgress();
}, 1000);

backgroundAudio.addEventListener("ended", function () {
    // Hide all animation divs when the song ends
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

// It will return you all the div(in the form of array) that have a class panel


