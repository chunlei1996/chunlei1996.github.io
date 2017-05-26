/*!
	轮播图js
*/
define(function(){
		var banner = {
						imgs: $('.pic img'),
						circle:$('.circle-item'),
					    index:0,
					    banner_nav:$('.banner_nav'),
						timer: null,
						init: function(){
							this.autoPlay();
							this.circleClick();
							this.bannerEnter();
							//console.log(this.imgs);
						},
						//自动轮播
						autoPlay: function(){
							var _this = this;
							this.timer = setInterval(function(){
                              _this.imgSwitch();
							},3000);
						},
						//点击小圆圈图片切换
						circleClick:function(){
							var _this=this;
							this.circle.click(function(){
                                 clearInterval(_this.timer);
                                 _this.index=$(this).index()-1;
			                     _this.imgSwitch();
			                   
			                   // console.log(_this);
							}); 
						},
	
						//图片切换小圆点跟随
						imgSwitch:function(){
							       this.index++;
                                if(this.index>=this.imgs.length){
                                	this.index=0;	
                                }
                                this.circle.eq(this.index).addClass('active').siblings().removeClass('active');
                                this.imgs.eq(this.index).fadeTo(2000,1).siblings().fadeTo(2000,0);
						},
					   //鼠标进入停止自动轮播，鼠标离开自动轮播
                       bannerEnter:function(){
                       	   var _this=this;
                           this.banner_nav.mouseenter(function(){
                              clearInterval(_this.timer);
                           });
                           this.banner_nav.mouseleave(function(){
                              _this.autoPlay();
                           });
                       }
					};
		banner.init();

});
