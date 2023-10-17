function draw_one_frame(words, vocal, drum, bass, other, counter) {
  let bassColor = map(bass, 10, 90, 0, 255);
  let glowIntensity = map(drum, 20, 80, 3, 8);  // Increase glow intensity with bass
  
  background(bassColor, 0, 0);
  
  textFont('Helvetica');
  rectMode(CENTER);
  textSize(24);
  
  let bar_spacing = height / 20;
  let bar_height = width / 12;
  let bar_pos_x = width / 2;
  
  // vocal bar is red
  fill(200, 0, 0);
  rect(bar_pos_x, height / 2 + 1 * bar_spacing, 4 * vocal, bar_height, 10, 10, 10, 10);
  fill(0);
  text("vocals", bar_pos_x, height / 2 + 1 * bar_spacing + 8);
  
  // drum bar is green
  fill(0, 200, 0);
  rect(bar_pos_x, height / 2 + 2 * bar_spacing, 4 * drum, bar_height, 10, 10, 10, 10);
  fill(0);
  text("drums", bar_pos_x, height / 2 + 2 * bar_spacing + 8);
  
  // bass bar is blue
  fill(50, 50, 240);
  rect(bar_pos_x, height / 2 + 3 * bar_spacing, 4 * bass, bar_height, 10, 10, 10, 10);
  fill(0);
  text("bass", bar_pos_x, height / 2 + 3 * bar_spacing + 8);
  
  // other bar is white
  fill(200, 200, 200);
  rect(bar_pos_x, height / 2 + 4 * bar_spacing, 4 * other, bar_height, 10, 10, 10, 10);
  fill(0);
  text("other", bar_pos_x, height / 2 + 4 * bar_spacing + 8);
  
  // Draw the glowing text
  textAlign(CENTER);
  textSize(vocal * 1.3);
  let glowColors = [color(255, 0, 0, 50), color(255, 165, 0, 50), color(255, 255, 0, 50)];
  
  for (let i = glowIntensity; i > 0; i--) {
    for (let glowc of glowColors) {
      fill(glowc);
      text(words, width / 2 + i, height / 3 + i);
      text(words, width / 2 - i, height / 3 - i);
      text(words, width / 2 + i, height / 3 - i);
      text(words, width / 2 - i, height / 3 + i);
    }
  }
  
  fill(255, 255, 0);  // Main text color
  text(words, width / 2, height / 3);
}
