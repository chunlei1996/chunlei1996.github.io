/*
	首页
*/

require(['config'],function(){
	require(['jquery',"banner","jquery.cookie","search",'lazyload'],function($,banner,jc,search,lazyload){
		
        //注册小提示
        $('.reg_close').click(function(){
        	$(this).parent().hide();
        })
   
       
       /*用户登录部分*/   
       //读取cookie，判断用户是否登录，填充信息
		var userinfo = $.cookie('userinfo');
		
		//如果有用户信息
		if(userinfo){
			//将json字符串转化为json对象
			userinfo = JSON.parse(userinfo);
			//用户处于登录状态,更改信息
			if(userinfo.login_status){
				$('.wl').html( userinfo.account + '，<a href="javascript:;" class="logout">退出</a>' );
			}else{
				$('.wl').html( userinfo.account + '，<a href="login.html">请登录</a>,<a href="register.html">免费注册</a>' );
			}
		}
		//console.log(userinfo);
		//退出
		$('.logout').click(function(){
			var info = {
				account: userinfo.account,
				login_status: 0
			};
			$.cookie('userinfo',JSON.stringify(info),{expires: 365,path: '/'});
			location.href = "login.html";
		});
        /*用户登录部分结束*/
         
         //图片懒加载，当图片出现在可视区域时加载
          function lazyImg(){
            
			 $('img.lazy').lazyload({
					effect: 'fadeIn',//显示的效果  
					data_attribute: 'original', //规定真实图片的url
					threshold:0, //声明图片距离屏幕底端多少距离时开始加载图片
					failure_limit:100, //容差
					load: function(){ //图片加载完成做的事情
						$(this).removeAttr('data-original');
					}
			 });     
          }
		/*今日直播*/
		var todayLive={
				lc_list:$('.lc_list'),
				init:function(){
					this.getajax1();
					this.handle();
				},
			     getajax1:function(){
			     	var _this=this;
			       	 $.ajax({
			          type:"get",
			       	   url: '../json/today_live.json',
			       	   dataType:'json',
			       	   success:function(data){
			               console.log(data);
			               
			               for(var j=0;j<2;j++){
			               	var c=''; 
				               	for (var i = 0; i < data[0].length; i++) {
				                 	 c +=`
						                 <li>
						                    <div class="live_pic">
						                    	<img class="lazy" data-original="${data[j][i].pic}" src="../imgs/default_goods_image_240.gif" width="180" height="180"/>
						                    </div>
						                    <p class="lp1"><a href="###">${data[j][i].title}</a></p>
						                    <p class="lp2"><a href="###">${data[j][i].detail}</a></p>
						                    <p class="lp3"><span class="l_sp1"><i>￥</i>${data[j][i].price1}</span><span class="l_sp2">￥${data[j][i].price2}</span></p>
						                </li>
						               	    `;
				                    
				                   }
			                   _this.lc_list.eq(j).html(c);   
			                }
                             lazyImg();

			       	     }
			          });
			       },
	              handle:function(){
	              	 var _this=this;
		             $('.live_menu .menu1').click(function(){
			       	    $(this).find('a').addClass('active');
			       	    $(this).siblings().find('a').removeClass('active');
			            _this.lc_list.eq($(this).index()).show().siblings().hide();
			       	  });
			         $('.today_live').mouseenter(function(){
			         	$(this).find('.arrow').show();
			         });
			          $('.today_live').mouseleave(function(){
			         	$(this).find('.arrow').hide();
			         	
			         });
			          var index=0;
			          $('.today_live .al').click(function(){
			          	 index--;
			          	 if(index < 0){
					         index = 0;
					         return;
		                   }
			          	 _this.lc_list.animate({'margin-left':-930*index});
			          });
			           $('.today_live .ar').click(function(){
			          	 index++;
			          	 if(index > 2){
					         index = 2;
					         return;
		                   }
			          	 _this.lc_list.animate({'margin-left':-930*index});
			          });
		              }      
		};
		todayLive.init();
        /*今日直播结束*/

        /*限时抢购部分*/
        var xianshi={
	           f1_list:$('.f1_list'),
	           timer:null,
	           init:function(){
	           	   this.getajax2();
	           	   this.handleSlide();
	           	   this.handleTime();
	           },
		        getajax2:function(){
		        	var _this=this;
		        	
		        	//console.log("调用时间："+_this.handleTime())
		        	$.ajax({
			           type:"get",
			       	   url: '../json/today_live.json',
			       	   dataType:'json',
			       	   success:function(data){
			              //console.log(data);
	                      for(var z=0;z<4;z++){
				               	var con=''; 
				               	for (var k = 0; k < data[0].length; k++) {
				                 	 con +=`
						                   <li>
								              <div class="f1_pic">
								              	<a href="javascript:;">
								              		<img  class="lazy" src="../imgs/default_goods_image_240.gif" data-original="${data[z][k].pic}"  />
								              	</a>
								              </div>
								              <div class="f1_time">距结束<span class="endTime"></span></div>
								              <div class="f1_intr">
								                <p class="lp1"><a href="###">${data[z][k].title}</a></p>
								                <p class="lp2"><a href="###">${data[z][k].detail}</a></p>
								              </div>
								             <p class="lp3"><span class="l_sp1"><i>￥</i>${data[z][k].price1}</span><span class="l_sp2">￥${data[z][k].price2}</span><span class="l_sp3">已结束</span></p>
								           </li>
						               	    `;
				                    
				                   }
				                   _this.f1_list.eq(z).html(con);   
				            }
				            lazyImg();
		       	       }
		           });
		        },
		        handleSlide:function(){
	                var _this=this;
		           $('.xs_type li').mouseenter(function(){
		           	  $(this).addClass('active').siblings().removeClass('active');
		           	   _this.f1_list.eq($(this).index()).show().siblings().hide();
		           });
		           var index=0;
		           $('.xs_floor').mouseenter(function(){
		           	  $(this).find('.arrow').show();  
			        });
		           $('.xs_floor').mouseleave(function(){
		           	  $(this).find('.arrow').hide();  
			        });
			       $('.xs_floor .ar').click(function(){
			          	 index++;
			          	 if(index > 2){
					         index = 2;
					         return;
		                   }
			          	 _this.f1_list.animate({'margin-left':-1010*index});
		             });
		            $('.xs_floor .al').click(function(){
		           	  	  index--;
			          	 if(index < 0){
					         index = 0;
					         return;
		                   }
			          	 _this.f1_list.animate({'margin-left':-1010*index});
		           	  });
		           
		        },
		        catTime:function(){
                   var now=new Date();
                   var end=new Date('2017/6/5 00:00:00');
                   var num=end-now;
                   var day=parseInt(num/1000/60/60/24);
                   var h=parseInt(num/1000/60/60%24);
                   var m=parseInt(num/1000/60%60);
                   var s=parseInt(num/1000%60);
                   h=h<10?'0'+h:h;
                   m=m<10?'0'+m:m;
                   s=s<10?'0'+s:s;
                   var time=day+'天'+h+':'+m+':'+s;
                   return time;
		        },
		        handleTime:function(){
		        	var that=this;
		        	this.timer=setInterval(function(){
			             that.catTime();
			            var res= that.catTime();
			            $(".endTime").html(res);
			            //console.log(res);
			            
			         
			         },1000);
		          
		        }       
        };
        xianshi.init();

      /*限时抢购结束*/ 
    
       
      /*新品推荐*/                                                                                           
       var changeGoods = {
					f2_list: $('.xp_floor .f2_list'),
					change:$('.xp_floor .f2_change'), 
                    
					now: 0,
					next: 0,
					init:function(){
						this.changeClick();
						this.getajax();
					},
					getajax:function(){
						   
						  $.ajax({

				           type:"get",
				       	   url: '../json/xp.json',
				       	   dataType:'json',
				       	   success:function(data){
				               console.log(data);
				               
				               for(var j=0;j<4;j++){
				               	var c=''; 
				               	for (var i = 0; i < data[0].length; i++) {
				                 	 c +=`
						                 <li class="common_l">
						                    <div class="f2_pic">
						                    	<img class="lazy" src="../imgs/default_goods_image_240.gif" data-original="${data[j][i].pic}"/>
						                    </div>
						                    <p class="lp1"><a href="###">${data[j][i].title}</a></p>
						                    <p class="lp2"><a href="###">${data[j][i].detail}</a></p>
						                    <p class="lp3"><span class="l_sp1"><i>￥</i>${data[j][i].price1}</span><span class="l_sp2">￥${data[j][i].price2}</span></p>
						                </li>
						               	    `;
				                    
				                   }
				                   $('.f2_list').eq(j).html(c); 
				                }
				                lazyImg();
				       	     }
				          });
					},
					changeClick:function(){
						var _this=this;
						this.change.click(function(){
                            _this.next++;
					        _this.next %= _this.f2_list.length;
			                _this.imgSwitch();
						});
						
					},
					
					imgSwitch: function(){
						this.f2_list.eq(this.now).hide();
						this.f2_list.eq(this.next).show();
						this.now = this.next;
					}
	    };
		changeGoods.init();
		  /*楼层选项卡*/
        var comFloor={
	          	common_con:$('.common_con'),
	          	allFloor:$('.tab-floor'),
	          	init:function(){
	               this.getajax();
	               this.handleSwitch();
	          	},
	          	getajax:function(){
	          		var _this=this;
	          		 $.ajax({

					        type:"get",
					       	url: '../json/comfloor.json',
					       	dataType:'json',
					       	success:function(data){
					          //console.log(data);
					          	//遍历选项卡的楼层
					          	 for(var k=0; k<_this.allFloor.length; k++){
					          	 	//找到当前楼层下的.common_list
						          	  for(var j=0;j<_this.allFloor.eq(k).find('.common_list').length;j++){
						               	var c=''; 
						               	for (var i = 0; i < data[0].length; i++) {
						                 	c +=`
								                 <li class="common_l">
								                    <div class="f2_pic"><img class="lazy" src="../imgs/default_goods_image_240.gif" data-original="${data[j][i].pic}"/></div>
								                    <p class="lp1"><a href="###">${data[j][i].title}</a></p>
								                    <p class="lp2"><a href="###">${data[j][i].detail}</a></p>
								                    <p class="lp3"><span class="l_sp1"><i>￥</i>${data[j][i].price1}</span><span class="l_sp2">￥${data[j][i].price2}</span></p>
								                </li>
								               	    `;
						                    
						                   }
						          
						              _this.allFloor.eq(k).find('.common_list').eq(j).html(c); 
						            }
					           
					       		 }
					       		 lazyImg();
					       	}
					 });
	          	},
	            
	             handleSwitch:function(){
	                 	 $('.common_ul').each(function(){
		                  	 var commonList = $(this).parent().next().find('.common_list');
			                 $(this).find('li').mouseenter(function(){
					           	  $(this).addClass('active').siblings().removeClass('active');
					           	  commonList.eq($(this).index()).show().siblings().hide();
					           	  $('.first_pic').show();
			             	 });
	                  });
	             }	                 
            };
         comFloor.init();
       /*楼层选项卡结束*/
           
           /*楼层效果*/
        var floorList={
               Floors:$('.contain .mt'),
				allFNav:$('.left_list li'),
				floorNav:$('.left_slide'),
				ch:document.documentElement.clientHeight,
				init:function(){
					this.handle();
				},
				handle:function(){
					var _this=this;
	                 $(window).scroll(function(){
							//var scrollT = $('body').scrollTop();
							var scrollT=document.body.scrollTop;

							if(scrollT > 1000-_this.ch/2){
								_this.floorNav.fadeIn();
							}else{
								_this.floorNav.fadeOut();
						    }
							_this.Floors.each(function(i){

								var h = $(this).outerHeight();
								var t = $(this).offset().top;
								//判断是否为显示的楼层
								if( (t < _this.ch/2 + scrollT)
									 && 
									(t + h > scrollT + _this.ch/2)
								){
									_this.allFNav.eq(i).addClass('active')
										   .siblings().removeClass('active');
									return;
								}
							});
					  });

					this.allFNav.click(function(){
						var index = $(this).index();
						var t = _this.Floors.eq(index).offset().top - 50;
						$('html,body').animate({
							scrollTop: t
						});
					 });
			   }				
          };
          floorList.init();

              
              
               
           /*回到顶部*/
           $('.back_top').click(function(){
              	 $('html,body').animate({scrollTop:0});
            });
           /*顶部固定导航显示*/
           $(window).scroll(function(){
           	  
           	  //console.log($(document).scrollTop());
           	  if($(document).scrollTop()>570){
           	  	  $('.searchfix').slideDown(500);
           	  }
           	  if($(document).scrollTop()<=0){
           	  	$('.searchfix').slideUp(500);
           	  }
           });
           

       });
      
	  
	});


