# FitVisor
a Machine Learning based In-Browser Fitness assistant/tracker (prototype) based on Human Pose Estimation.

## Contents :
1. Abstract  
2. Implementation Details and Results  
3. System Design  
4. References  

## Abstract :
The goal of this project is to design a system that will assist a person in their fitness-regime in real time by using human pose estimation. Throughout the fitness-regime person’s pose is continuously detected and is assisted in real-time with the help of feedback. For the Pose detection phase, we have used the “Posenet” model provided by Tensorflow-framework and for Pose classification phase, we have trained our own neural network using p5.js and ml5.js JavaScript libraries.

## Implementation Details and Results :

Implementation Details:  

Programming languages : JavaScript and HTML,  
JavaScript Frameworks : p5.js , ml5.js, (Both based on TensorflowJS),  
Code Editor : Visual Studio Code,  
Operating System : Windows 10 (64-bit),  

### 1. Data Collection Stage:
---------------------------------------------------- Data Collection for Pose Label - 'A'  
---------------------------------------------------- Data Collection for Pose Label - 'B'  
---------------------------------------------------- Data Collection for Pose Label - 'C'  
---------------------------------------------------- Data Collection for Pose Label - 'D'  
    
### 2. Model Training Stage:

<p align="center">
  <img src="https://user-images.githubusercontent.com/49197592/101179307-1155ba00-3670-11eb-8648-7bb91d6aab97.png"  width="645" height="346"/>   
</p>

 Model Training : Loss vs No. of Epoch graph , loss function successfully attaining minimum value during training.
 

## System Design :

The following figure represents the  block diagram i.e, System Architecture for “ FitVisor: An In-browser fitness assistant”.

<p align="center">
  <img src="https://user-images.githubusercontent.com/49197592/101179332-161a6e00-3670-11eb-84ba-23b0dd7c902b.jpg" width="640"/>
</p>

The figure above represents the entire framework, which is divided in 3 stages, input, processing models and output. The input is ideally a real-time video stream (but an Image file can also be processed ). 

The machine learning models in the processing stage then work on this input in two phases; first  Pose-Detection phase, where we use ‘PoseNet’, which is a pose estimation model provided by Tensorflow framework, followed by Pose-Classification phase where we use our own Neural Network trained on different poses.The pose detected by this neural network is then shown as output with a confidence score.


### Pose Detection phase :

The main objective of this phase is to detect the coordinates of key-joint points in the image. For this purpose we use a pre-trained model provided by Tensorflow.js framework called ‘PoseNet’. Upon providing input to this model as an Image/ Video-frame, it returns as output, an ‘array of objects’ containing information regarding Pose (Key-joint points) and Skeleton model information. There are 17 Key-joint points detected by the model as shown in the figure below.

<p align="center">
  <img src="https://user-images.githubusercontent.com/49197592/101180124-2f6fea00-3671-11eb-81a9-c9f2ffc95b02.jpg" width="400"/>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/49197592/101180134-326ada80-3671-11eb-835a-18c7e3244a16.jpg" width="200"/>
</p>

Each point consists of x and y coordinates corresponding to width and height of the image/canvas defined. This information is then used to train our neural network in Pose Classification phase.

### Pose Classification phase :

Objective of this phase is to classify the pose into one of the predefined classes. Hence before classification, we need to train our neural network on different poses, this process involves different steps at implementation level, 1.Data Collection, 2.Model Training, 3.Model Deployment.

#### 1. Data Collection:

In this step we prepare and collect the data related to each pose and its corresponding Class-label so that it can be used further for training our neural network. The execution flow is as shown in figure below.

<p align="center">
  <img src="https://user-images.githubusercontent.com/49197592/101179306-10bd2380-3670-11eb-98ea-5e6c43ea27c0.png" width="610" height="1266"/>
</p>

#### 2. Model Training :

The data collected in the previous step is used to train the Neural network in this step. The JSON file is loaded into the model and it is trained for 50 Epochs. The X & Y coordinates of each of 17 key-joint points acts as an input to the neural network, therefore there are a total of 34 inputs to NN and output is set to 4, corresponding to each class of pose. The workflow is as shown in figure below.

<p align="center">
  <img src="https://user-images.githubusercontent.com/49197592/101179311-11ee5080-3670-11eb-8e32-b5ecc87ee79d.png"  width="321" height="963"/>
</p>

#### 3. Model Deployment :

The model deployment step constitutes setting  up the models and keeping the system ready for use and testing. The meta-files we got during training contain the metadata for NN-model, i.e, configuration details, setup details and parameter values etc. these files are directly loaded into the neural network. The  deployment workflow is as shown in the figure below.

<p align="center">
  <img src="https://user-images.githubusercontent.com/49197592/101179308-11ee5080-3670-11eb-91f7-928102ce9d3e.png"  width="641" height="869"/>
</p>

## References :

A big thanks to David Shiffman for his great content, this project  was inspired from his lectures. I definately recommend his YouTube channel and website.  
  
  YouTube Channel - https://www.youtube.com/user/shiffman
  
  Website - https://thecodingtrain.com/


