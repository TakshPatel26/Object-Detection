Status = "";
Bottle_image = "";
objects = [];

function preload(){
    Bottle_image = loadImage("Bottle.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(Bottle_image,gotResults);
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(Bottle_image,0,0,640,350);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text("Bottle" + " " + percent + "%",objects[i].x-345, objects[i].y-78);
            noFill();
            stroke("#fc0303");7
            rect(objects[i].x-350, objects[i].y-90, objects[i].width, objects[i].height-770);
        }
    }
}