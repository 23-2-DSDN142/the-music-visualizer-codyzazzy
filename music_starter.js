function draw_one_frame(words, vocal, drum, bass, other, counter) {
  // 计算背景颜色的渐变
  let bassMapped = map(bass, 0, 100, 0.5, 2); // 假设bass的范围是0到100
  let startColor = color(43, 4, 113);  // 深蓝色
  let endColor = color(158, 45, 205);  // 紫色
  let tension = 1;
  let suntension = 1;
  let textoffset = -140;
  let lastTime = 0;
  let yPositions = [];

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
  
  // 创建背景渐变
  noStroke();
  for (let i = 0; i <= 1; i += 0.07 / other) {
    push();
    let inter = lerpColor(startColor, endColor, i * bassMapped);
    fill(inter);
    rect(0, i * height, width, height * 0.05 / other);
    pop();
  }
  
  // 绘制太阳
  let sunDiameter = 200;
  let targetSunDiameter = map(bass, 0, 100, 5000 * tension, 6000 * tension); // 根据 bass 值计算太阳目标直径
  let sunColor = color(255, 100, 255); // 紫色
  let smoothingFactor = 0.05; // 控制平滑度的因子
  sunDiameter = lerp(sunDiameter, targetSunDiameter, smoothingFactor);

  fill(sunColor);
  noStroke();
  ellipse(width / 2, height / 3, sunDiameter, sunDiameter);
  
  // 绘制太阳的光晕
  for (let i = 1.2; i <= 2.5; i += 0.2 / suntension) {
    let sunHaloDiameter = sunDiameter * i; // 光晕直径比太阳稍大
    let sunHaloOpacity = map(bass, 50, 100, 5, 20); // 光晕的透明度随着bass的增大而减小
    fill(sunColor.levels[0], sunColor.levels[1], sunColor.levels[2], sunHaloOpacity);
    noStroke();
    ellipse(width / 2, height / 3, sunHaloDiameter, sunHaloDiameter);
  }



  
  textFont('Helvetica');
  textSize(24);
  
  // 计算矩形的参数
  let rectCount = 11; // 矩形的数量
  let rectSpacing = width / (rectCount + 1); // 计算矩形之间的间距
  let bar_width = 80;  // 矩形的宽度
  let bar_pos_y = height/2
  
// 定义矩形的高度，分别对应不同参数
let rectHeights = [4 * bass, 6 * bass, 4 * bass+drum, 4 * drum+bass, 6 * drum, 4 * drum+other, 4 * other+drum, 6 * other, 4 * other+vocal, 4 * vocal+other, 6 * vocal,4 * vocal];
let rectStrokeWeights = [1 + bass / 8, 1 + bass / 8, 1 + bass / 8, 1 + drum / 8, 1 + drum / 8, 1 + drum / 8, 1 + other / 8, 1 + other / 8, 1 + other / 8, 1 + vocal / 8, 1 + vocal / 8];

  
  // 创建四个矩形，分别对应不同参数
  for (let i = 0; i < rectCount; i++) {
    push();
    let x = (i + 1) * rectSpacing - bar_width / 2; // 计算矩形的水平位置，居中
    let rectHeight = rectHeights[i]; // 获取矩形的高度
    let rectStrokeWeight = rectStrokeWeights[i]; // 获取矩形的strokeWeight
    pop();
    push();
    noFill();  
    strokeWeight(rectStrokeWeight);
    stroke(78, 230, 220); // 保持颜色不变
    rect(x, bar_pos_y - rectHeight / 2, bar_width, rectHeight); // 修改矩形的垂直位置
    pop();
  }

  // 绘制发光的文本
  let glowIntensity = map(drum, 20, 80, 3, 8); // 基于 drum 值计算发光强度
  textAlign(CENTER);
  textSize(vocal * 1.3);
  
  for (let i = glowIntensity; i > 0; i--) {
    fill(255, 165, 0, 50);
    text(words, width / 2 + i, bar_pos_y + i+textoffset);
    text(words, width / 2 - i, bar_pos_y - i+textoffset);
    text(words, width / 2 + i, bar_pos_y - i+textoffset);
    text(words, width / 2 - i, bar_pos_y + i+textoffset);
  }
  
  fill(255, 255, 0);  // 主要文本颜色
  text(words, width / 2, bar_pos_y+textoffset);
  
  noStroke();
  let startColor2 = color(27, 10, 71);  // 你可以按需调整这些颜色
  let endColor2 = color(255, 105, 180);  // 你可以按需调整这些颜色
  
  for (let i = 500/height; i <= 1100/height; i += 0.05 / other) {  // 起始和结束位置调整为500和1100（绘制高度600）
    push();
    let inter = lerpColor(startColor2, endColor2, i * bassMapped);
    fill(inter);
    rect(0, i * height, 1200, height * 0.03 / other);  // 宽度调整为1200
    pop();
  }

  
  push();
  stroke(173, 216, 230);
  strokeWeight(2);
  line(0, 500, 1200, 500);
  line(0, 510, 1200, 510);
  line(0, 530, 1200, 530);
  line(0, 550, 1200, 550);
  line(0, 580, 1200, 580);
  line(0, 630, 1200, 630);
  line(0, 700, 1200, 700);
  line(0, 790, 1200, 790);
  line(0, 900, 1200, 900);
  pop();




  // 绘制光晕效果
  for (let i = 0; i <= 10; i++) {  // 从0到10，绘制11条线
    let alpha = map(i, 0, 10, 0, 255);  // 根据 i 值映射透明度从0到255
    let offsetY = map(i, 0, 10, 0, 10);  // 根据 i 值映射y轴偏移从0到10
    stroke(173, 216, 230, 255 - alpha);  // 设置线条颜色和透明度
    strokeWeight(0.01*bass);  // 设置线条宽度
    line(0, 500 + offsetY, width, 500 + offsetY);  // 在y=500+offsetY处绘制线条
    line(0, 500 - offsetY, width, 500 - offsetY);  // 在y=500-offsetY处绘制线条
  }

  // 在y=500处绘制主要的地平线
  stroke(173, 216, 230);  // 设置线条颜色为浅蓝色
  strokeWeight(2);  // 设置线条宽度
  line(0, 500, width, 500);  // 在y=500处绘制线条
}
