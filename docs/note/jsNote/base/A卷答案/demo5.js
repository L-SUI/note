var list_li = document.getElementsByTagName('li');
for (var i = 0; i < list_li.length; i++) {
  list_li[i].onclick = function () {
    console.log(this.innerHTML);
  };
}
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>;
