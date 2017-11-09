$(function(){
	/*sc_car();*/
	$("#close").click(function(){
		$("#before").css("display","none");
	})


	// 图片轮播
	var oul=$("#ul1");
	var olis=oul.find("li");
	var ols=$("#lunbo").find("ol");
	var ols_li=ols.find("li");

	var arr=["#6f4af2","#e4e6e3","#ff6b00","#d1bd9c","#0ac0ef","#6f4af2"];
	var inow=0;
	var timer=null;
	time();
	timer=setInterval(timerInner,4000);
	function timerInner(){
		inow++;
		tab();
		tab1();
	}
	function tab(){
		if(inow == ols_li.size()){
			ols_li.attr("class","");
			$("#lunbo").css("background",arr[0]);
			ols_li.eq(0).attr("class","active");	
		}else{
			ols_li.attr("class","");
			$("#lunbo").css("background",arr[inow]);
			ols_li.eq(inow).attr("class","active");	
		}	
	}
	function tab1(){
		oul.animate({top: -500 * inow},0,function(){
			if(inow == ols_li.size()){
				inow=0;
				oul.css("top","0px");
			}
		}).delay(3900);
		time();
	}
	function time(){
		$("#timer").animate({left:422},4000).animate({left:-1000},0);
	}
	function tab2(){
		oul.animate({top: -500 * inow},0,function(){
			if(inow == ols_li.size()){
				inow=0;
				oul.css("top","0px");
			}
		});
		time();
	}
	ols_li.click(function(){
		oul.stop();
		$("#timer").stop();
		inow = $(this).index();
		tab();
		tab2();
	})
	$("#lunbo").hover(function(){
		clearInterval(timer);
	}, function(){
		timer = setInterval(timerInner, 4000);
	})


	//侧边栏 划过效果
	var index=null;
	$("#list_ul").on("mouseenter","li",function(){
		index=$(this).index();
		$(this).css("background","#fff");
		$("#list").css("border","2px solid #C60A0A")
		          .css("border-right","2px solid white");
		$("#big").css("display","block");
		$("#big").find("ul").eq(0).css("display","none");
		$(".ull0").eq(index).css("display","block");
	})
	var index1=null;
	$("#list_ul").on("mouseleave","li",function(){
		index1=$(this).index();
		$("#big").css("display","none");
		$("#list").css("border","2px solid #f5f5f5");
		$(this).css("background","#e4e6e3");
		$(".ull0").eq(index1).css("display","none");
	})
	$("#big").hover(function(){	
		$("#big").css("display","block");
		$("#big").find("ul").eq(0).css("display","none");
		$("#list_ul li").eq(index).css("background","#fff");
		$("#list").css("border","2px solid #C60A0A")
		          .css("border-right","2px solid white");
		$(".ull0").eq(index).css("display","block");
	},function(){
		$("#big").css("display","none");
		$(".ull0").eq(index1).css("display","none");
		$("#list").css("border","2px solid #f5f5f5");
		$("#list_ul li").eq(index1).css("background","#e4e6e3");
	})


	// title 划过
	$("#tit_r").find("a").hover(function(){
		$(this).css("border-bottom","1px solid black");
	},function(){
		$(this).css("border-bottom","none");
	})


	// 购物车小图标划过
	$("#m1_1").find("a").find("#buy").hover(function(){
		$(this).stop().animate({left:200},500);
	},function(){
		$(this).stop().animate({left:190},500);
	})


	
	$("#shopping1").hover(function(){
		$("#st1").css("background","white").css("heigth","45px");
		$("#st221").css("display","block").css("border-top","198px");
	},function(){
		$("#st1").css("background"," #fafafa");
		$("#st221").css("display","none");
	})



	// 滚动
	document.onscroll=function(){
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		if(scrollTop>=500){
			$("#scroll").stop().animate({opacity:1},100);
		}
		if(scrollTop<500){
			$("#scroll").stop().animate({opacity:0},100);
		}
	}
	$("#scroll").click(function(){
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
	$(".s1").hover(function(){
		$(".angle1").stop().animate({height:390},500);
		$(".angle2").stop().animate({width:260},500);
		$(".angle3").stop().animate({height:390},500);
		$(".angle4").stop().animate({width:260},500);
	},function(){
		$(".angle1").stop().animate({height:0},500);
		$(".angle2").stop().animate({width:0},500);
		$(".angle3").stop().animate({height:0},500);
		$(".angle4").stop().animate({width:0},500);
	})

	$(".s2").hover(function(){
		// alert(1);
		$(".angle11").stop().animate({height:390},500);
		$(".angle21").stop().animate({width:260},500);
		$(".angle31").stop().animate({height:390},500);
		$(".angle41").stop().animate({width:260},500);
	},function(){
		$(".angle11").stop().animate({height:0},500);
		$(".angle21").stop().animate({width:0},500);
		$(".angle31").stop().animate({height:0},500);
		$(".angle41").stop().animate({width:0},500);
	})
	$(".s3").hover(function(){
		// alert(1);
		$(".angle12").stop().animate({height:390},500);
		$(".angle22").stop().animate({width:260},500);
		$(".angle32").stop().animate({height:390},500);
		$(".angle42").stop().animate({width:260},500);
	},function(){
		$(".angle12").stop().animate({height:0},500);
		$(".angle22").stop().animate({width:0},500);
		$(".angle32").stop().animate({height:0},500);
		$(".angle42").stop().animate({width:0},500);
	})



})
	





