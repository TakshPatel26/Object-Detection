Status = "";
AC_image = "";
objects = [];
function preload(){
    AC_image = loadImage("Ac.jpg");
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
    object_Detector.detect(AC_image,gotResults);
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(AC_image,0,0,640,350);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text("Ac" + " " + percent + "%",objects[i].x+5, objects[i].y-108);
            noFill();
            stroke("#fc0303");
            rect(objects[i].x, objects[i].y-120, objects[i].width-300, objects[i].height-200);
        }
    }
}