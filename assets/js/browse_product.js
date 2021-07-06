var searchQuery;
var resultController;

var basicResultController = (function () {
	 var obj = {};
	 var url;
	 var itemsPerPage =20;
	 var currentPage=1;
	 var filterParentId;	
    obj.loadResults =  function (filterGroupId,filterFamilyId) {
    	 var loadingNotification = notifyInfo("Loading results");
		  	var onResponse = function(response){
		  	dismiss(loadingNotification);
		  	var results = [];
		    for(var i=0; i< response.data.items.data.length; i++){
		    const item = response.data.items.data[i];
		    const element = {
		 		"productId" : item.id,
				"href": "product-details.html?item="+item["id"],
				"productCode" : item.code,
				"productName" : item.name,
				"productFamily" : item.item_family[0].code,
				"productActualPrice" : "$"+safeAccess(["price"],item,"-"),
				"productOfferPrice" : "$999.00",
				"productOffPercent" : "-20%",
				"productQuantityInStock" : "50",
				"productDescription" : item.desc,
				"parentImages" : safeAccess(["item_images",0,"image","thumbnail"],item,safeAccess(["item_parent_images",0,"image","thumbnail"],item,"assets/img/lma_catalog_img.png"))
			};
			  results.push(element);
		    }
		    if(currentPage==1){
		    	history.replaceState(null, null, ' ');
		      $('#pagination-container').pagination({
			        items: response.data.items.total,
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
		  getSearchResults(currentPage,itemsPerPage,searchQuery,filterParentId,filterGroupId,filterFamilyId,onResponse,onError);
    }

    obj.showResult =  function (catalogList) {    
	    var catalogHTML = ""
		for(i=0; i<catalogList.length; i++){
				console.log("catalogList : catalogList ", catalogList)
				catalogHTML += '<div class="col-lg-4 col-md-4 col-12 ">'
				catalogHTML += '<div class="single_product">'
				catalogHTML += '<div class="product_name grid_name">'
				catalogHTML += '<h3><strong><a href="' +catalogList[i]["href"] +'" style="text-transform: lowercase;">'+catalogList[i]["productName"]+'</a></strong></h3>'
				catalogHTML += '<p style="opacity:1;">'+catalogList[i]["productCode"]+'</p>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="product_thumb">'

				if(catalogList[i]["parentImages"]){
					catalogHTML += '<a class="primary_img" href="product-details.html?item='+catalogList[i]["productId"]+'"><img   onerror="this.onerror=null;this.src=`assets/img/lma_catalog_img.png`;" src="'+catalogList[i]["parentImages"]+'" alt=""></a>'
				}else{
					catalogHTML += '<a class="primary_img" href="product-details.html?item='+catalogList[i]["productId"]+'"><img  src="assets/img/lma_catalog_img.png" alt=""></a>'
				}
				catalogHTML += '<div class="action_links">'
				catalogHTML += '<ul>'
				catalogHTML += '</ul>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="product_content grid_content">'
				catalogHTML += '<div class="content_inner">'
				catalogHTML += '<div class="product_footer d-flex align-items-center">'
				catalogHTML += '<div class="price_box">'
				catalogHTML += '<span class="current_price">'+catalogList[i]["productActualPrice"]+'</span>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += ''
				catalogHTML += '<div class="product_content list_content">'
				catalogHTML += '<div class="left_caption" style="width:300px">'
				catalogHTML += '<div class="product_name">'
				catalogHTML += '<h3><a href="product-details.html">'+catalogList[i]["productName"]+'</a></h3>'
				catalogHTML += '<h3><a href="product-details.html">'+catalogList[i]["productCode"]+'</a></h3>'
				catalogHTML += '</div>'
				catalogHTML += ''
				catalogHTML += '<div class="product_desc">'
				if(catalogList[i]["productDescription"] == null){
					catalogHTML += '<p></p>'
				}else{
					catalogHTML += '<p>'+catalogList[i]["productDescription"]+'</p>'
				}
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="right_caption">'	
				catalogHTML += '<div class="price_box">'
				catalogHTML += '<span class="current_price">'+catalogList[i]["productActualPrice"]+'</span>'
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

function findGetParameter(parameterName) {
		var result = null,
		tmp = [];
		location.search
		.substr(1)
		.split("&")
		.forEach(function (item) {
			tmp = item.split("=");
			if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
		});
		return result;
}


$(document).ready(function(){
	searchQuery = findGetParameter("q")
	// showSearchResults();
	resultController = basicResultController;
	resultController.loadResults();
});

$("#showParent").click(function(){
	resultController = parentResultController;
	resultController.loadResults();
}); 

function getParentItems(parentId){
	
	resultController = catalogResultController;
	catalogResultController.currentPage = 1;

	resultController.loadResults(parentId);
}