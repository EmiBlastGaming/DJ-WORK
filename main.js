leftwristx = 0
leftwristy = 0
rightwristx = 0
rightwristy = 0
leftwristscore = 0
rightwristscore = 0
volumen = 1
velocidad = 1

function setup() {
    canvas = createCanvas(600, 400);
    background("yellow");
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    POSE = ml5.poseNet(video, modelLoaded)
    POSE.on("pose", Result)
    video.size(600, 400)
}
function draw() {
    translate(video.width, 0)
    scale(-1, 1)
    image(video, 0, 0, 600, 400);
    fill("yellow")
    circle(rightwristx, rightwristy, 20)
    fill("orange")
    circle(leftwristx, leftwristy, 20)
    if(rightwristscore >0.2) {
        volumen = Number(rightwristy)
        volumen = floor(volumen)
        volumen = volumen / 400
        volumen = 1 - volumen
        volumen = Math.round(volumen*10) / 10
        song.setVolume(volumen)
        document.getElementById("volume").innerHTML = "Volumen: " + volumen
    }
    if(leftwristscore >0.2) {
        if(leftwristy >300) {
            velocidad = 0.5
        } else if(leftwristy >200) {
            velocidad = 1
        } else if(leftwristy >100) {
            velocidad = 1.5
        } else if(leftwristy >50) {
            velocidad = 2.0
        }
        song.rate(velocidad)
        document.getElementById("speed").innerHTML = "Velocidad: " + velocidad
    }
}
function preload() {
    song = loadSound("music.mp3")
}
function play() {
    song.play()
}
function stop() {
    song.stop()
}
function modelLoaded() {
    console.log("Modelo cargado...")
}
function Result(poses) {
    if(poses.length >0) {
        console.log(poses)
        leftwristx = poses[0].pose.leftWrist.x
        leftwristy = poses[0].pose.leftWrist.y
        rightwristx = poses[0].pose.rightWrist.x
        rightwristy = poses[0].pose.rightWrist.y
        leftwristscore = poses[0].pose.keypoints[9].score
        rightwristscore = poses[0].pose.keypoints[10].score
    } else {
        console.log("oops")
    }
}