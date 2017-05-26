/*!
	登录页面  js
*/

//加载配置文件
require(['../config'],function(){

	//加载需要用到的模块
	require(['jquery','jquery.cookie'],function($){
         	//验证码
         var verifyCon=$('.verf'),
			inverify=$('.verify'),
			change_v=$('.change_v'),
			err4=$('.err4');
		 var random=parseInt(Math.random()*Math.pow(16,4));
         var verify=('000'+random.toString(16)).substr(-4);
		 change_v.click(function(){
            verifyCon.html(verify);
           });
       inverify.blur(function(){
           var v=inverify.val();
           var reg=new RegExp(verify,'i');
           var r=reg.test(v);
           if(v==''||!r){err4.html('验证失败');}
           else if(r){
                   err4.html('验证成功');
               }
           

      });
		$('.login_now').click(function(){
			var account = $('.username').val();
			var psw = $('.psw').val();
			//判断是否输入为空
			if(account=='' || psw == ''){
				console.log();
				alert('用户名或者密码不能为空');
				return;
			  }
		   else  if(account==$.cookie('username') && psw==$.cookie('userpsw'))
			  {
					alert('登录成功');
					var userinfo = {
								account: account,
								login_status: 1
							};
					$.cookie('userinfo',JSON.stringify(userinfo),{expires: 365,path: '/'});
					location.href = '../../index.html';
			   }
			   else{alert('登录失败')};
			
           
		});

			//使用ajax进行登录
			/*$.ajax({
				type: 'post',
				url: 'http://10.9.151.199/PC-Project-Admin/login.php',
				data: {
					account: account,
					password: psw
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status) {
						alert('登录成功');

						//判断是否需要自动登录
						
							var userinfo = {
								account: account,
								login_status: 1
							};
							$.cookie('userinfo',JSON.stringify(userinfo),{expires: 365,path: '/'});
						

						//大部分会跳转到首页
						location.href = '../../index.html';
					}else{
						alert('登录失败');
					}
			    }
		  });*/
         
	});
  
});