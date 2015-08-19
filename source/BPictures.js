// 滚动式图片效果小插件
// version 1.0
// author LMN

function BPictures(element,options){
	var _self = this;
	this.options = {
		'width' : options.width || 0,//图片的width
		'height' : options.height || 0,//图片的height
		'ol' : {
			'fontNormalC' : options.ol ? options.ol.fontNormalC || 'black' : 'black',//数字标文字正常颜色
			'fontNormalB' : options.ol ? options.ol.fontNormalB || 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.5)',//数字标背景正常颜色
			'fontActiceC' : options.ol ? options.ol.fontActiceC || '#fff' : '#fff',//数字标文字激活颜色
			'fontActiceB' : options.ol ? options.ol.fontActiceB || 'rgba(255,102,0,0.8)' : 'rgba(255,102,0,0.8)',//数字标背景激活颜色
			'right' : options.ol ? options.ol.right || 5 : 5,//数字标距离右侧的距离
			'bottom' : options.ol ? options.ol.bottom || 5 : 5,//数字标距离底部的距离
			'width' : options.ol ? options.ol.width || 15 : 15,//数字标宽度
			'height' : options.ol ? options.ol.height || 15 : 15//数字标高度
		},
		'transitionTime' : options.transitionTime*1000 || 3000
	};
	this.element = document.getElementById(element);
	
	this.eleul = this.element.getElementsByTagName('ul')[0];
	this.eleuli = this.eleul.getElementsByTagName('li');
	this.eleimg = this.eleul.getElementsByTagName('img');

	this.element.appendChild(document.createElement('ol'));
	this.eleol = this.element.getElementsByTagName('ol')[0];

	for(this.num=0; this.num<this.eleuli.length; this.num++){
		this.test = document.createElement('li');
		this.test.textContent = this.num+1;
		this.eleol.appendChild(this.test);
	}
	this.eleoli = this.eleol.getElementsByTagName('li');
	this.flag = 0;
	BPictures.prototype.init = function(){
		this.element.style.width = this.options.width+'px';
		this.element.style.height = this.options.height+'px';
		this.element.style.overflow = 'hidden';
		this.element.style.position = 'relative';

		this.eleul.style.position = 'absolute';
		this.eleul.style.left = 0;
		this.eleul.style.top = 0;
		this.eleul.style.listStyle = 'none';
		this.eleul.style.margin = 0;
		this.eleul.style.padding = 0;
		this.eleol.style.listStyle = 'none';
		this.eleol.style.position = 'absolute';
		this.eleol.style.right = this.options.ol.right+'px';
		this.eleol.style.bottom = this.options.ol.bottom+'px';
		this.eleol.style.zIndex = 999;
		this.eleol.style.margin = 0;
		this.eleol.style.padding = 0;

		for(this.num=0; this.num<this.eleuli.length; this.num++){
			this.eleuli[this.num].style.cssFloat = 'left';
			this.eleuli[this.num].style.styleFloat = 'left';
			this.eleuli[this.num].style.float = 'left';

			this.eleimg[this.num].style.width = this.options.width+'px';
			this.eleimg[this.num].style.height = this.options.height+'px';
			this.eleimg[this.num].style.cssFloat = 'left';
			this.eleimg[this.num].style.styleFloat = 'left';
			this.eleimg[this.num].style.float = 'left';

			this.eleoli[this.num].style.cssFloat = 'left';
			this.eleoli[this.num].style.styleFloat = 'left';
			this.eleoli[this.num].style.float = 'left';
			this.eleoli[this.num].style.width = this.options.ol.width+'px';
			this.eleoli[this.num].style.height = this.options.ol.height+'px';
			this.eleoli[this.num].style.textAlign = 'center';
			this.eleoli[this.num].style.margin = '2px';
			this.eleoli[this.num].style.cursor = 'pointer';
			this.eleoli[this.num].style.fontSize = '12px';
			this.eleoli[this.num].style.lineHeight = this.options.ol.height+'px';
			if(this.num == 0){
				this.eleoli[this.num].style.color = this.options.ol.fontActiceC;
				this.eleoli[this.num].style.background = this.options.ol.fontActiceB;
				this.eleoli[this.num].style.fontWeight = 'bold';
			}else{
				this.eleoli[this.num].style.color = this.options.ol.fontNormalC;
				this.eleoli[this.num].style.background = this.options.ol.fontNormalB;
			}
			this.eleoli[this.num].id = this.num;
			this.eleoli[this.num].onclick = function(){
				_self.flag = this.id
				_self.click();
			}
		}

		this.element.onmouseover = function(){
			clearInterval(_self.interval);
		}
		this.element.onmouseout = function(){
			_self.show();
		}
	}
	BPictures.prototype.change = function(style){

		clearInterval(this.eleul.intervals);
		this.eleul.intervals = setInterval(function(){
			var stop = true;
			var cur = 0;
			var cur = parseInt(this.eleul.style.top);
			var speed = (style-cur)/10;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(cur != style){
				stop = false;
			}
			this.eleul.style.top = cur + speed + 'px';
			if(stop){
				clearInterval(this.eleul.intervals);
			}
		}.bind(this), 30);
	}

	BPictures.prototype.click = function(){
		for(this.num = 0; this.num<this.eleuli.length; this.num++){
			this.eleoli[this.num].style.color = this.options.ol.fontNormalC;
			this.eleoli[this.num].style.background = this.options.ol.fontNormalB;
			this.eleoli[this.num].style.fontWeight = 'normal';
		}

		this.eleoli[this.flag].style.color = this.options.ol.fontActiceC;
		this.eleoli[this.flag].style.background = this.options.ol.fontActiceB;
		this.eleoli[this.flag].style.fontWeight = 'bold';
		this.change(-(this.options.height)*this.flag);
	}
	BPictures.prototype.next = function(){
		this.flag++;
		if(this.flag == this.eleoli.length){
			this.flag = 0;
		}
		this.click();
	}
	BPictures.prototype.show = function(){
		this.interval = setInterval(this.next.bind(this), this.options.transitionTime);
	}
	this.init();
	this.show();
}

