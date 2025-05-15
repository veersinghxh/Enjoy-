let seconds = 0;
const timer = document.getElementById('timer');
const callDurationLimit = 60;
let interval;

function startTimer() {
  interval = setInterval(() => {
    seconds++;
    let mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    let secs = String(seconds % 60).padStart(2, '0');
    timer.textContent = `${mins}:${secs}`;

    if (seconds >= callDurationLimit) {
      endCall();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

const mainVideo = document.getElementById('mainVideo');
mainVideo.src = 'xjjx.mp4'; // Update to CDN link if needed
mainVideo.volume = 1;

mainVideo.addEventListener('play', () => {
  if (mainVideo.muted) {
    document.getElementById('unmuteBtn').style.display = 'block';
  }
  startTimer();
});

document.getElementById('unmuteBtn').addEventListener('click', () => {
  mainVideo.muted = false;
  mainVideo.play();
  document.getElementById('unmuteBtn').style.display = 'none';
});

const webcam = document.getElementById('webcam');
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => {
    webcam.srcObject = stream;
  })
  .catch(error => {
    console.error('Webcam access error:', error);
  });

document.getElementById('endCallBtn').addEventListener('click', () => {
  if (confirm("Are you sure you want to end the call?")) {
    endCall();
  }
});

mainVideo.addEventListener('ended', () => {
  stopTimer();
  playEndSound();
  setTimeout(() => {
    window.location.href = 'end.html';
  }, 2000);
});

function playEndSound() {
  const audio = new Audio('end.mp3');
  audio.play();
}

function endCall() {
  stopTimer();
  mainVideo.pause();
  if (webcam.srcObject) {
    webcam.srcObject.getTracks().forEach(track => track.stop());
  }
  window.location.href = 'end.html';
}