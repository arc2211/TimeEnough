//brightness mirror and motionPixels combined and modified
//https://github.com/CodingTrain/website/blob/master/Tutorials/P5JS/p5.js_video/11.4_p5.js_brightness_mirror/sketch.js
//https://github.com/shiffman/LearningProcessing-p5.js/blob/master/chp16_video/example_16_13_MotionPixels/sketch.js
var video;
var scaler = 10;
var pFrame;


function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / scaler, height / scaler);
  video.hide();
  pFrame = createImage(video.width, video.height);
}

function draw() {
  // image(pFrame, 0, 0);
  //loadPixels();
  video.loadPixels();
  pFrame.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      var index = (x + y * video.width) * 4;
      let pr = pFrame.pixels[index + 0];
      let pg = pFrame.pixels[index + 1];
      let pb = pFrame.pixels[index + 2];
      let pbright = (pr + pg + pb) / 3;

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (r + g + b) / 3;
			
      var diff = dist(r, g, b, pr, pg, pb);
	  if (diff<60){
      //if (abs(pbright, bright) < 50) {
          fill(255,255,255);
      } 
      else {
          fill(r, g, b);
      }
      //noStroke();
      stroke(255);
      ellipse(x * scaler, y * scaler, scaler);
    }
  }
    video.updatePixels();
   pFrame.updatePixels();
  //updatePixels();
  // if (video.canvas) {
    pFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);
  // }
}