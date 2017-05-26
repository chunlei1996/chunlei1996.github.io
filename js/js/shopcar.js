/*!购物车页js*/
require(['../config'],function(){

	//加载需要用到的模块
	require(["jquery","template","jquery.cookie","layer"],function($,template){
         layer.config({
             path:"js/plug/layer/"
          });
       $('.append_head').load('../../common.html .header');
       $('.append_foot').load('../../common.html .footer');
	  var cart={
      	   cart:{},
      	   data:{},
      	   cartMain:$('.cart-main-content'),
           init:function(){
             var _this=this;
             //读取cookie
             this.readCookie();
             $.getJSON('../json/detail.json',function(data){
                _this.data=data;
                //将获取的数据保留下来
                var result={
                	cart:_this.cart,
                	data:data
                };
                //将数据添加到商品区中
                var list=template('cart-list',result);
                _this.cartMain.html(list);
             });

			//更改数量
      			this.increase();
      			this.decrease();
      			this.input();

      			//删除操作
      			this.delete();
      			this.deleteSelect();

      			//选中
      			this.select();
      			//全选
      			this.selectAll();
           },
           //点击加号商品数量增加
           increase:function(){
               var _this=this;
               this.cartMain.on('click','.amount-increase',function(){
               	   var amount=parseInt($(this).prev().val());
               	//获取data-stock属性值即库存
                  var stock=$(this).parent().data('stock');
                  if(amount>=stock) return;//商品数量大于库存则直接返回
                    amount++;
                    _this.handleMoney($(this),amount);                                                                                                                                                                                    
               });
             },
            //点击减号商品数量减少
           decrease:function(){
               var _this=this;
               this.cartMain.on('click','.amount-decrease',function(){
               	  var amount = parseInt( $(this).next().val() );
               	  if(amount<=1)return;
               	  amount--;
                    _this.handleMoney($(this),amount); 
               });

           },
           //输入数量
           input:function(){
           	 var _this=this;
           	 this.cartMain.on('input','.amount-input',function(){
                   var amount=parseInt($(this).val());
                  var stock=$(this).parent().data('stock');
                  /*判断商品数量，购物车中商品的数量最大不能超过库存 最小不能少于1*/
                  if(amount>=stock) {
                  	 amount=stock;
                  }
                  if(amount === '') return;
        				  if( isNaN(amount) ){
        						     amount = 1;
        					  }
                   _this.handleMoney($(this),amount);
           	 });
           },
           handleMoney:function(obj,amount){
              var money=amount*obj.parents('.cart-goods-item').find('.goods-price').html();
              obj.parents('.cart-goods-item').find('.goods-money').html(money.toFixed(2));
              obj.parent().find('.amount-input').val(amount); 
              //获取商品编号
              var  id=obj.parents('.cart-goods-item').data('id');
              this.cart[id].amount=amount;
             this.setCookie();
              this.handleInfo();
           },
            delete:function(){
              var _this=this;
              this.cartMain.on('click','.delete',function(){
                var that=this;
                layer.confirm('确定删除吗',function(){
                	layer.closeAll();
                	$(that).parents('.cart-goods-item').remove();
                	var id=$(that).parents('.cart-goods-item').data('id');
                	//在页面上删除
                	delete _this.cart[id];
                   //在cookie中删除
                	_this.setCookie();
                });
        
              });
            },
          //批量删除
          deleteSelect:function(){
            var _this=this;
            $('.cart-option .delete').click(function(){
               var allChecked=_this.cartMain.find('input[type=checkbox]:checked');
                //判断商品是否选中
               if(allChecked.length<=0){
               	   layer.alert('请选择商品');
               	   return;
               }
               layer.confirm('确认删除所选商品吗？',function(){
               	  allChecked.each(function(){
               	  	 layer.closeAll();
               	  	 //在页面上删除
               	  	 $(this).parents('.cart-goods-item').remove();
                     //从cookie中删除
                     var id=$(this).parents('.cart-goods-item').data('id');
                    delete _this.cart[id];
                     _this.setCookie();
                    _this.handleInfo();
                    $('input.select-all-btn').prop('checked',false);   

               	  });
               });
            });
          },
          select:function(){
          	var _this=this;
          	this.cartMain.on('change','input[type=checkbox]',function(){
          	   _this.handleInfo();
          	   //判断是否选中全选按钮
          	   var allChecked=_this.cartMain.find('input[type=checkbox]:checked');
          	   var allcheckBox=_this.cartMain.find('input[type=checkbox]');
          	   if(allChecked.length===allcheckBox.length){
          	   	 $('input.select-all-btn').prop('checked',true);//选中全选按钮
          	   }else{
          	   	  $('input.select-all-btn').prop('checked',false); 	  
          	   }
          	 }); 
            
          },
           //全选
		selectAll: function(){
			var _this = this;
			$('input.select-all-btn').click(function(){
				//获取当前的状态
				var status = $(this).prop('checked');
				//所有商品状态
				_this.cartMain.find('input').prop('checked',status);
				_this.cartMain.find('input').change();
				//全选按钮状态
				$('input.select-all-btn').prop('checked',status);
			});
		},
		//处理件数和总价
		handleInfo: function(){
			//获取所有被选中的商品
			var allChecked = this.cartMain.find('input[type=checkbox]:checked');		
			var totalNum = 0;
			var totalMoney = 0;
			//变量所有被选中的商品
			allChecked.each(function(){
				totalNum++;
				var m = $(this).parents('.cart-goods-item').find('.goods-money').html();
				totalMoney += parseFloat( m );
			});
			//判断是否可以结算
			if(totalNum > 0){
				$('.go-pay').addClass('can-pay');
			}else{
				$('.go-pay').removeClass('can-pay');
			}
			//更改件数和总价
			$('.user-goods-amount').html( totalNum );
			$('.user-goods-money').html( totalMoney.toFixed(2) );
		},
		readCookie: function(){
			this.cart = $.cookie('tm-cart') || '{}';
			this.cart = JSON.parse( this.cart );
		},
		setCookie: function(){
			$.cookie('tm-cart',JSON.stringify(this.cart),{expires: 365,path: '/'});
		}
 };  
      cart.init();
	});

});


 