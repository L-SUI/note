
class PlantWar{
	constructor(){				
		// 僵尸初始位置的y轴
		this.posi = [120, 230, 320];
		// 英雄们
		this.heros = document.querySelector("#heros");
		// 场景1:游戏中..
		this.div1 = document.querySelector("#div1");
		// 场景2:准备中..
		this.div2 = document.querySelector("#div2");
		// 场景3:开始游戏
		this.div3 = document.querySelector("#div3");
		// 开始游戏的按钮
		this.btnPlay = document.querySelector("#div3>img");
		// 初始化游戏
		this.init();		
	}
	setMap(){
		this.maps = [];
		// 英雄们在地图上的坐标    x=255   y=180    w=80  h=100
		for( var j=0; j<3; j++ ){
			for( var i=0; i<9; i++ ){
				var nx = 255 +  80*i;
				var ny = 180 + 100*j;
				this.maps.push([nx, ny]);
				/*
				var d = document.createElement("div");
				this.div1.appendChild(d);
				d.style.position = "absolute";
				d.style.border = "1px solid red";
				d.style.width = "80px";
				d.style.height = "100px";
				d.style.left = nx+"px";
				d.style.top = ny+"px";
				*/
			}
		}
		
	}
	init(){
		// 英雄们在地图上的坐标
		this.setMap();
		// 当点击开始游戏时，触发相应的函数
		this.btnPlay.onclick = this.playGame.bind(this);
	}
	// 开始游戏
	playGame(){
		this.div3.style.display = "none";
		this.div2.style.display = "block";
		this.heros.style.display = "block";
		this.heros.children[0].onmousedown = (e)=>{
			this.drag(e.offsetX, e.offsetY);
			return false
		}	
		setTimeout(()=>{
			this.div2.style.display = "none";
			
			this.foeTimer = setInterval(()=>{
				this.createZombie(); // 创建僵尸
			}, 3000)
		}, 300);
	}
	// 生成僵尸
	createZombie(){
		var div = document.createElement("div");
		this.div1.appendChild(div);
		div.title = 5; // 血量
		div.className = "zombie";
		div.style.top = this.rndGet(this.posi)+"px";
		var img = document.createElement("img");
		div.appendChild(img);
		img.src = "images/foe/1.gif";	
		this.moveZombie(div);
	}
	// 僵尸前进
	moveZombie(zombie){
		// 换图片
		var child = zombie.children;
		child[0].src = "images/foe/BucketheadZombie.gif";
		// 从右往左走
		var i = zombie.offsetLeft;
		zombie.timer = setInterval(()=>{
			i-=10;
			zombie.style.left = i+"px";
			//  溢出清除
			if(i < -166){
				clearInterval(zombie.timer);
				alert("game over");
			}
		}, 500);
	}
	// 在数组中，随机取出一个数据
	rndGet(arr){
		return arr[parseInt(arr.length*Math.random())];
	}
	// 英雄的拖拽
	drag(x, y){
		// 生成新英雄
		var div = document.createElement("div");
		this.div1.appendChild(div);
		div.className = "hero";
		var img = document.createElement("img");
		div.appendChild(img);
		img.src = "images/hero/Peashooter.gif";
		// 拖拽
		document.onmousemove = e=>{
			div.style.left = e.clientX-x+'px';
			div.style.top = e.clientY-y+'px';
		}
		document.onmouseup = (e)=>{
			// 鼠标的坐标
			var mx = e.clientX;
			var my = e.clientY;
			// 鼠标抬起时，判断鼠标是否处于maps中
			var newX, newY;
			var bln = this.maps.some(arr=>{
				var x = arr[0];
				var y = arr[1];
				var w = 80;
				var h = 100;
				//console.log(x,'<',mx ,'&&', mx,'<',x+w ,'&&', y,'<',my ,'&&', my,'<',y+h, "    ", (x<mx && mx<x+w && y<my && my<y+h) );
				if( x<mx && mx<x+w && y<my && my<y+h ){
					newX = x;
					newY = y;
					return true;
				}
			});
			document.onmousemove = null;
			document.onmouseup = null;
			if( bln ){						
				div.style.left = newX+'px';
				div.style.top = newY+'px';
				// 发射豌豆    吐泡泡
				div.timer = setInterval(()=>{
					biubiu.call(this, div);
				}, 1000);
			}else{
				this.div1.removeChild(div);
			}
		}
		// 发射豌豆
		function biubiu(hero){
			var i = 1;
			var img = document.createElement("img");
			img.src = "images/hero/PB0"+i+".gif";
			img.className = "biu";
			var newX = parseInt(hero.style.left)+70;
			img.style.left = newX+'px';
			img.style.top = hero.style.top;
			this.div1.appendChild(img);
			img.timer = setInterval(()=>{
				// 豌豆的向前运动
				newX+=25;
				img.style.left = newX+"px";				
				// 豌豆图片切换
				i++;
				if(i==2)i=0;			
				img.src = "images/hero/PB0"+i+".gif";
				// 豌豆是否与僵尸接触
				this.foe_peng(img);
				// 溢出清除
				if( newX > 1400 ){
					this.peas_die( img );
				}
			}, 50);
		}
	}
	// 豌豆销毁
	peas_die( peas ){
		clearInterval(peas.timer);
		this.div1.removeChild(peas);
	}
	// 僵尸销毁
	foe_die( foe ){
		clearInterval(foe.timer);
		this.div1.removeChild(foe);
	}
	// 豌豆是否与僵尸接触
	foe_peng(peas){
		// peas 指豌豆（豌豆射手所发射出来的炮弹）
		// 所有的僵尸
		var zombies = Array.from(document.querySelectorAll(".zombie"));
		var bln = false;// 没有接触
		var foe = null;//接触到的僵尸
		for( var i=0,len=zombies.length; i<len; i++ ){			
			if( this.pengzhuang(peas, zombies[i]) ){ // 表示豌豆与僵尸接触到了
				bln = true; // 有接触
				foe = zombies[i];// 接触到的僵尸
				break;
			}
		}
		if( bln ){// 表示豌豆与僵尸接触到了
			// 豌豆销毁
			this.peas_die( peas );
			// 僵尸血量减少
			foe.title--;
			if( foe.title<0 ){
				this.foe_die( foe );
			}
		}
	}
	// 碰撞检测
	pengzhuang(elem1, elem2){
		//elem1.style.border = elem2.style.border = "1px solid red";
		
		var x1 = elem1.offsetLeft;
		var w1 = elem1.offsetWidth;
		var y1 = elem1.offsetTop;
		var h1 = elem1.offsetHeight;
		
		var x2 = elem2.offsetLeft+120;
		var w2 = elem2.offsetWidth;
		var y2 = elem2.offsetTop;
		var h2 = elem2.offsetHeight;
		
		if( x1+w1>x2 && x1<x2+w2 && y1+h1>y2 && y1<y2+h2 ){
			return true;
		}else{
			return false;
		}
	}
}



//document.onmousemove=e=>{
	//document.title = e.clientX+" , "+e.clientY;
//}
