let video;
let poseNet;
let pose;
let skeleton;
let brain;
let state ='waiting';
let targetLabel;


function setup(){
    createCanvas(640,480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,onModelLoad);
    poseNet.on('pose',gotPose);

    let options = {
        inputs:34,
        outputs:4,
        task:'classification',
        debug:true
    }

    brain = ml5.neuralNetwork(options);
}

function gotPose(poses){
    //console.log(poses);
    if(poses.length >0){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
        if(state == 'collecting'){
            let inputs = [];
            for(let i = 0; i <pose.keypoints.length;i++){
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                inputs.push(x);
                inputs.push(y);
            }
            let target = [targetLabel];
            brain.addData(inputs,target);
        }
      
    }
}

function onModelLoad(){
    console.log('posenet model ready');
}

function keyPressed(){

    if(key == 's'){
        console.log('saving data...');
        brain.saveData();//creates a json file of model trained.
    }
    else{
        targetLabel = key;
        console.log(targetLabel);
        setTimeout(function() {
            console.log('collecting......');
            state = 'collecting';
            setTimeout(function() {
                console.log('stopped collecting');
                state = 'waiting';            
            },15000);// collect for 15 sec
        },10000);// get ready in 10 sec.
        
    }
   
}

function draw(){
   // image(video,0,0);
    push();
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0, video.width, video.height);
    if(pose){
        
       /* 
       // mark nose
        fill(255,0,0);
        ellipse(pose.nose.x,pose.nose.y,25);

        // mark wrists
        fill(0,255,0);
        ellipse(pose.leftWrist.x,pose.leftWrist.y,25);
        ellipse(pose.rightWrist.x,pose.rightWrist.y,25);
        
        */

        // mark all keypoints
        for(let i = 0; i <pose.keypoints.length;i++){
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;

            fill(0);
            stroke(255);
            ellipse(x, y, 16, 16);
        }        
        // Draw Skeleton lines
        for(let i = 0; i <skeleton.length;i++){
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            strokeWeight(2);
            stroke(0);//white 255, black-0
            line(a.position.x,a.position.y,b.position.x,b.position.y);
        }
    }
   
}