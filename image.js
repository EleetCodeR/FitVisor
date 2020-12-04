let video;
let poseNet;
let pose;
let skeleton;

let img;
let brain;
let poseLabel = "A";
let confScore = 0;

function setup() {
    
  createCanvas(1280,720);
  //createCanvas(640, 480);
  img = createImg("./data/a.jpg",imageReady);
  
// set the image size to the size of the canvas
  img.size(width, height);
  img.hide();
  frameRate(1); // set the frameRate to 1 since we don't need it to be running quickly in this case
  

  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);

  // create an object to load model relaed data.
  const modelInfo = {
    model: 'models/model.json',
    metadata: 'models/model_meta.json',
    weights: 'models/model.weights.bin',
  };
  brain.load(modelInfo, brainLoaded);
}

// when the image is ready, then load up poseNet
function imageReady() {
    // set some options
    const options = {
      minConfidence: 0.1,
      inputResolution: { width, height },
    };
  
    // assign poseNet
    poseNet = ml5.poseNet('single',modelLoaded, options);
    // This sets up an event that listens to 'pose' events
    poseNet.on("pose", function(poses) {
        console.log('[INFO] Posenet >>> finding poses...');
        if (poses.length > 0) {
          pose = poses[0].pose;
          skeleton = poses[0].skeleton;
        }
      });
  }

function brainLoaded() {
  console.log('[INFO] model ready!');
  classifyPose();
}

function classifyPose() {
  console.log('[INFO] Classifying...!');
  if (pose) {
    console.log('[INFO] Found a pose...!');
    let inputs = [];
    // ready the input we got from posenet.
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
    if(error){
        console.error(error);
        return;
    }
    else{

        console.log(results);

        if (results[0].confidence > 0.75) {
            poseLabel = results[0].label.toUpperCase();
          }
          console.log(results[0].confidence);
          confScore = results[0].confidence;
          //classifyPose();
        
    }

}


function gotPoses(poses) {
  console.log('[INFO] Posenet >>> finding poses...');
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('[INFO] posenet loaded...');
  poseNet.singlePose(img);
}

function draw() {

  if (pose) {

    push();
    translate(img.width, 0);
    scale(-1, 1);
    image(img, 0, 0, img.width, img.height);


    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);

      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }





    pop();

    fill(255, 0, 255);
    noStroke();
    textSize(100);
    textAlign(CENTER, CENTER);
    text(poseLabel, width / 2, height / 2);
  
    fill(255, 255, 255);//white
    noStroke();
    textSize(30);
    textAlign(RIGHT, BOTTOM);
    var n = (confScore*100);
    n = n.toFixed(2);
   // text('c-score: '+n+'%', 1100,600);
    text('c-score: '+n+'%', 512,400);
    // console.log(typeof(confScore));


    //noLoop(); // stop looping when the poses are estimated

  }

}   