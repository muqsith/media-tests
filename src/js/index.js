import '../styles/main.less';


const video = document.querySelector('#video');

const canvas = document.querySelector('#sc');
const canvasContext = canvas.getContext('2d');
console.log(canvasContext);

async function getMedia(constraints) {
    const stream =  await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
};

getMedia({ audio: true, video: true })
.then((result) => {
    console.log(result);
    video.srcObject = result;
    video.play();
    video.onseeked = (event) => {
        console.log('Video found the playback position it was looking for.');
      };
})
.catch((err) => {
    console.log(err);
});

document.querySelector('#capture').addEventListener('click', function (e) {
    console.log(e);
    canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
});

let intervalId = null;

function start() {
    intervalId = setInterval(() => {
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
        drawOnCanvas();
    }, 20);
}

function stop() {
    clearInterval(intervalId);
}

function drawOnCanvas() {
    canvasContext.beginPath();
    canvasContext.lineWidth = '2';
    canvasContext.strokeStyle = 'blue';
    canvasContext.rect(50, 50, 100, 100);
    canvasContext.stroke();
}


document.querySelector('#start').addEventListener('click', start);

document.querySelector('#stop').addEventListener('click', stop);

document.querySelector('#draw').addEventListener('click', drawOnCanvas);

