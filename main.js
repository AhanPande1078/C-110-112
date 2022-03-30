prediction1 ="";
prediction2 ="";

camera = document.getElementById("camera");
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
Webcam.attach("#camera");
 
function takeSnapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>"
        
    });

}
console.log("ml5 version: "+ ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Fa3WtyVA-/model.json",modelLoaded);

function modelLoaded() 
{
console.log("Model is loaded");

}
function speak()
{
    synth = window.speechSynthesis;
    speakData1 = "The first prediction is that you are "+ predection1;
    speakData2 = "And The second prediction is that you are "+ predection2;
    utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}
function check()
{
   img = document.getElementById("captured_image");
   classifier.classify(img,gotResult) 
}
function gotResult(error,result)
{
    if(error){
        console.error(error);
    
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name1").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        predection1 = result[0].label;
        predection2 = result[1].label;        
        speak();
        if(result[0].label == "Happy"){
            document.getElementById("update_emoji1").innerHTML = "&#128522;";
        }
        if(result[1].label == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if(result[0].label == "Sad"){
            document.getElementById("update_emoji1").innerHTML = "&#128533;";
        }
        if(result[1].label == "Sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128533;";
        }
        if(result[0].label == "Angry"){
            document.getElementById("update_emoji1").innerHTML = "&#128545;";
        }
        if(result[1].label == "Angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }
        if(result[0].label == "Shocked"){
            document.getElementById("update_emoji1").innerHTML = "&#128550;";
        }
        if(result[1].label == "Shocked"){
            document.getElementById("update_emoji2").innerHTML = "&#128550;";
        }


    }}
