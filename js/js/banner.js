/*


	1、左右切换
	2、自动轮播
	3、鼠标悬停（经过停止自动轮播，离开继续自动轮播）
	4、小圆圈经过切换图片

	核心：
		找到下一次显示的图片的下标（index值）

		图片切换：
			图片切换
			小圆圈跟随
		
*/
var pic=$('.pic');
var img =$('.pic-item');
var sl=$('.sp-left');
var sr=$('.sp-right');
var banner=$('.banner');
var circle=$('.circle-item');

var timer;
var index=0;

function autoPlay(){
	timer=setInterval(function(){
		index++;
		changeImg();
	},2000);
  }
  autoPlay();
banner.mouseenter(function(){
	clearInterval(timer);
   });
banner.mouseleave(function(){
	autoPlay();
 });
 circle.click(function(){
      index=$(this).index();
      changeImg();
 });
function changeImg(){
	//清除1前一张的切换状态
	
	//点击右边切换到最后一张后无缝连接第二张
	   if(index>=img.length){
	   	  pic.css({'margin-left':0});
	   	  index=1;
	   }
   //点击左边切换到第一张时，无缝连接到倒数第二张
	   if(index<=-1){
           pic.css({'margin-left':-1275*(img.length-1)});
	   	   index=img.length-2;
	   }
   
    pic.animate({'margin-left':-1275*index},1000,'linear');
    //小圆圈跟随切换
    circle.removeClass('active');
    var j = (index==img.length-1)? 0 : index;
    circle.eq(j).addClass('active');
  
}
