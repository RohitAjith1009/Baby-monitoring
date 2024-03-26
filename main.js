sound="";
status="";
objects=[];

function preload(){
    sound = loadSound('alarm.mp3');
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_detector=ml5.objectDetector('cocoSSD', modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
function modelLoaded(){
    console.log("modelLoaded");
    status = true;
}


function draw(){
    image(video, 0, 0, 480, 380);
    if (status != ""){
        object_detector.detect(video,gotresults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status:objectdetected";
            if(objects[i].label=="person"){
                document.getElementById("baby_status").innerHTML="BABY FOUND";
                sound.stop();
            }
            else{
                document.getElementById("baby_status").innerHTML="BABY MISSING";
                sound.play();
            }
        }
    }
}
function gotresults(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}