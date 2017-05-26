/*!
	注册页面  js
*/

//加载配置文件
require(['../config'],function(){

	//加载需要用到的模块
	require(['jquery','jquery.cookie'],function($,jc){

		//注册处理

		//定义各个注册信息的状态  默认都是false
		var  regStatus = {
			uname: false,
			psw: false,
			phone: false,
			repsw:false
		};

		//定义需要用到的变量
	
			var unameInput = $('.username'),
			pswInput = $('.psw'),
			repswInput=$('.repsw'),
			phoneInput = $('.phnum'),
			verifyCon=$('.verf'),
			inverify=$('.verify'),
			change_v=$('.change_v'),
			regBtn = $('.regist_now');

           
            var err0=$('.err0'),
                err1=$('.err1'),
                err2=$('.err2'),
                err3=$('.err3'),
                err4=$('.err4');

		//账号验证 (失焦验证  1、用户名是否合法  2、用户名是否已经存在)
		var regUname = /^[a-zA-Z_]\w{5,15}$/;
	      
		
		unameInput.blur(function(){
			var uname = unameInput.val();
			//假设用户名正确
			regStatus.uname = true;
            
			//判断用户名是否合法
			if(!regUname.test(uname)){
				err0.html('用户名不合法');
				err0.show();
				err0.css({"color":"#c41f3a"});                                                                     
				regStatus.uname = false;
				return;
			}else{err0.html('用户名可用');}


			//判断用户名是否已被注册
	/*		$.ajax({
				url: 'http://10.9.151.199/PC-Project-Admin/checkAccount.php',
				data: {
					account: uname
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status){
						err0.html('用户名可用');
					}else{
						err0.html('用户名已存在');
						regStatus.uname = false;
					}
				}
			});
     */
		});
		//手机号验证
        var regPhone = /^1[3578]\d{9}$/; 
		phoneInput.blur(function(){
			var phone = phoneInput.val();
			regStatus.phone = true;
			//手机号处理...
			if(!regPhone.test(phone)){
				err1.html('手机号格式错误！');
				err1.css({"color":"#c41f3a"});
				regStatus.phone = false; 
				return;   

			}else{err1.html('手机号合法');}
		});

		//密码验证

		var regPsw = /^[\w!@#$%^&*_+]{6,16}$/; 
		pswInput.blur(function(){
			var psw = pswInput.val();
			regStatus.psw = true;
		
			if(!regPsw.test(psw)){
				err2.html('密码不合法!');
				err2.css({"color":"#c41f3a"});
				regStatus.psw = false; 
				return;   
			}else{err2.html('密码合法');}
		});
        repswInput.blur(function(){
			var repsw = repswInput.val();
			var psw = pswInput.val();
			regStatus.repsw = true;
			
			if(!(repsw==psw)){
				 err3.html('密码不一致'); 
				err3.css({"color":"#c41f3a"});
				regStatus.repsw = false; 
				return; 
			}else{	
                err3.html('密码正确');
			}

		});
		//验证码
		 var random=parseInt(Math.random()*Math.pow(16,4));
         var verify=('000'+random.toString(16)).substr(-4);
		 change_v.click(function(){
            verifyCon.html(verify);
       });
       inverify.blur(function(){
           var v=inverify.val();
           var reg=new RegExp(verify,'i');
           var r=reg.test(v);
           if(v==''||!r){
           	    err4.html('验证失败!');
           	    err4.css({"color":"#c41f3a"});
            }
           else if(r){
                   err4.html('验证成功');
               }
           

      });
		//点击注册
		regBtn.click(function(){

			//判断所有的信息状态，如果有不合法的，不能注册
			for(var i in regStatus){
				//如果找到某个输入不合法，做出相应的提示并返回
				if(!regStatus[i]){
					alert('部分数据不合法');
					return;
				}else{
					alert('注册成功');
					$.cookie('username',unameInput.val(),{expires: 365,path: '/'});
					$.cookie('userpsw',pswInput.val(),{expires: 365,path: '/'});
                    //console.log( $.cookie('username'));
				}
			}
                  
			//通过ajax提交表单数据
		/*	$.ajax({
				type: 'post',
				url: 'http://10.9.151.199/PC-Project-Admin/register.php',
				data: {
					account: unameInput.val(),
					password: pswInput.val()
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status){
						alert('注册成功');
					}else{
						alert('注册失败');
					}
				}
			});*/
		});


	});

});