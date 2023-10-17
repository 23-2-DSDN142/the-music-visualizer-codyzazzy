function draw_one_frame(words, vocal, drum, bass, other, counter) {
  // 计算背景颜色的渐变
  let bassMapped = map(bass, 0, 100, 0.5, 2); // 假设bass的范围是0到100
  let startColor = color(32, 2, 87);  // 深蓝色
  let endColor = color(154, 65, 191);  // 紫色

  background(5, 1, 36);
  
  // 创建背景渐变
  noStroke();
  for (let i = 0; i <= 1; i += 0.007) {
    let inter = lerpColor(startColor, endColor, i * bassMapped);
    fill(inter);
    rect(0, i * height, width, height * 0.006);
  }
  
  textFont('Helvetica');
  rectMode(CORNER);
  textSize(24);
  
  // 计算矩形的参数
  let rectCount = 8; // 矩形的数量
  let rectSpacing = width / (rectCount + 1); // 计算矩形之间的间距
  let bar_width = 80;  // 矩形的宽度
  let bar_pos_y = 400;  // 矩形的垂直位置
  
  // 定义矩形的高度，分别对应不同参数
  let rectHeights = [4 * bass,4 * bass, 4 * drum,4 * drum,  4 * other,4 * other,4 * vocal,4 * vocal];
  let rectStrokeWeights = [bass / 10,bass / 10,drum / 10, drum / 10,other/ 10, other / 10,vocal / 10,vocal/10 ];
  
  // 创建四个矩形，分别对应不同参数
  for (let i = 0; i < rectCount; i++) {
    let x = (i + 1) * rectSpacing - bar_width / 2; // 计算矩形的水平位置，居中
    let rectHeight = rectHeights[i]; // 获取矩形的高度
    let rectStrokeWeight = rectStrokeWeights[i]; // 获取矩形的strokeWeight
    
    push();
    noFill();  
    strokeWeight(rectStrokeWeight);
    stroke(78, 230, 220); // 保持颜色不变
    rect(x, bar_pos_y, bar_width, rectHeight);
    pop();
  }
  
  // 绘制发光的文本
  let glowIntensity = map(drum, 20, 80, 3, 8); // 基于 drum 值计算发光强度
  textAlign(CENTER);
  textSize(vocal * 1.3);
  
  for (let i = glowIntensity; i > 0; i--) {
    fill(255, 165, 0, 50);
    text(words, width / 2 + i, height / 3 + i);
    text(words, width / 2 - i, height / 3 - i);
    text(words, width / 2 + i, height / 3 - i);
    text(words, width / 2 - i, height / 3 + i);
  }
  
  fill(255, 255, 0);  // 主要文本颜色
  text(words, width / 2, height / 3);
}
