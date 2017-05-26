
require(['../config'],function(){
	require(['jquery','pagination','lazyload'],function($,pagination,lazyload){
         $('.append_head').load('../../common.html .header');
         $('.append_foot').load('../../common.html .footer');
         	
         var goodsList={
              con:$('.add_goods'),  
              init:function(){
                 this.pageList();
                 this.addData();
                 this.pageClick();
              },  
              pageList:function(){
              	var that=this;
              	$(".M-box4").pagination({
                  	 "pageCount":6,
		 		      callback:function(api){
			 			var data = {
			 				page:api.getCurrent()//获取当前页
			 			  };
			 			$.getJSON('../json/list.json',data,function(result){
			 				//分页处理
					 			//console.log(result);
		                       	var index = data.page;
					 			var t=that.getData(index,result);
								 that.con.html(t);
								 that.lazyImg();
								
			 			});
		 		     }
                  });
              }, 
              addData:function(){
              	var that=this;
              	$.ajax({
			    		type:"get",
			    		url:'../json/list.json',
			    		success:function(result){
					 		var t=that.getData(1,result);
						    that.con.html(t);
						    that.lazyImg();

			    		}
			    	});
              },
              getData:function(index,arr){
		           var cont="";
		            for(i=(index-1)*12;i<index*12;i++){
						    if(i<arr.length){
						          cont+=`       
									<li>
									  <a href="###"><img class="pic lazy" src="../imgs/default_goods_image_240.gif" data-original="${arr[i].pic}"/></a>
									   <p class="p1"><span class="sp1">${arr[i].price1}</span><span class="sp2">${arr[i].price2}</span></p>
									   <p class="p2">${arr[i].detail}</p>
									</li> `;
				           	      }
				           	    
				          }
               return cont;
    	     },
    	     pageClick:function(){
                 $('.M-box4').on('click','a',function(){
                 	var num=$(this).html();            
                 	 $('.goods_page .page1').html(num);
                 });
    	     },
    	     //图片懒加载
    	     lazyImg:function(){
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

          
         };
         goodsList.init();
	});
});