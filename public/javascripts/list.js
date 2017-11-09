$(function(){
	document.onscroll=function(){
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		document.title=scrollTop;
		if(scrollTop>=500){
			$("#side").stop().animate({opacity:1},200);
			$("#return").stop().animate({opacity:1},200);
		}
		if(scrollTop<500){
			$("#side").stop().animate({opacity:0},200);
			$("#return").stop().animate({opacity:0},200);
		}
	}
	
	$("#return").click(function(){
	    var timer = setInterval(function(){
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

			scrollTop -= 150;

			document.body.scrollTop = scrollTop;
			document.documentElement.scrollTop = scrollTop;

			if(scrollTop <= 0){
				clearInterval(timer);
			}
		}, 30); 		
	})
	

	// 右边划过
	var btb=$("#rigfix");
	var tempS;
	$("#rigfix").hover(function(){
			var thisO = $(this);
			tempS = setTimeout(function(){
				thisO.find("a").each(function(i){
					var tA=$(this);
					setTimeout(function(){ tA.animate({right:"0"},300);},50*i);
				});
			},200);
	},function(){
		if(tempS){ clearTimeout(tempS); }
		$(this).find("a").each(function(i){
			var tA=$(this);
			setTimeout(function(){ tA.animate({right:"-80"},300,function(){
			});},50*i);
		});

	})
	// 返回顶部
	$("#return1").click(function() {
		$("body").animate({scrollTop:0},600);
	});


	$("#photo").find("li").hover(function(){
		
		$(this).css("background","white");
	},function(){
		$(this).css("background","#c40000");
	})


	// $("#shi").hover(function(){
	// 	$("#abs").animate({left:-7},200);
	// },function(){
	// 	$("#abs").animate({left:0},200);
	// })

	$(".box2").on("mouseover mouseout",".abs",function(event){
		if(event.type == "mouseover"){
			// alert(1);
			$(this).stop().animate({left:-7},200);
		}else if(event.type == "mouseout"){
			$(this).stop().animate({left:0},200);
		}
	})
})