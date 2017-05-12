/*
	首页
*/

require(['config'],function(){
	require(['jquery',"template","banner","jquery.cookie"],function($,tem,banner,jc){
		
          todayLive();
          xianshi();
          comFloor();
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
		console.log(userinfo);
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
		/*今日直播*/
		function todayLive(){
			var lc_list=$('.lc_list'); 
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
		                    <div class="live_pic"><img src="${data[j][i].pic}"/></div>
		                    <p class="lp1"><a href="###">${data[j][i].title}</a></p>
		                    <p class="lp2"><a href="###">${data[j][i].detail}</a></p>
		                    <p class="lp3"><span class="l_sp1"><i>￥</i>${data[j][i].price1}</span><span class="l_sp2">￥${data[j][i].price2}</span></p>
		                </li>
		               	    `;
                    
                   }
                   lc_list.eq(j).html(c);   
                }
       	     }
          });
            
            $('.live_menu .menu1').click(function(){
	       	    $(this).find('a').addClass('active');
	       	    $(this).siblings().find('a').removeClass('active');
	            lc_list.eq($(this).index()).show().siblings().hide();
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
	          	 lc_list.animate({'margin-left':-930*index});
	          });
	           $('.today_live .ar').click(function(){
	          	 index++;
	          	 if(index > 2){
			         index = 2;
			         return;
                   }
	          	 lc_list.animate({'margin-left':-930*index});
	          });
		}
		
        /*今日直播结束*/

        /*限时抢购部分*/
        function xianshi(){
          var f1_list=$('.f1_list');
         $.ajax({
          type:"get",
       	   url: '../json/today_live.json',
       	   dataType:'json',
       	   success:function(data){
              console.log(data);
               
		            for(var z=0;z<4;z++){
		               	var con=''; 
		               	for (var k = 0; k < data[0].length; k++) {
		                 	 con +=`
				                   <li>
						              <div class="f1_pic"><a href="javascript:;"><img src="${data[z][k].pic}"/></a></div>
						              <div class="f1_time">已结束</div>
						              <div class="f1_intr">
						                <p class="lp1"><a href="###">${data[z][k].title}</a></p>
						                <p class="lp2"><a href="###">${data[z][k].detail}</a></p>
						              </div>
						             <p class="lp3"><span class="l_sp1"><i>￥</i>${data[z][k].price1}</span><span class="l_sp2">￥${data[z][k].price2}</span><span class="l_sp3">已结束</span></p>
						           </li>
				               	    `;
		                    
		                   }
		                   f1_list.eq(z).html(con);   
		            }
       	       }
           });

           $('.xs_type li').mouseenter(function(){
           	  $(this).addClass('active').siblings().removeClass('active');

           	   f1_list.eq($(this).index()).show().siblings().hide();
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
	          	 f1_list.animate({'margin-left':-1010*index});
             });

              $('.xs_floor .al').click(function(){
           	  	  index--;
	          	 if(index < 0){
			         index = 0;
			         return;
                   }
	          	 f1_list.animate({'margin-left':-1010*index});
           	  });
           
           
        }     
      /*限时抢购结束*/ 

      /*新品推荐*/
                                                                                             
          var changeGood = {
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
						                    <div class="f2_pic"><img src="${data[j][i].pic}"/></div>
						                    <p class="lp1"><a href="###">${data[j][i].title}</a></p>
						                    <p class="lp2"><a href="###">${data[j][i].detail}</a></p>
						                    <p class="lp3"><span class="l_sp1"><i>￥</i>${data[j][i].price1}</span><span class="l_sp2">￥${data[j][i].price2}</span></p>
						                </li>
						               	    `;
				                    
				                   }
				                   $('.f2_list').eq(j).html(c); 
				                }
				       	     }
				          });
					},
					changeClick:function(){
						var _this=this;
						this.change.click(function(){
                            _this.next++;
					        _this.next %= _this.f2_list.length;
					        if(_this.next>=_this.f2_list.length){
					                _this.next=0;
			                	}
			                _this.imgSwitch();
						});
						
					},
					
					imgSwitch: function(){
						this.f2_list.eq(this.now).hide();
						this.f2_list.eq(this.next).show();
						this.now = this.next;
					}
				};
				changeGood.init();
		  /*楼层选项卡*/
          function comFloor(){
          	var common_con=$('.common_con');
          	var allFloor = $('.tab-floor');
          	
             $.ajax({

				        type:"get",
				       	url: '../json/comfloor.json',
				       	dataType:'json',
				       	success:function(data){
				          //console.log(data);
				          	//遍历选项卡的楼层
				          	 for(var k=0; k<allFloor.length; k++){
				          	 	//找到当前楼层下的.common_list
					          	  for(var j=0;j<allFloor.eq(k).find('.common_list').length;j++){
					               	var c=''; 
					               	for (var i = 0; i < data[0].length; i++) {
					                 	c +=`
							                 <li class="common_l">
							                    <div class="f2_pic"><img src="${data[j][i].pic}"/></div>
							                    <p class="lp1"><a href="###">${data[j][i].title}</a></p>
							                    <p class="lp2"><a href="###">${data[j][i].detail}</a></p>
							                    <p class="lp3"><span class="l_sp1"><i>￥</i>${data[j][i].price1}</span><span class="l_sp2">￥${data[j][i].price2}</span></p>
							                </li>
							               	    `;
					                    
					                   }
					          
					              allFloor.eq(k).find('.common_list').eq(j).html(c); 
					            }
				           
				       		 }
				       	}
				 });

                  $('.common_ul').each(function(){
                  	var commonList = $(this).parent().next().find('.common_list');
	                 $(this).find('li').mouseenter(function(){
			           	  $(this).addClass('active').siblings().removeClass('active');
			           	 commonList.eq($(this).index()).show().siblings().hide();
			           	  $('.first_pic').show();
	             	 });
                  });
             }
          
       /*楼层选项卡结束*/

            var Floors = $('.contain .mt');
				var allFNav = $('.left_list li');
				var floorNav = $('.left_slide');
				var ch = document.documentElement.clientHeight;
				
				$(window).scroll(function(){
					var scrollT = $('body').scrollTop();
					if(scrollT > 1000-ch/2){
						floorNav.fadeIn();
					}else{
						floorNav.fadeOut();
					}
					Floors.each(function(i){
						var h = $(this).outerHeight();
						var t = $(this).offset().top;
						//判断是否为显示的楼层
						if( (t < ch/2 + scrollT)
							 && 
							(t + h > scrollT + ch/2)
						){
							allFNav.eq(i).addClass('active')
								   .siblings().removeClass('active');
							return;
						}
					});
				});

				allFNav.click(function(){
					var index = $(this).index();
					var t = Floors.eq(index).offset().top - 50;
					$('html,body').animate({
						scrollTop: t
					});
				});
              
              $('.back_top').click(function(){

              	 $('html,body').animate({scrollTop:0});
              });
              $('.back_top').mouseenter(function(){
              	$(this).addClass('active');
              });
               $('.back_top').mouseleave(function(){
              	$(this).removeClass('active');
              });
       });
      
	  
	});


