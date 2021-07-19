var searchQuery;

var resultController;

var parentResultController = (function () {
	 var obj = {};
	 var url;
	 var itemsPerPage =20;
	 var currentPage=1;
	 var filterParentId;	
    obj.loadResults =  function () {
    	 var loadingNotification = notifyInfo("Loading results");
		  	var onResponse = function(response){
		  	dismiss(loadingNotification);
		  	console.log("Data: "+JSON.stringify(response.data,null,2))
		  	console.log("parent data  : ", response.data.mapping)
		    if(currentPage==1){
		    	history.replaceState(null, null, ' ');

		      $('#pagination-container').pagination({
			        items: response.data.mapping.total,
			        itemsOnPage: itemsPerPage,
			        cssStyle: 'dark-theme',
			        onPageClick: function(pageNo){
			        	currentPage = pageNo;
			        	// obj.loadResults(results);
			        	obj.loadResults();
			        }
			    });
			}
			results= response.data.mapping
		    obj.showResult(results);
		    window.scroll({top: 0,left: 0});
		  };

		 var onError =function(error){
		  	dismiss(loadingNotification);
		  	console.log(error);
		  };
		  getMappingParent(onResponse,onError);
    }

    obj.showResult =  function (catalogList) {
    
	    var catalogHTML = ""

	    console.log("catalogList : >>>>>>>>>>>>>>>> ", catalogList)

		for(i=0; i<catalogList.length; i++){

				console.log("catalogList : catalogList ", catalogList)

				catalogHTML += '<div class="col-lg-4 col-md-4 col-12 ">'
				catalogHTML += '<div class="single_product">'
				catalogHTML += '<div class="product_name grid_name">'
				catalogHTML += '<h3><strong><a style="text-transform: lowercase;">'+catalogList[i]["code"]+'</a></strong></h3>'
				// catalogHTML += '<p style="opacity:1;">'+catalogList[i]["id"]+'</p>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="product_thumb">'
				
				if(catalogList[i]["images"][0]["thumbnail"]){
					catalogHTML += '<a class="primary_img" onclick="getParentItems('+catalogList[i]["id"]+')" ><img   onerror="this.onerror=null;this.src=`assets/img/lma_catalog_img.png`;" src="'+catalogList[i]["images"][0]["thumbnail"]+'" alt=""></a>'
				}else{
					catalogHTML += '<a class="primary_img" onclick="getParentItems('+catalogList[i]["id"]+')" ><img  src="assets/img/lma_catalog_img.png" alt=""></a>'
				}

				// catalogHTML += '<a class="primary_img" onclick="getParentItems('+catalogList[i]["id"]+')" ><img  src="'+catalogList[i]["images"][0]["thumbnail"]+'" alt=""></a>'
				catalogHTML += '<div class="action_links">'
				catalogHTML += '<ul>'
				catalogHTML += '</ul>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="product_content grid_content">'
				catalogHTML += '<div class="content_inner">'
				catalogHTML += '<div class="product_footer d-flex align-items-center">'
				catalogHTML += '<div class="price_box">'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += ''
				catalogHTML += '<div class="product_content list_content">'
				catalogHTML += '<div class="left_caption" style="width:300px">'
				catalogHTML += '<div class="product_name">'
				catalogHTML += '<h3><strong><a style="text-transform: lowercase;">'+catalogList[i]["code"]+'</a></strong></h3>'
				catalogHTML += '</div>'
				catalogHTML += ''
				catalogHTML += '<div class="product_desc">'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="right_caption">'	
				catalogHTML += '<div class="price_box">'
				catalogHTML += '</div>'
				catalogHTML += '<div class="cart_links_btn">'
				catalogHTML += '</div>'
				catalogHTML += '<div class="action_links_btn">'
				catalogHTML += '<ul>'
				catalogHTML += '</ul>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
			}
			$("#resultsGrid").html("")
			$("#resultsGrid").html(catalogHTML)

 }
return obj;
})();


var catalogResultController = (function () {
	var obj = {};
	var itemsPerPage =20;
	var currentPage=1;
	var machineId;

		    obj.loadResults =  function (id) {
		    if(id){
		    	machineId = id;
		    	currentPage = 1;

		    }
		    var loadingNotification = notifyInfo("Loading results");
		  	var onResponse = function(response){
		  	dismiss(loadingNotification);
		  	console.log("ITEM LIST",response.data.machine_parent.data)
		  	var results = [];
		    for(var i=0; i< response.data.machine_parent.data.length; i++){
		      const item = response.data.machine_parent.data[i];
		      console.log("item >>>>> ",item)
		      const element = {
								"productId" :safeAccess(["parents","id"],item),
								"image": safeAccess(["image","thumbnail"],item),
								"href": "carouselParts.html?mainitem="+item.item_id+"&parent="+safeAccess(["parents","id"],item),
								"productCode" : safeAccess(["parents","id"],item),
								"productName" : safeAccess(["parents","name"],item),
								"productFamily" : safeAccess(["parents","name"],item),
							};
			  results.push(element);
		    }

		     if(currentPage==1){
		       history.replaceState(null, null, ' ');

		      $('#pagination-container').pagination({
			        items: response.data.machine_parent.total,
			        itemsOnPage: itemsPerPage,
			        cssStyle: 'dark-theme',
			        onPageClick: function(pageNo){
			        	currentPage = pageNo;
			        	obj.loadResults();
			        }
			    });
			}
		    obj.showResult(results);
		    window.scroll({top: 0,left: 0});
		  };

		  var onError =function(error){
		  	dismiss(loadingNotification);
		  	console.log(error);
		  };
		  getMachineParentList(currentPage,itemsPerPage, onResponse,onError,machineId);
    }

    obj.showResult =  function (catalogList) {
    
	    var catalogHTML = ""

		for(i=0; i<catalogList.length; i++){

				catalogHTML += '<div class="col-lg-4 col-md-4 col-12 ">'
				catalogHTML += '<div class="single_product">'
				catalogHTML += '<div class="product_name grid_name">'
				catalogHTML += '<h3><strong><a href="' +catalogList[i]["href"] +'" style="text-transform: lowercase;">'+catalogList[i]["productName"]+'</a></strong></h3>'
				catalogHTML += '<p style="opacity:1;">Catalogue Parts</p>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="product_thumb">'
				catalogHTML += '<img onerror="this.onerror=null;this.src=`assets/img/lma_catalog_img.png`;" src="'+catalogList[i]["image"]+'" onerror="this.onerror=null;this.src=`assets/img/lma_catalog_img.png`;"/>';
				
				catalogHTML += '<div class="action_links">'
				catalogHTML += '<ul>'
				// catalogHTML += '<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box" title="quick view"> <span class="lnr lnr-magnifier"></span></a></li>'
				catalogHTML += '</ul>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="product_content grid_content">'
				catalogHTML += '<div class="content_inner">'
				catalogHTML += '<div class="product_footer d-flex align-items-center">'
				catalogHTML += '<div class="price_box">'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += ''
				catalogHTML += '<div class="product_content list_content">'
				catalogHTML += '<div class="left_caption" style="width:300px">'
				catalogHTML += '<div class="product_name">'
				catalogHTML += '<h3><a>'+catalogList[i]["productName"]+'</a></h3>'
				catalogHTML += '<h3><a>'+catalogList[i]["productCode"]+'</a></h3>'
				catalogHTML += '</div>'
				catalogHTML += ''
				catalogHTML += '<div class="product_desc">'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="right_caption">'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
			}
			$("#resultsGrid").html("")
			$("#resultsGrid").html(catalogHTML)
   
 }
return obj;
})();





// function findGetParameter(parameterName) {
// 		var result = null,
// 		tmp = [];
// 		location.search
// 		.substr(1)
// 		.split("&")
// 		.forEach(function (item) {
// 			tmp = item.split("=");
// 			if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
// 		});
// 		return result;
// 	}


$(document).ready(function(){
	// searchQuery = findGetParameter("q")
	// resultController = basicResultController;
	// resultController.loadResults();
	resultController = parentResultController;
	resultController.loadResults();
});

function getParentItems(parentId){
	
	resultController = catalogResultController;
	catalogResultController.currentPage = 1;

	resultController.loadResults(parentId);
}

