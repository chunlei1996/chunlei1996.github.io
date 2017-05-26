/*!
 详情页js
*/
require(['../config'],function(){

	//加载需要用到的模块
	require(['jquery',"template","jquery.cookie"],function($,template,jc){
        $('.append_head').load('../../common.html .header');
        $('.append_foot').load('../../common.html .footer');
		/*放大镜部分*/
		    var leftbox = $('.left');
			var midWrap = $('.middle');
			var filter = $('.filter');
			var largeWrap = $('.large');
			var midImg = $('.middle img');
			var largeImg = $('.large img');

			//获取盒子距离屏幕左边缘的距离
			var ol = leftbox.offset().left;
			var ot = leftbox.offset().top;

			//鼠标在中型盒子上移动
			midWrap.mousemove(function(e){
				//滤镜的位置
				var l = e.pageX - ol - 100;
				var t = e.pageY - ot - 100;
		           		//边界处理
				l = l < 0 ? 0 : (l > 180? 180 : l);
				t = t < 0 ? 0 : (t > 180? 180 : t);
                //console.log(l,t);
				//更改滤镜位置
			filter.css({
			            "left":l,
			            "top":t
		             });
				//更改大图的位置
			
			largeImg.css({
					      "left":-l*1.85,
					      "top":-t*1.85
			              });
			});
			//鼠标经过midWrap显示滤镜和大图盒子
			midWrap.mouseenter(function(){
				filter.show();
				largeWrap.show();
			});
			midWrap.mouseleave(function(){
				filter.hide();
				largeWrap.hide();
			});
			//小图
			var imgs = $('.img-wrap img');
			var arrowR =$('.glass-slide .arrow-right');
			var arrowL = $('.glass-slide .arrow-left');
			var imgWrap =$('.img-wrap');
			//鼠标经过
			imgs.mouseenter(function(){
					var src=$(this).attr('data-url');
					//console.log(src);
					midImg.attr("src",src);
					largeImg.attr("src",src);
					//改变当前图片的边框颜色
					$(this).addClass('active').siblings().removeClass('active');
				
			});
			//左右点击
			var index = 0;
			arrowR.click(function(){
				index++;
				if(index > imgs.length - 5){
					index = imgs.length - 5;
					return;
				}
				imgWrap.animate({
			         marginLeft: -index*72
				});		
			});
			arrowL.click(function(){
				index--;
				if(index < 0){
					index = 0;
					return;
				}
				
				imgWrap.animate({
			         marginLeft: -index*72
				});
			  });
		/*放大镜部分结束*/
		/*加入购物车部分*/	

	  var detail = {
			data: {},
			init: function(){
				var _this = this;
				//读取商品数据
				$.getJSON('../json/detail.json',function(result){
					//保留数据
					_this.data = result;

					var list = template('type-list',result);
					$('.size_con').html( list );

					//选中第一个
					var first = $('.size_con li:first');
					first.addClass('active');
					//获取第一个分类的编号
					var id = first.data('id');
					$('.goods_price').html( result.size[id].sale_price );
					$('.num').html( result.size[id].stock );
				});

				//颜色切换
				this.colorSwitch();

				//增加
				this.increase();
				this.decrease();
				this.input();
				this.addToCart();
			},
			colorSwitch: function(){
				var _this = this;
				$('.size_con').on('click','.select_list',function(){
					$(this).addClass('active').siblings().removeClass('active');
					var id = $(this).data('id');
					$('.goods_price').html( _this.data.size[id].sale_price );
					$('.num').html( _this.data.size[id].stock );
				});
			},
			//数量增加
			increase: function(){
				$('.inc').click(function(){
					//拿到当前的数量
					var amount = parseInt( $(this).prev().val() );
					//获取库存
					var stock = $('.num').html();
					//判断与库存的关系
					if(amount >= stock) return;
					amount++;
					$(this).prev().val( amount );
				});
			},
			//数量减少
			decrease: function(){
				$('.dec').click(function(){
					var input = $(this).next();
					//拿到当前的数量
					var amount = parseInt( input.val());
					if(amount <= 1) return;
					amount--;
					input.val(amount);
				});
			},
			input: function(){
				$('.text').on('input',function(){
					var amount = $(this).val();
					if(amount === '') return;
					// 3d  => 3  parseInt()
					amount = parseInt(amount);
					if( isNaN(amount) ){
						amount = 1;
					}

					//判断库存
					var stock = $('.num').html();
					if(amount >= stock){
						amount = stock;
					}
					$(this).val(amount);
				});
				//失焦之后，如果内容为空，更改为1
				$('.text').blur(function(){
					var amount = $(this).val();
					if(amount === ''){
						 $(this).val(1);
					}
				});
			},
			addToCart: function(){
				$('.addcar').click(function(){
					var goods = $('.select_list.active');
					var id = goods.data('id');
					var amount = parseInt( $('.text').val() );

					//读取cookie  做兼容
					var cart = $.cookie('tm-cart') || '{}';
					cart = JSON.parse(cart);
					//判断是否已经存在当前商品
					if(!cart[id]){
						//不存在
						cart[id] = {
							id: id,
							amount: amount
						};
					}else{
						cart[id].amount += amount;
					}

					alert('加入成功');

					//重写cookie
					$.cookie('tm-cart',JSON.stringify(cart),{expires: 365,path: '/'});

					console.log( JSON.parse($.cookie('tm-cart')) );

				});
			}
	};
	detail.init(); 

	});

});