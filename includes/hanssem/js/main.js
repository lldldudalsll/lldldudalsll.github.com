(function global(){

    function init(){
        var mainMenuLink = document.querySelectorAll(".lnb > li > a");
        // console.log(mainMenuLink);
    	for(var i=0; i<mainMenuLink.length; i++){
    		mainMenuLink[i].onmouseover = function(){
                showSubMenu(this);
    		};
    		mainMenuLink[i].onfocus = function(){
    			showSubMenu(this);
    		};
    	}
    }

    function showSubMenu(targetNode) {
        var hideList = document.querySelectorAll(".lnb > li > ul");
        for(var i=0; i<hideList.length; i++){
            hideList[i].style.display = "none";
        }
        // console.log(hideList);
        // getElementNextSibling(targetNode).style.display = "block";
    }

    // 지정한 요소의 다음 노드를 반환한다.
    
    // function getElementNextSibling(node){
    // 	var nextElement = node.nextSibling;
    // 	if(nextElement == null){
    // 		return null;
    // 	}else if(nextElement.nodeType != 1){
    // 		return getElementNextSibling(nextElement);
    // 	}
    // 	return nextElement;
    // }

    init()
})(window);