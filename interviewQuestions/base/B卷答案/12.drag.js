window.onload = function() {
  // drag处于绝对定位状态
  let drag = document.getElementById("box");
  drag.onmousedown = function(e) {
    var e = e || window.event;
    // 鼠标与拖拽元素边界的距离 = 鼠标与可视区边界的距离 - 拖拽元素与边界的距离
    let diffX = e.clientX - drag.offsetLeft;
    let diffY = e.clientY - drag.offsetTop;
    drag.onmousemove = function(e) {
      // 拖拽元素移动的距离 = 鼠标与可视区边界的距离 - 鼠标与拖拽元素边界的距离
      let left = e.clientX - diffX;
      let top = e.clientY - diffY;
      // 避免拖拽出可视区
      if (left < 0) {
        left = 0;
      } else if (left > window.innerWidth - drag.offsetWidth) {
        left = window.innerWidth - drag.offsetWidth;
      }
      if (top < 0) {
        top = 0;
      } else if (top > window.innerHeight - drag.offsetHeight) {
        top = window.innerHeight - drag.offsetHeight;
      }
      drag.style.left = left + "px";
      drag.style.top = top + "px";
    };
    drag.onmouseup = function(e) {
      this.onmousemove = null;
      this.onmouseup = null;
    };
  };
};
