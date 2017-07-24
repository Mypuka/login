/*页面生成时，出现效果*/
$(function(){
	footer();//页脚
	header();//头部
	login();//登录框的弹出
	timer.setTop();//页面2秒后往上走
	draw();//canvas
})
/*头部鼠标划入划出的动态效果*/
function header(){
	$('header ul li').hover(function(){
		$(this).find('div').css('display','block');
		//$(this),append()
	},function(){
		$(this).find('div').css('display','none');;
	})
}
/*登录框的弹出效果*/
function login(){
	$(".search").click(function(){
		$(this).next().toggleClass('hidden').focus();
	})
}
/*页脚效果*/
function footer(){
	$('footer ol li:first-child').click(function(event){
		event.preventDefault();
		$(this).stop(true,false).animate({left:200},'500','linear');
		$(this).next().removeClass('hidden');
		$('footer ol li:nth-child(3)').stop(true,false).animate({right:350},'500','linear');
		$('footer ol li:last-child').stop(true,false).animate({right:200},'500','linear');
	});
	$('footer ol li:nth-child(3)').click(function(event){
		event.preventDefault();
		$('footer ol li:first-child').stop(true,false).animate({left:500},'500','linear');
		$(this).prev().addClass('hidden');
		$(this).stop(true,false).animate({right:650},'500','linear');
		$('footer ol li:last-child').stop(true,false).animate({right:500},'500','linear');
	})
}
var timer = (function(){
	return{
		"homeManScroll" :function(){
			setTimeout(function(){
				$("body").css({
					height:"100%"
					//zoom:"1"
				});
				//var h = $(".wrap").height();
				var h = $(window).height();
				$("#main").css({
					top:h
				});
				$("#main").show().animate({
					top:"-10px"
				},5000)
			},1)
		},
		"setTop":function(){
			setTimeout(this.homeManScroll,2000)
		}
	}
})();
/*canvas 随机验证码*/

changeImg.onclick = function(){
	draw();
	$(this).prev().focus();
}
$('#changeImg').prev().focus(function(){
	draw();
})
/**绘制验证码图片**/
function draw(){
	/**Random Number 随机数**/
	function rn(min,max){
		return Math.floor( Math.random()*(max-min)+min );
	}
	/**Random Color 随机颜色**/
	function rc(min,max){
		var r = rn(min,max);
		var g = rn(min,max);
		var b = rn(min,max);
		return 'rgb('+r+','+g+','+b+')';
	}
	var ctx = changeImg.getContext('2d');
	ctx.textBaseline = 'bottom';
	/**绘制随机背景色**/
	ctx.fillStyle = rc(180,240);
	ctx.fillRect(0,0,changeImg.width,changeImg.height);
	/**绘制随机文字**/
	var str = 'ABCEFGHJKLMNPQRSTWXY3456789';
	for(var i=0; i<4; i++){
		var txt = str[rn(0,str.length)];
		ctx.fillStyle = rc(50,160);
		ctx.font = rn(16,24)+'px SimHei';
		var x = 10+i*15;
		var y = rn(20,18);
		var deg = rn(-45, 45);
		//修改坐标原点和旋转角度
		ctx.translate(x,y);
		ctx.rotate(deg*Math.PI/180);
		ctx.fillText(txt, 0,0);
		//恢复坐标原点和旋转角度
		ctx.rotate(-deg*Math.PI/180);
		ctx.translate(-x,-y);
	}
	/**绘制干扰点**/
	for(var i=0; i<30; i++){
		ctx.fillStyle = rc(0,255);
		ctx.beginPath();
		ctx.arc(rn(0,changeImg.width),rn(0,changeImg.height), 1, 0, 2*Math.PI);
		ctx.fill();
	}
}
