function draw_one_frame(words, vocal, drum, bass, other, counter) {
  // 计算背景颜色的渐变
  let bassMapped = map(bass, 0, 100, 0.5, 2); // 假设bass的范围是0到100
  let startColor = color(43, 4, 113);  // 深蓝色
  let endColor = color(158, 45, 205);  // 紫色
  let tension = 1;
  let suntension = 1;
  let textoffset = -140;
  let sunColor = color(255, 100, 255); // 紫色
  let sunDiameter = 200;
  let smoothingFactor = 0.05; // 控制平滑度的因子
  let rectWidths = [40, 60, 50, 80, 45, 70, 30, 55, 60, 65, 70,30];
  let rectIntervals = [10, -15, 20, 10, -30, 485, -10, 15, 20, -17, 10,-15];
  
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
  
  let targetSunDiameter = map(bass, 0, 100, 5000 * tension, 6000 * tension); // 根据 bass 值计算太阳目标直径
  sunDiameter = lerp(sunDiameter, targetSunDiameter, smoothingFactor);
  push();
  fill(sunColor);
  noStroke();
  ellipse(width / 2, height / 3, sunDiameter, sunDiameter);
  pop();
  
  // 绘制太阳的光晕
  for (let i = 1.2; i <= 2.5; i += 0.2 / suntension) {
    let sunHaloDiameter = sunDiameter * i; // 光晕直径比太阳稍大
    let sunHaloOpacity = map(bass, 50, 100, 5, 20); // 光晕的透明度随着bass的增大而减小
    push();
    fill(sunColor.levels[0], sunColor.levels[1], sunColor.levels[2], sunHaloOpacity);
    noStroke();
    ellipse(width / 2, height / 3, sunHaloDiameter, sunHaloDiameter);
    pop();
  }

  // 绘制太阳的倒影
  let reflectionY = height - (height / 3);  // 计算倒影太阳的y坐标
  fill(sunColor);
  noStroke();
  ellipse(width / 2, reflectionY, sunDiameter*0.95, sunDiameter*0.95);


  
  textFont('Helvetica');
  textSize(24);
  
 // 计算矩形的参数
let rectCount = 12; // 矩形的数量
let bar_pos_y = height / 2;

// 定义矩形的高度，分别对应不同参数
let rectHeights = [4 * bass, 6 * bass, 4 * bass + drum, 4 * drum + bass, 6 * drum, 4 * drum + other, 4 * other + drum, 6 * other, 4 * other + vocal, 4 * vocal + other, 6 * vocal, 4 * vocal, 3 * vocal];
let rectStrokeWeights = [1 + bass / 8, 1 + bass / 8, 1 + bass / 8, 1 + drum / 8, 1 + drum / 8, 1 + drum / 8, 1 + other / 8, 1 + other / 8, 1 + other / 8, 1 + vocal / 8, 1 + vocal / 8,1 + vocal / 8.5];

// 初始化当前的x坐标和间隔索引
let currentX = 20;
let intervalIndex = 0;

for (let i = 0; i < rectCount; i++) {
  let rectWidth = rectWidths[i]; // 获取矩形的宽度
  let rectHeight = rectHeights[i]; // 获取矩形的高度
  let rectStrokeWeight = rectStrokeWeights[i]; // 获取矩形的strokeWeight

  push();
  noFill();
  strokeWeight(rectStrokeWeight);
  stroke(78, 230, 220); // 保持颜色不变

  rect(currentX, bar_pos_y - rectHeight / 2, rectWidth, rectHeight); // 使用currentX作为x坐标
  pop();

  // 将当前矩形的宽度和间隙累积到currentX上
  currentX += rectWidth + rectIntervals[intervalIndex];
  intervalIndex++; // 移动到下一个间隔值

  // 如果间隔索引超出了数组的长度，重新从第一个间隔开始
  if (intervalIndex >= rectIntervals.length) {
    intervalIndex = 0;
  }
}





  // 绘制发光的文本
  let glowIntensity = map(drum, 20, 80, 3, 8); // 基于 drum 值计算发光强度
  textAlign(CENTER);
  textSize(vocal * 1.3);
  
  // 先绘制倒影
  push(); // 保存当前的设置
  fill(255, 255, 255, 100);  // 设置倒影的颜色和透明度
  scale(1, -1);  // 垂直翻转坐标系以绘制倒影
  text(words, width / 2, - (bar_pos_y + 50 + vocal * 1.3));  // 这里 y 坐标是负的
  pop();  // 恢复之前保存的设置
  
  // 绘制发光的文本
  push();
  let i=glowIntensity = map(drum, 20, 80, 3, 8); // 基于 drum 值计算发光强度
  textAlign(CENTER);
  textSize(vocal * 1.3);
  pop();

  // 先绘制倒影
  fill(255, 255, 255, 70);  // 设置倒影的颜色和透明度
  text(words, width / 20, textoffset);  // 倒影位置在y=500的地平线以下
  
  // 绘制主要的、发光的文本
  for (let i = glowIntensity; i > 0; i--) {
    push();
    fill(255, 165, 0, 50);
    text(words, width / 2 + i, bar_pos_y + i + textoffset);
    text(words, width / 2 - i, bar_pos_y - i + textoffset);
    text(words, width / 2 + i, bar_pos_y - i + textoffset);
    text(words, width / 2 - i, bar_pos_y + i + textoffset);
    pop();
  }
  
  fill(255, 255, 0);  // 主要文本颜色
  text(words, width / 2, bar_pos_y + textoffset);
  
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
  strokeWeight(2*drum/50);
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