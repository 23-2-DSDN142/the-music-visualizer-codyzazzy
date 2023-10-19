let load = true;
let car;

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  // Calculate background color gradient
  let bassMapped = map(bass, 0, 100, 0.5, 2); // Assume bass range is 0 to 100
  let endColor = color(255, 0, 204); // Deep blue
  let startColor = color(43, 4, 113); // Purple
  let startColor2 = color(255, 126, 255);
  let endColor2 = color(32, 2, 30);
  let tension = 1;
  let suntension = 1;
  let textoffset = -140;
  let sunColor = color(255, 100, 255); // Purple
  let sunDiameter = 200;
  let smoothingFactor = 0.05; // Smoothing factor
  let rectWidths = [40, 60, 50, 80, 45, 70, 30, 55, 60, 65, 70, 30];
  let rectIntervals = [10, -15, 20, 10, -30, 485, -10, 15, 20, -17, 10, -15];


  if (song.currentTime() > 17 && song.currentTime() < 19.75) {
    tension = 1;
    suntension = 8;
  }
  if (song.currentTime() > 19.75 && song.currentTime() < 22.5) {
    tension = 1;
    suntension = 6;
  }
  if (song.currentTime() > 22.5 && song.currentTime() < 24) {
    tension = 1;
    suntension = 4;
  }
  if (song.currentTime() > 24 && song.currentTime() < 25) {
    tension = 1;
    suntension = 2;
  }
  if (song.currentTime() > 25 && song.currentTime() < 26) {
    tension = 1;
    suntension = 1;
  }

  background(5, 1, 36);

  // Create background gradient
  noStroke();
  let targetY = 500; // 设定目标高度为 500
  for (let i = 0; i <= 1; i += 0.07 / other) {
    push();
    let inter = lerpColor(startColor, endColor, i * bassMapped);
    fill(inter);
    rect(0, i * targetY, width, targetY * 0.05 / other);
    pop();
  }

  // Draw the sun
  let targetSunDiameter = map(bass, 0, 100, 5000 * tension, 6000 * tension);
  sunDiameter = lerp(sunDiameter, targetSunDiameter, smoothingFactor);
  push();
  fill(sunColor);
  noStroke();
  ellipse(width / 2, height / 3, sunDiameter, sunDiameter);
  pop();

  // Draw the sun's halo
  for (let i = 1.2; i <= 2.5; i += 0.2 / suntension) {
    let sunHaloDiameter = sunDiameter * i;
    let sunHaloOpacity = map(bass, 50, 100, 5, 20);
    push();
    fill(sunColor.levels[0], sunColor.levels[1], sunColor.levels[2], sunHaloOpacity);
    noStroke();
    ellipse(width / 2, height / 3, sunHaloDiameter, sunHaloDiameter);
    pop();
  }

  // Draw the sun's reflection
  let reflectionY = height - (height / 3);
  fill(sunColor);
  noStroke();
  ellipse(width / 2, reflectionY, sunDiameter * 0.95, sunDiameter * 0.95);

  textFont('Helvetica');
  textSize(24);

  // Calculate parameters for rectangles
  let rectCount = 12;
  let bar_pos_y = height / 2;

  // Define heights for rectangles based on different parameters
  let rectHeights = [4 * bass, 6 * bass, 4 * bass + drum, 4 * drum + bass, 6 * drum, 4 * drum + other, 4 * other + drum, 6 * other, 4 * other + vocal, 4 * vocal + other, 6 * vocal, 4 * vocal, 3 * vocal];
  let rectStrokeWeights = [1 + bass / 8, 1 + bass / 8, 1 + bass / 8, 1 + drum / 8, 1 + drum / 8, 1 + drum / 8, 1 + other / 8, 1 + other / 8, 1 + other / 8, 1 + vocal / 8, 1 + vocal / 8, 1 + vocal / 8.5];

  // Initialize current x-coordinate and interval index
  let currentX = 20;
  let intervalIndex = 0;

  for (let i = 0; i < rectCount; i++) {
    let rectWidth = rectWidths[i];
    let rectHeight = rectHeights[i];
    let rectStrokeWeight = rectStrokeWeights[i];

    push();
    noFill();
    strokeWeight(rectStrokeWeight);
    stroke(78, 230, 220);

    rect(currentX, bar_pos_y - rectHeight / 2, rectWidth, rectHeight);
    pop();

    currentX += rectWidth + rectIntervals[intervalIndex];
    intervalIndex++;

    if (intervalIndex >= rectIntervals.length) {
      intervalIndex = 0;
    }
  }

  // Draw glowing text
  let glowIntensity = map(drum, 20, 80, 3, 8);
  textAlign(CENTER);
  textSize(vocal * 1.3);

  // Draw reflection first
  push();
  fill(255, 255, 255, 100);
  scale(1, -1);
  text(words, width / 2, - (bar_pos_y + 50 + vocal * 1.3));
  pop();

  // Draw glowing text
  push();
  let i = glowIntensity = map(drum, 20, 80, 3, 8);
  textAlign(CENTER);
  textSize(vocal * 1.3);
  pop();

  fill(255, 255, 255, 70);
  text(words, width / 20, textoffset);

  // Draw main glowing text
  for (let i = glowIntensity; i > 0; i--) {
    push();
    fill(255, 165, 0, 50);
    text(words, width / 2 + i, bar_pos_y + i + textoffset);
    text(words, width / 2 - i, bar_pos_y - i + textoffset);
    text(words, width / 2 + i, bar_pos_y - i + textoffset);
    text(words, width / 2 - i, bar_pos_y + i + textoffset);
    pop();
  }

  fill(255, 255, 0);
  text(words, width / 2, bar_pos_y + textoffset);

  noStroke();
 

  for (let i = 500 / height; i <= 1100 / height; i += 0.05 / other) {
    push();
    let inter = lerpColor(startColor2, endColor2, i * bassMapped);
    fill(inter);
    rect(0, i * height, 1200, height * 0.03 / other);
    pop();
  }


  let startY = 500;
  let endY = height;
  let step = (endY - startY) * 0.05 / other;
  
  for (let y = startY; y <= endY; y += step) {
      let lerpFactor = map(y, startY, endY, 0, 1);
      let inter = lerpColor(startColor2, endColor2, lerpFactor * bassMapped);
      fill(inter);
      rect(0, y, 1200, step);
  }

  push();
  stroke(180, 180, 200);
  let strokeglow = map(drum, 0, 60, 0, 1.5);
  strokeWeight(strokeglow);
  line(0, 500, 1200, 500);
  line(0, 510, 1200, 510);
  line(0, 530, 1200, 530);
  line(0, 550, 1200, 550);
  line(0, 580, 1200, 580);
  line(0, 630, 1200, 630);
  line(0, 700, 1200, 700);
  line(0, 790, 1200, 790);
  line(0, 900, 1200, 900);
  line(width/2, 500, width/2, height);
  //y lines
  line(width/2+20, 500, width/2+400, height);
  line(width/2-20, 500, width/2-400, height);
  line(width/2+40, 500, width/2+800, height);
  line(width/2-40, 500, width/2-800, height);
  line(width/2+60, 500, width/2+1600, height);
  line(width/2-60, 500, width/2-1600, height);
  line(width/2+80, 500, width/2+3200, height);
  line(width/2-80, 500, width/2-3200, height);
  line(width/2+100, 500, width/2+6400, height);
  line(width/2-100, 500, width/2-6400, height);
  line(width/2+120, 500, width/2+12800, height);
  line(width/2-120, 500, width/2-12800, height);
  pop();

  // Draw halo effects
  for (let i = 0; i <= 10; i++) {
    let alpha = map(i, 0, 10, 0, 255);
    let offsetY = map(i, 0, 10, 0, 10);
    stroke(173, 216, 230, 255 - alpha);
    strokeWeight(0.01 * bass);
    line(0, 500 + offsetY, width, 500 + offsetY);
    line(0, 500 - offsetY, width, 500 - offsetY);
  }

  // Draw the main horizon line at y=500
  stroke(173, 216, 230);
  strokeWeight(2);
  line(0, 500, width, 500);

  if (load==true) {
    car = loadImage('car.png', () => {
      // I have no idea why this doesn't work
      console.log("Car image loaded!");
    });
    tree = loadImage('tree.png', () => {
      // I have no idea why this doesn't work
      console.log("Tree image loaded!");
    });
    load = false;
  }
   
  
  if (tree) {
    // only draw the image AFTER the image is actually loaded
    push();
    scale(0.3);
    image(tree, 1740, 1075);
    pop();
    
    push(); 
    scale(0.3);
    translate(0, 3375); // move the origin point
    scale(1, -1); // yeet the image around
    tint(255, 50);
    image(tree, 1740, 1075 + drum / 2);
    pop();

  }
  
  if (car) {
    // only draw the image AFTER the image is actually loaded
    push();
    scale(0.2);
    image(car, 2860, 2500+drum/2);
    pop();
    
    push(); 
    scale(0.2);
    translate(0, 5450); // move the origin point
    scale(1, -1); // yeet the image around
    tint(255, 50);
    image(car, 2860, 2500 + drum / 2);
    pop();

  }
}
