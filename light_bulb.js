Status = "";
Light_Bulb_image = "";
objects = [];
function preload(){
    Light_Bulb_image = loadImage("Bulb.jpg");
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
    object_Detector.detect(Light_Bulb_image,gotResults);
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(Light_Bulb_image,0,0,640,350);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text("Light bulb"+ " " + percent + "%",objects[i].x+23, objects[i].y-2);
            noFill();
            stroke("#fc0303");
            rect(objects[i].x+20, objects[i].y-15, objects[i].width+140, objects[i].height-80);
        }
    }
}