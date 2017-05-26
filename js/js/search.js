 /*搜索框部分js*/
 define(["jquery"],function(){
 	  var searchBox={
        	  insearch:$('.in_search'),
        	  scList:$('.search_list'),
            num:0,
        	  init:function(){
                 this.searchInput();
                 this.searchClick();
               

        	  },
        	  //文本框输入时获取数据
        	  searchInput:function(){
        	  	var that=this; 
        	  	this.insearch.bind('input',function(){
                      // console.log(that.insearch.val());
                      that.getData();
                      that.scList.show();
                      that.pressKey();

        	  		});
        	    },
              //点击搜索词时获取数据,点击提交跳转页面
      	    searchClick:function(){
      	    	var that=this;
      	    	$('.search_list').on('click','.search_words',function(){
                      that.insearch.val($(this).html());
      	    	});
              $('.btn_search').click(function(){
                   window.location='http://www.baidu.com/s?wd=' + that.insearch.val();
              });
               //点击页面任意地方，下拉菜单消失
               $(document).click(function(){
                   that.scList.hide();

               });
      	    },

            //keypress按上下键切换搜索词条，按回车跳转页面
            pressKey:function(){
               var that=this;
               this.num = 0;
               $(document).keydown(function(e){
                  var con=$('.search_words').eq(that.num).html();
                 
                  //点击下键切换
                   if($('.search_words').length>0 && e.keyCode==40){
                      $('.search_words').removeClass('active');
                      $('.search_words').eq(that.num).addClass('active');
                     that.insearch.val(con);
                    
                      that.num++;
                      that.num%=$('.search_words').length;
                          
                    }
                    
                      if($('.search_words').length>0 && e.keyCode==38){
                      $('.search_words').removeClass('active');
                      $('.search_words').eq(that.num).addClass('active');
                     that.insearch.val(con);
                     //console.log(that.num);
                      that.num--;
                      if(that.num<0){
                          that.num=$('.search_words').length;
                      }

                    }
                   if(e.ctrlKey&&e.keyCode==13){
                     
                      
                       window.location='http://www.baidu.com/s?wd='+ that.insearch.val();
                   }
               });
            },              
             
        	    //获取数据
                getData:function(){
                	 var that=this;
                     $.ajax({
                     	  type:"get",
			       	      url:'http://suggestion.baidu.com/su?',
			       	      data:{
			       	      	   cb:"getData",
			       	      	   wd:that.insearch.val()			       	      	   
			       	      },
			       	      dataType:'jsonp',
			       	      jsonp:"cb",
			       	      success:function(data){
			       	       	 //console.log(data);
			       	       	 var con='';
			       	       	 for(var i=0;i<data.s.length;i++){
                                con+=`<li class="search_words">${data.s[i]}</li>`;
			       	       	    }
                              $('.search_list ul').html(con);
			       	         }
                     });

                }
               
        	  
    };
        searchBox.init();
}); 
