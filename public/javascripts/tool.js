
function Region(node1, node2){
	var l1 = node1.offsetLeft;
	var r1 = node1.offsetLeft + node1.offsetWidth;
	var t1 = node1.offsetTop;
	var b1 = node1.offsetTop + node1.offsetHeight;

	var l2 = node2.offsetLeft;
	var r2 = node2.offsetLeft + node2.offsetWidth;
	var t2 = node2.offsetTop;
	var b2 = node2.offsetTop + node2.offsetHeight;

	//哪些条件下是碰不到的
	if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2){
		return false;
	}else{
		return true;
	}
}




function $_cookie(name, value, json){
	if(arguments.length == 1){ //取值
		var cookieStr = decodeURIComponent(document.cookie);
		//找到开始截取的位置
		var start = cookieStr.indexOf(name);
		if(start == -1){ //如果没有找到 直接return null
			return null;
		}else{
			var end = cookieStr.indexOf(";", start);
			if(end == -1){ //最后一个键值对
				end = cookieStr.length;
			}
		}

		//通过start 和 end进行字符串提取
		var subStr = cookieStr.substring(start, end);
		var arr = subStr.split("=");
		return arr[1];
	}else if(arguments.length == 2 && !value){
		//将当前name下对应cookie过期时间设置成过去的某一个时刻
		document.cookie = encodeURIComponent(name) + "=;expires=" + new Date(0);
	}else{//设置cookie
		//拼接字符串
		var cookieTxt = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		//判断可选参数是否存在
		if(json){
			if(json.expires){ //过期天数
				cookieTxt += ";expires=" + getNumDate(json.expires);
			}
			if(json.path){
				cookieTxt += ";path=" + json.path;
			}
			if(json.domain){
				cookieTxt += ";domain" + json.domain;
			}

			if(json.secure){
				cookieTxt += ";secure";
			}
		}
		//设置cookie
		document.cookie = cookieTxt;
	}
}

//设置cookie7天后过期
function getNumDate(num){
	var d = new Date();
	var day = d.getDate();
	d.setDate(day + num);
	return d;
}
/*
	阻止事件冒泡的函数
*/


function stopBubble(even){
	if(even.cancelBubble){
		even.cancelBubble = true;
	}else if(even.stopPropagation){
		even.stopPropagation();
	}
}


//阻止默认行为
function preventDef(e){
	if(e.preventDefault){
		//w3c
		e.preventDefault();
	}else if(e.returnValue){
		e.returnValue = false;
	}
}


//跨浏览器的绑定事件方法

function addEvent(obj, eventType, func){
	if(obj.attachEvent){
		obj.attachEvent("on" + eventType, func);
	}else{
		obj.addEventListener(eventType, func, false);
	}
}

function removeEvent(obj, eventType, func){
	if(obj.detachEvent){
		obj.detachEvent("on" + eventType, func);
	}else{
		obj.removeEventListener(eventType, func);
	}
}


/*
	获取元素节点的
	参数是   css选择样式
	#id
	.class
	tagName
	[name=name]

*/
function $(vArg){
	//1、判断是否是name	
	var subStr = vArg.substring(0, 6);
	if(subStr == "[name="){
		return document.getElementsByName(vArg.substring(6, vArg.length - 1));
	}else{
		switch(vArg[0]){
			case "#": //#id 
				return document.getElementById(vArg.substring(1));
				break;
			case ".": //className
				return document.getElementsByClassName(vArg.substring(1));
				break;
			default:
				//tagName
				return document.getElementsByTagName(vArg);
				break;

		}
	}
}







/*
		insertAfter(newNode, oldNode)

*/

function insertAfter(newNode, oldNode){
	//分析，如何插入到这个节点之后
	//<1>oldNode之后还有兄弟节点
	//<2>oldNode是最后一个兄弟节点
	var parentNode = oldNode.parentNode;
	//判断oldNode是否是最后一个节点
	if(parentNode.lastChild == oldNode){
		//插入到子节点末尾
		parentNode.appendChild(newNode);
	}else{
		parentNode.insertBefore(newNode, oldNode.nextSibling);
	}
}




/*
	可以创建一个带文本的节点
	createElementWithText(tagName, text);
*/

function createElementWithText(tagName, text){
	var node = document.createElement(tagName);
	var oTxt = document.createTextNode(text);
	node.appendChild(oTxt);
	return node;
}

/*
	随机颜色
*/
function randomColor(){
	var color = "rgba(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + " ," + parseInt(Math.random() * 255) + " ,1)";
	return color;
}


/*
	兼容性通过class查找元素节点
*/
function ByClassName(parsentNode, classStr){
	var res = []; //存放符合条件元素节点
	//<1>先找出parsentNode所有的节点
	var nodes = parsentNode.getElementsByTagName("*");
	//<2>对找到节点进行筛选
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].className == classStr){
			res.push(nodes[i]);
		}
	}
	return res;
}

//获取当前有效样式
function getStyle(node, styleName){
	if(node.currentStyle){
		return node.currentStyle(styleName);
	}else if(getComputedStyle){
		return getComputedStyle(node)[styleName];
	}
}