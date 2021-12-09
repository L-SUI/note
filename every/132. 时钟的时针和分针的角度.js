// 请计算出时钟的时针和分针的角度（两个角度的较小者，四舍五入）。时间以HH:mm的格式传入。

// angle('12:00')
// // 0

// angle('23:30')
// // 165





/**
 * @param {string} time
 * @returns {number} 
 */
 function angle(time) {
    const [hour,minute] = time.split(':');
    let minuteAngle = minute/60*360;
    let hourAngle = (hour%12)/12*360+minute/60*30;
    let res = Math.abs(hourAngle-minuteAngle)
    return (res>180?360-res:res).toFixed()*1;
  }