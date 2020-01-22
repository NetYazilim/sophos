var gparentIndex="";
var parentIndex="";
var index="";
replaceFieldFromText = function(msg) {
	var sIndex = 0;
	while (true) {
		if (msg.indexOf("{", sIndex) >= 0) {
			sIndex = msg.indexOf("{") + 1;
			var eIndex = msg.indexOf("}", sIndex);
			var vrname = msg.substring(sIndex, eIndex);
			//alert(vrname);
			try {
				var replacedValue = "&lt;DynamicValue&gt;";
				if (replacedValue == "")
					return msg;
				msg = msg.replace("{" + vrname + "}", replacedValue);
			} catch (e) {
				sIndex = sIndex + 1;
				continue;
			}
			sIndex = sIndex + 1;
		} else {
			break;
		}
	}
	return msg;
};
/*var imported = document.createElement('script');
imported.src = '../output/json.js';
document.head.appendChild(imported);*/
function showChangeLog(ele){
	var anchorTag = document.getElementById("hiddenAnchor");
	anchorTag.href = "changeLog/" + ele.value + ".html";
	anchorTag.click();
}

function showChild(ele,childId,link) { 
	var childDiv = document.getElementById(childId);
	if(childDiv.style.display=='none'){
		childDiv.style.display='';
	}else{
		childDiv.style.display='none';
	}
	
	//parent.document.getElementById('operationframe').src=link;
}

function changeFolderImage(ele){
	if(ele.className == "openFolder"){
		ele.className = "closeFolder";
	}else if(ele.className == "closeFolder"){
		ele.className = "openFolder";
	}	
}
function submitJSON(){
	//alert("DirName = " + dirName);
	var jsonToSend;
	jsonToSend = "{";
	jsonToSend = jsonToSend + "fileName:"+JSON.stringify(fileName)+",";
	jsonToSend = jsonToSend + "opcode:"+JSON.stringify(opcodeNames)+",";
	jsonToSend = jsonToSend + "entityDesc:"+ JSON.stringify(document.getElementById("entityDesc").value);
	
	for(var j=0;j < keysArray.length; j++) {
		jsonToSend = jsonToSend + "," + keysArray[j].keyName + ":{";
		var descId = "txtDesc" + keysArray[j].keyName;
		var commentId = "txtCommentId" + keysArray[j].keyName;
		var defaultId = "default" + keysArray[j].keyName;
		//alert(document.getElementById(descId).value);
		//alert(document.getElementById(commentId));
//		if(document.getElementById(descId) != null) {			
		var description=document.getElementById(descId).value.replace(/\n/g, "<br/>");
		jsonToSend = jsonToSend + "desc:" + JSON.stringify(description) + ",";
		var comments=document.getElementById(commentId).value.replace(/\n/g, "<br/>");			
		jsonToSend = jsonToSend + "comment:" + JSON.stringify(comments);
		var defaultvalue = document.getElementById(defaultId).value.replace(/\n/g, "<br/>");
		//if(defaultvalue != ""){
			jsonToSend = jsonToSend + ",checks:{\"defaultToDisplay\":" + JSON.stringify(defaultvalue) + "}";
		//}
		
			
		jsonToSend = jsonToSend + "}";
	}
	
	jsonToSend = jsonToSend + "}";
	//var myObject = JSON.stringify(jsonToSend);
	/*var jsonToSend={};
	alert("FileName=  " + fileName);
	jsonToSend["fileName"]=fileName;
	//var myObject = JSON.parse(jsonToSend);
	var myObject = JSON.stringify(jsonToSend);
	alert(myObject);*/
	//alert(jsonToSend);
	var xmlhttp;
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
		xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	alert("Data Saved successfully...!");
	    	location.reload();
	    }
	};
	xmlhttp.open("POST","http://10.202.2.92:8080/APIHelpDoc/CyberoamXMLServlet?json="+encodeURIComponent(jsonToSend)+ "&dirName="+encodeURIComponent(dirName),true);
	xmlhttp.send();
	
	//var serverResponse = xmlhttp.responseText;	
	//alert(serverResponse);
}
function textChange(e){
	 if (e.keyCode == 13) {
		 searchText();
    }
}

function showChildBySearch(ele,childId,link) {
	var childDiv = document.getElementById(childId);
	if(childDiv.style.display=='none'){
		childDiv.style.display='';
		//alert("Opening = " + childDiv.id);
		if(childDiv.id.indexOf("child")>=0){
			var newvar="parent"+childDiv.id.replace("child","");
			//alert("newvar="+newvar);
			var children=document.getElementById(newvar).childNodes;
			for(var i1=0; i1 < children.length; i1++){
				if(children[i1] == "[object HTMLUListElement]"){
					var liObject =children[i1].id;
					var newid=document.getElementById(liObject).childNodes[0];
					//alert("newid="+newid.id);
					changeFolderImage(newid);
				}
			}
		}
		if(childDiv.id.indexOf("parent")>=0 && childDiv.id.indexOf("gparent")<0){
			//parent2
			var newvar="gparent"+childDiv.id.replace("parent","");
			//alert("newvar="+newvar);
			var children=document.getElementById(newvar).childNodes;
			for(i1=0; i1 < children.length; i1++){
				if(children[i1] == "[object HTMLUListElement]"){
					var liObject =children[i1].id;
					var newid=document.getElementById(liObject).childNodes[0];
					//alert("newid="+newid.id);
					changeFolderImage(newid);
				}
			}
		}
		//for Root
		if(childDiv.id.indexOf("gparent")>=0 && childDiv.id.indexOf("ggparent")<0){
			var newvar="Imgg"+childDiv.id;
			var newid=document.getElementById(newvar);
			changeImageIcon(newid);
		}
	}
}
function changeImageIcon(obj){
	var imgPath=obj.src.split("/");
	var length=imgPath.length-1;
	//alert("changeImageIcon="+imgPath[length]);
	if(imgPath[length]=="closeFolder.png"){
		obj.src="openFolder.png"
	}else if(imgPath[length]=="openFolder.png"){
		obj.src="closeFolder.png"
	}
}
function changeImageIconFromDiv(obj){
	var newvar = "Img"+obj.id;
	var newvar=document.getElementById(newvar);
	changeImageIcon(newvar);	
}
function openRootMenu(obj){
	var newvar = obj.id;
	newvar=newvar.replace("Imgg","");
	//alert("Inside openRootMenu="+newvar);
	showChild("",newvar,"");
}
function showOpPage(url) {	
	if(typeof parent.document.getElementById('operationframe') != "undefined"){
		parent.document.getElementById('operationframe').src=url;
	}	
}

function showOpPageFromA(ele,url) {
	ele.href = url;
}


function setGlobalValues(gparentIndex1,parentIndex1,index1) {
	gparentIndex=gparentIndex1;
	parentIndex=parentIndex1;
	index=index1;
}

var allMenuData="";
function pageLoad() {
	allMenuData=document.getElementById('allMenu').innerHTML;
}

function searchText() {
	//alert("hi");
	var searchValue = document.getElementById('searchBox').value;
	var searchFound=0;
	document.getElementById('allMenu').innerHTML=allMenuData;
	
	if(searchValue != ""){
		for (var i = 0; i < jSonData.length; i++) {
			if(jSonData[i].menuName.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) {
				searchFound=1;
				var arr=jSonData[i].elementId.split(':');
				var anchorId = document.getElementById(jSonData[i].anchorId);
				
				if(anchorId != null) {
					
					anchorId.style.background = "#ADADAD";
					//alert(anchorId.parentNode.parentNode.parentNode.parentNode.id);
				}
				
				var liId = document.getElementById(jSonData[i].liId);
				if(liId != null) {
					//liId.style.background = "#ccc";
				}
				for(var j=0;j < arr.length; j++) {
					//alert("arr[j]=" + arr[j]);
					showChildBySearch('',arr[j],'');
				}
			}	
		}
		if (searchFound == 0){
			alert("No search data Found...! !");
		}
	}
	
}