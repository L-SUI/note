/*
 * 飞机大战
 */

class PlaneWar{
	constructor(){
		this.stage = this.$(".planewar");
		this.stage1 = this.$(".stage1");
		this.stage2 = this.$(".stage2");
		this.stage3 = this.$(".stage3");
		this.sky = this.$(".sky");
		this.btn = this.$(".btn");
		this.myPlane = this.$(".my");
		this.score = this.$(".score");
	}
	$( arg ){
		return document.querySelector(arg);
	}
	init(){
		var that = this;
		
		that.stage2.style.display = "none";
		
		this.btn.onclick = ()=>{
			// 场景切换
			that.stage1.style.display = "none";
			that.stage2.style.display = "block";
			// 天空中的云彩动起来
			that.skymove();
			// 控制我方飞机
			that.myplanemove();
			that.myplanebullet();
			// 敌方飞机
			that.createFoeAll();
			// 我方飞机与敌方飞机的碰撞
			setInterval(that.zhuangzhuang.bind(that), 100);
		}
	}
	skymove(){
		var that = this;
		var n = -568;
		var move = ()=>{
			n++;
			that.sky.style.top = n+"px";
			if( n==0 ){
				n=-568;
			}
		}
		that.sky.timer = setInterval(move, 100);
	}
	myplanemove(){
		var that = this;
		that.stage.onmousemove = (e)=>{
			var x = e.clientX-that.stage.offsetLeft;
			var y = e.clientY-that.stage.offsetTop;
			x-=33;
			y-=40;
			that.myPlane.style.left = x+"px";
			that.myPlane.style.top = y+"px";
		}		
	}
	myplanebullet(){
		var that = this;
		var create = ()=>{
			var img = document.createElement("img");
			img.src = "images/bullet我的飞机炮弹6_14.png";
			img.style.left = that.myPlane.offsetLeft+31+'px';
			img.style.top = that.myPlane.offsetTop-14+'px';
			that.stage2.appendChild(img);
			
			var move = ()=>{
				var n = img.offsetTop;
				n-=15;
				img.style.top = n+"px";
				if( n<-15 ){
					that.stage2.removeChild(img);
				}
				// 炮弹是否打到了敌机
				that.pengpeng( img );
				
			}
			
			img.timer = setInterval(move, 100);
			
		}
		//setInterval(create, 500);
		document.onkeyup = ()=>{
			create();
		}
	}
	createFoe(attr){
		//飞机div
		var div = document.createElement("div");
		this.stage2.appendChild(div);
		div.style.width = attr.width+"px";
		div.style.height = attr.height+"px";
		div.className = "foe";
		div.style.left = parseInt(Math.random()*(320-attr.width))+"px";
		div.style.top = -attr.height+"px";
		div.attr = attr;	// 相关属性
		div.die = false;	// 没有死亡
		//飞机图片
		var img = document.createElement("img");
		div.appendChild(img);
		img.src = attr.img1;
		//最大血量
		var divhp = document.createElement("div");
		div.appendChild(divhp);
		divhp.style.width = attr.hp+"px";
		//当前血量
		var divhpval = document.createElement("div");
		divhp.appendChild(divhpval);
		divhpval.style.width = attr.hp+"px";
		divhpval.className = "hv";
		// 速度
		var speed = attr.speed[parseInt(Math.random()*attr.speed.length)];
		//敌机运动
		var move = ()=>{
			var n = div.offsetTop;
			n+=speed;
			div.style.top = n+"px";
			if( n>568 ){
				clearInterval(div.timer);
				this.stage2.removeChild(div);
			}
		}
		div.timer = setInterval(move, 100);
	}
	createFoeAll(){
		var that = this;
		
		var foe = {
			"1":{
				"width" : 34,
				"height": 24,
				"img1": "images/foe小飞机34_24.png",
				"img2": "images/foe小飞机挨打34_24.png",
				"img3": "images/foe小飞机爆炸34_24.gif",
				"hp": 5,
				"speed": [4,6,8,10,12,14],
				"score": 1,
				"harm": 1
			},
			"2":{
				"width" : 46,
				"height": 60,
				"img1": "images/中飞机46_60.png",
				"img2": "images/中飞机挨打46_64.png",
				"img3": "images/中飞机爆炸46_60.gif",
				"hp": 10,
				"speed": [3,5,7,9],
				"score": 5,
				"harm": 3
			},
			"3":{
				"width" : 110,
				"height": 164,
				"img1": "images/大飞机110_164.png",
				"img2": "images/大飞机挨打110_170.png",
				"img3": "images/大飞机爆炸110_169.gif",
				"hp": 50,
				"speed": [1,2,3],
				"score": 20,
				"harm": 10
			}
		}
				
		that.timer = setInterval(()=>{
			var attr = foe[[1,1,1,1,2,2,2,1,3][parseInt(Math.random()*9)]];
			that.createFoe(attr);			
		}, 3000);		
	}
	pengpeng(bullet){
		var that = this;
		// 我方炮弹是否碰到了敌方飞机
		var foes = document.querySelectorAll(".foe");
		for( let i=0; i<foes.length; i++ ){
			let foe = foes[i];
			if( that.pengzhuang(bullet, foe) ){	
				// 表示我方炮弹碰到了敌方飞机
				// 我方炮弹销毁
				bullet.parentNode.removeChild(bullet);
				clearInterval(bullet.timer);
				// 敌方飞机血量的减少
				that.foeTake(foe);
			}
		}
	}
	pengzhuang(elem1, elem2){
		var al = elem1.offsetLeft;
		var ar = elem1.offsetLeft+elem1.offsetWidth;
		var at = elem1.offsetTop;
		var ab = elem1.offsetTop+elem1.offsetHeight;
		
		var bl = elem2.offsetLeft;
		var br = elem2.offsetLeft+elem2.offsetWidth;
		var bt = elem2.offsetTop;
		var bb = elem2.offsetTop+elem2.offsetHeight;
		
		return ar>bl && al<br && ab>bt && at<bb ;
	}
	foeTake(foe){
		var that = this;
		if(foe.die==false){
			var img = foe.querySelector("img");
			var div = foe.querySelector(".hv");
			var attr = foe.attr;
			var n = div.offsetWidth-3;
			if( n<=0 ){				
				clearInterval(foe.timer);
				img.src = attr.img3;			
				foe.die = true;
				that.score.innerHTML = Number(that.score.innerHTML)+attr.score;
				setTimeout(()=>{
					foe.parentNode.removeChild(foe);
				}, 500);				
			}else{
				div.style.width = n+"px";
				img.src = attr.img2;
			}
		}
	}
	// 我方飞机与敌方飞机的碰撞
	zhuangzhuang(){
		var that = this;
		var myplane = this.myPlane;		
		// 我方飞机与敌方飞机的碰撞		
		var foes = document.querySelectorAll(".foe");
		for( let i=0; i<foes.length; i++ ){
			let foe = foes[i];			
			if( that.pengzhuang(myplane, foe) ){									
				// 敌方飞机弄死
				foe.remove();
				clearInterval(foe.timer);
				// 我方飞机血量的减少
				that.myTake(foe.attr.hp);
			}
		}		
	}
	myTake(foehp){
		var that = this;
		var myplane = that.myPlane;		
		var img = myplane.querySelector("img");
		var div = myplane.querySelector(".hv");
		var n = div.offsetWidth-foehp;
		if( n<=0 ){	
			img.src = "images/我的飞机爆炸66_82.gif";	
			setTimeout(()=>{
				myplane.parentNode.removeChild(myplane);
			}, 500);									
			that.gameover();
		}else{
			div.style.width = n+"px";
		}		
	}
	gameover(){
		var that = this;
		that.stage.onmousemove = null;
		clearInterval(that.timer);
		that.stage3.style.display = "block";
		clearInterval(that.sky.timer);
	}
}
