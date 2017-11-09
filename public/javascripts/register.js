$(function(){
	var is1=false;
	var is2=false;
	var is3=false;
	var is4=false;
	$("#username").blur(function(){
	var oValue = this.value.replace(/\s/ig, "");
	this.value = oValue;
	if(oValue==""){
		$("#span").eq(0).css("display","block");
		}else if(this.value.length > 10 || oValue.length < 2){
			$("#span").eq(0).css("display","block").html("用户名的长度为6~18位");
		}else if(/^\d/.test(oValue)){
			$("#span").eq(0).eq(0).css("display","block").html("用户名首字母不能为数字");	
		}else if(/\W/ig.test(oValue)){
			$("#span").eq(0).eq(0).css("display","block").html("用户名只能由数字字母下划线组成");	
		}else{
			$("#span").eq(0).css("display","none");
			is1=true;
		}
	})
	$("#pw").blur(function(){
		var oValue = this.value.replace(/\s/ig, "");
		this.value= oValue;
		if(oValue==""){
			$("#dabc1").find("#span").css("display","block").html("密码不能为空");					
		}else if(this.value.length > 20 || oValue.length < 6){
			$("#dabc1").find("#span").css("display","block");
		}else{
			$("#dabc1").find("#span").css("display","none");
			is2=true;

		}
	})
	$("#ag").blur(function(){
		var oValue = this.value.replace(/\s/ig, "");
		this.value= oValue;
		var pwvl=document.getElementById("pw").value.replace(/\s/ig, "");
		if(oValue != pwvl || oValue==""){
			$("#dabc2").find("#span").css("display","block");		
		}else{
			$("#dabc2").find("#span").css("display","none");
			is3=true;

		}
	})
	// 换验证码
	$("#change").click(function(){
		var ooo=document.getElementById("yanzheng");
		ooo.value=testCode(4);
	})

	$("#yanz").blur(function(){
		var oValue = this.value.replace(/\s/ig, "");
		this.value= oValue;
		var yzvl=document.getElementById("yanzheng").value.replace(/\s/ig, "");
		if( oValue==""){
			$("#dabc3").find("#span").css("display","block").html("验证码不能为空");		
		}else if(oValue != yzvl){
			$("#dabc3").find("#span").css("display","block").html("验证码不正确");
		}else{
			$("#dabc3").find("#span").css("display","none");
			is4=true;

		}
	})


	$(".succ").click(function(){
		// alert(1);
		$.ajax({
			url:"/users/register",
			type:'POST',
			dataType:'json',
			async:false,
			data:'username='+ $('#username').val() +"&password="+$('#pw').val(),
			success:function(results){
				console.log(results);
				if(results == '1');
				location.href="/login";
			}
		})
		return false;
	})

	// 下一步
	$("#btn").click(function(){
		if(is1 && is2 && is3 && is4){
			$("#nave").find("li").eq(0).attr("class","");
			$("#nave").find("li").eq(1).attr("class","active");
			$("#dabc").css("display","none");
			$("#phone").css("display","block");
		}else{
			alert('请输入正确信息')
		}
		
	})

	$("#button").click(function(){
		$("#nave").find("li").eq(1).attr("class","");
		$("#nave").find("li").eq(2).attr("class","active");	
		$("#phone").css("display","none");
		$("#success").css("display","block");
	})



	// 生成验证码
	function testCode(n){
		var arr = []; 
		for(var i = 0; i < n; i++){
			var tmp = parseInt(Math.random() * 100);
			if(tmp < 10){ 
				arr.push(tmp);
			}else if(tmp >= 65 && tmp <= 90){ 
				var str = String.fromCharCode(tmp);
				arr.push(str);
			}else if(tmp >= 17 && tmp <= 42){ 
				var str = String.fromCharCode(tmp + 80);
				arr.push(str);
			}else{
				i--;
			}
		}
		return arr.join("");
	}
})

