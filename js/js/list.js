require(['../config'],function(){
	require(['jquery','pagination'],function($,pagination){
         $('.append_head').load('../../common.html .header');
         $('.append_foot').load('../../common.html .footer');
         	
         var goodsList={
              con:$('.add_goods'),  
              init:function(){
                 this.pageList();
                 this.addData();
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
			    		}
			    	});
              },
              getData:function(index,arr){
		           var cont="";
		            for(i=(index-1)*12;i<index*12;i++){
						    if(i<arr.length){
						          cont+=`       
									<li>
									  <a href="###"><img class="pic" src="${arr[i].pic}"/></a>
									   <p class="p1"><span class="sp1">${arr[i].price1}</span><span class="sp2">${arr[i].price2}</span></p>
									   <p class="p2">${arr[i].detail}</p>
									</li> `;
				           	      }
				           	    
				          }
               return cont;
    	     }

          
         };
         goodsList.init();
	});
});