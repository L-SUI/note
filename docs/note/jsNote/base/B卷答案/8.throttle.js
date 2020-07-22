// 思路：在规定时间内只触发一次
function throttle(fn, delay) {
  // 利用闭包保存时间
  let prev = Date.now();
  return function() {
    let context = this;
    let arg = arguments;
    let now = Date.now();
    if (now - prev >= delay) {
      fn.apply(context, arg);
      prev = Date.now();
    }
  };
}

function fn() {
  console.log("节流");
}
addEventListener("scroll", throttle(fn, 1000));

// 思路:在规定时间内未触发第二次，则执行
function debounce(fn, delay) {
  // 利用闭包保存定时器
  let timer = null;
  return function() {
    let context = this;
    let arg = arguments;
    // 在规定时间内再次触发会先清除定时器后再重设定时器
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, arg);
    }, delay);
  };
}

function fn() {
  console.log("防抖");
}
addEventListener("scroll", debounce(fn, 1000));
