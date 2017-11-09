$(function(){
	
	// 图片放大
	var oS_box=document.getElementById('m5_img');
	var oS_position=oS_box.children[2];
	var oS_mark=oS_box.children[0];
	var oB_box=document.getElementById('bigimg');
	var oB_box_all=document.getElementById('bigimg_all')
	oS_mark.onmouseover=function(){
		oS_position.style.display='block';
		oB_box.style.display='block';

	}
	oS_mark.onmouseout=function(){
		oS_position.style.display='none';
		oB_box.style.display='none';
	}

	oS_mark.onmousemove=function(event){
		var evt=event||window.event;

		var left=evt.offsetX-oS_position.offsetWidth/2;
		//console.log(left)
		
		if(left<0){
			left=0;
		}else if(left>oS_box.offsetWidth-oS_position.offsetWidth){
			left=oS_box.offsetWidth-oS_position.offsetWidth
		}
		//console.log(left)
		oS_position.style.left=left+'px';


		var top=evt.offsetY-oS_position.offsetHeight/2;
		if(top<0){
			top=0;
		}else if(top>oS_box.offsetHeight-oS_position.offsetHeight){
			top=oS_box.offsetHeight-oS_position.offsetHeight
		}
		//console.log(top)
		oS_position.style.top=top+'px';

		//移动的比例  把X值和Y值换算成比例;

		var proportionX=left/(oS_box.offsetWidth-oS_position.offsetWidth);
		var proportionY=top/(oS_box.offsetHeight-oS_position.offsetHeight);

		// console.log(proportionX+':'+proportionY)

		//利用比例去算出大小不同的元素的偏移距离；

		oB_box_all.style.left=-proportionX*(oB_box_all.offsetWidth-oB_box.offsetWidth)+'px';

		oB_box_all.style.top=-proportionY*(oB_box_all.offsetHeight-oB_box.offsetHeight)+'px';
	}

	// 划过图片 
	$("#add ul").find("li").hover(function(){
		$(this).css("border","2px solid #666");
		$("#m5_img").find("img").attr("src","img/mid_00"+($(this).index()+1)+".jpg");
		$("#bigimg_all").find("img").attr("src","img/big_00"+($(this).index()+1)+".jpg");
	},function(){
		$(this).css("border","1px solid #dcdcdc");
	})
	$("#add ul").find("li").click(function(){
		$(this).css("border","2px solid #000");
		$("#m5_img").find("img").attr("src","img/mid_00"+($(this).index()+1)+".jpg");
		$("#bigimg_all").find("img").attr("src","img/big_00"+($(this).index()+1)+".jpg");
	})
	var count=null;
	$("#m6_le").click(function(){
		count-=270;
		$("#huad").find("ul").animate({top:count});
	})
	$("#m6_ri").click(function(){
		count+=270;
		$("#huad").find("ul").animate({top:count});
	})
	 
	$("#btn2").click(function(){
		var id = 33 ;
		var first = $.cookie("goods") == null ? true : false;
		var same = false;
		if(first){
			$.cookie("goods", '[{"id":' + id + ',"num":1}]');
		}else{
			var str = $.cookie("goods");
			var arr = JSON.parse(str);
			for(var i in arr){
				if(arr[i].id == id){
					arr[i].num++;
					var cookieStr = JSON.stringify(arr);
					$.cookie("goods", cookieStr);
					same = true;
				}
			}
			if(!same){
				var obj = {
					id: id,
					num: 1
				}
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				$.cookie("goods", cookieStr);
			}
		}
		alert("购物车添加成功！");
	})
	$(".deta").click(function(){
		// $(this).css('background','white');
		$("#stopimg").css("display","block");
		$('#cit').css("display","none");
	})

	var pageNo =1;
	var max = 0;
	// 商品评论
	$("#getdata").click(function(){
		$("#stopimg").css("display","none");
		$('#cit').css("display","block");
		getData();
	})

	// 首页
	$("#span_one").click(function(){
		pageNo = 1;
		getData();
	})
	// 上一页
	$("#span_two").click(function(){
		pageNo = pageNo > 1 ?parseInt(pageNo) - 1 :pageNo;
		getData();
	})

	//下一页
	$("#span_four").click(function(){
		pageNo = pageNo < max ? parseInt(pageNo ) + 1:pageNo;
		getData();
	})
	// 尾页
	$("#span_five").click(function(){
		pageNo = 4;
		getData();
	})

	function getData(){
		$.ajax({
			url:"/users/list",
			type:'POST',
			dataType:'json',
			async:false,
			data:'pageNo='+ pageNo,
			success:function(res){
				console.log(res);
				var html="";
				res.arr.forEach(function(item,index){
					html+='<li><p>用户名：'+item.username+'</p><p><a>评论详情：</a>'+item.content+'</p><p><a>评论时间：</a>'+item.udate+'</p><span><b>商家解释：</b>亲，谢谢您的支持，您的肯定是我们前进的动力，祝您购物愉快！！</span></li>'
				})
				$("#comment_show1").html(html);

				max = res.totalPage;
				pageNo = res.pageNo;
				$("#span_three").html(res.pageNo +"/"+res.totalPage);
				
				$(".zong").html(res.count);
			}
		})
	}


	// 发表评论
	$(".btn").click(function(){
		$.ajax({
			url:"users/comment",
			type:"POST",
			data:"content=" + $(".showp").val(),
			dataType:'json',
			success:function(res){
				pageNo = 1;
				console.log(res);
				
			}
		})
		alert('评论成功');
		getData();
	})
})