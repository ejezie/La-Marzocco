var searchQuery;

var resultController;

var basicResultController = (function () {
	 var obj = {};
	 var url;
	 var itemsPerPage =20;
	 var currentPage=1;
	 var filterParentId;
	 var filterGroupId;
	

    obj.loadResults =  function () {
    	 var loadingNotification = notifyInfo("Loading results");
		  	var onResponse = function(response){
		  	dismiss(loadingNotification);
		  	var results = [];
		  	console.log("Data "+JSON.stringify(response.data,null,2))
		    for(var i=0; i< response.data.items.data.length; i++){
		      const item = response.data.items.data[i];
		      const element = {
								"productId" : item.id,
								"href": "product-details.html?item="+item["id"],
								"productCode" : item.code,
								"productName" : item.name,
								"productFamily" : item.item_family[0].code,
								"productActualPrice" : "$1199.00",
								"productOfferPrice" : "$999.00",
								"productOffPercent" : "-20%",
								"productQuantityInStock" : "50"
							};
			  results.push(element);
		    }
		    if(currentPage==1){
		      $('#pagination-container').pagination({
			        items: response.data.items.total,
			        itemsOnPage: itemsPerPage,
			        cssStyle: 'dark-theme',
			        onPageClick: function(pageNo){
			        	currentPage = pageNo;
			        	obj.loadResults(results);
			        }
			    });
			}

		    obj.showResult(results);

		  };

		  var onError =function(error){
		  	dismiss(loadingNotification);
		  	console.log(error);
		    notifyError("Failed to load results");
		  };
		  getSearchResults(currentPage,itemsPerPage,searchQuery,filterParentId,filterGroupId,onResponse,onError);
    }

    obj.showResult =  function (catalogList) {
    
	    var catalogHTML = ""

		for(i=0; i<catalogList.length; i++){

				catalogHTML += '<div class="col-lg-4 col-md-4 col-12 ">'
				catalogHTML += '<div class="single_product">'
				catalogHTML += '<div class="product_name grid_name">'
				catalogHTML += '<h3><strong><a href="' +catalogList[i]["href"] +'" style="text-transform: lowercase;">'+catalogList[i]["productName"]+'</a></strong></h3>'
				catalogHTML += '<p class="manufacture_product"><a>'+catalogList[i]["productCode"]+'</a></p>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="product_thumb">'
				if(catalogList[i]["image"]){
					catalogHTML += '<a class="primary_img" href="product-details.html?item='+catalogList[i]["productId"]+'"><img src="'+catalogList[i]["image"]+'" alt=""></a>'
				}else{
					catalogHTML += '<a class="primary_img" href="product-details.html?item='+catalogList[i]["productId"]+'"><img src="assets/img/product/product1.jpg" alt=""></a>'
				}
				catalogHTML += '<a class="secondary_img" href="product-details.html?item='+catalogList[i]["productId"]+'"><img src="assets/img/product/product11.jpg" alt=""></a>'
				catalogHTML += '<div class="label_product">'
				catalogHTML += '<span class="label_sale">'+catalogList[i]["productOffPercent"]+'</span>'
				catalogHTML += '</div>'
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
				catalogHTML += '<span class="current_price">'+catalogList[i]["productOfferPrice"]+'</span>'
				// catalogHTML += '<span class="old_price">'+catalogList[i]["productActualPrice"]+'</span>'
				catalogHTML += '</div>'
				// catalogHTML += '<div class="add_to_cart">'
				// catalogHTML += '<a onclick="addToCart()" title="add to cart"><span class="lnr lnr-cart"></span></a>'
				// catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += ''
				catalogHTML += '<div class="product_content list_content">'
				catalogHTML += '<div class="left_caption">'
				catalogHTML += '<div class="product_name">'
				catalogHTML += '<h3><a href="product-details.html">'+catalogList[i]["productName"]+'</a></h3>'
				catalogHTML += '</div>'
				catalogHTML += ''
				catalogHTML += '<div class="product_desc">'
				catalogHTML += '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad, iure incidunt. Ab consequatur temporibus non eveniet inventore doloremque necessitatibus sed, ducimus quisquam, ad asperiores </p>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="right_caption">'	
				catalogHTML += '<div class="price_box">'
				catalogHTML += '<span class="current_price">'+catalogList[i]["productOfferPrice"]+'</span>'
				// catalogHTML += '<span class="old_price">'+catalogList[i]["productActualPrice"]+'</span>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="cart_links_btn">'
				// catalogHTML += '<a href="#" title="add to cart">add to cart</a>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="action_links_btn">'
				catalogHTML += '<ul>'
				// catalogHTML += '<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box" title="quick view"> <span class="lnr lnr-magnifier"></span></a></li>'
				// catalogHTML += '<li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><span class="lnr lnr-heart"></span></a></li>'
				// catalogHTML += '<li class="compare"><a href="compare.html" title="compare"><span class="lnr lnr-sync"></span></a></li>'
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
		    }
		    var loadingNotification = notifyInfo("Loading results");
		  	var onResponse = function(response){
		  	dismiss(loadingNotification);
		  	var results = [];
		    for(var i=0; i< response.data.machine_parent.data.length; i++){
		      const item = response.data.machine_parent.data[i];
		      const element = {
								"productId" :safeAccess(["parents","id"],item),
								"image": safeAccess(["image","thumbnail"],item),
								"href": "carouselParts.html?mainitem="+machineId+"&parent="+safeAccess(["parents","id"],item),
								"productCode" : safeAccess(["parents","id"],item),
								"productName" : safeAccess(["parents","name"],item),
								"productFamily" : safeAccess(["parents","name"],item),
							};
			  results.push(element);
		    }

		     if(currentPage==1){
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
		  };

		  var onError =function(error){
		  	dismiss(loadingNotification);
		  	console.log(error);
		    notifyError("Failed to load results");
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
				catalogHTML += '<p class="manufacture_product"><a>Accessories</a></p>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="product_thumb">'

				catalogHTML += '<img src="'+catalogList[i]["image"]+'" onerror="this.onerror=null;this.src=`assets/img/product/product1.jpg`;"/>';
				// if(catalogList[i]["image"]){
				// 	catalogHTML += '<a class="primary_img" href="product-details.html?item='+catalogList[i]["productId"]+'"><img src="'+catalogList[i]["image"]+'" alt=""></a>'
				// }else{
				// 	catalogHTML += '<a class="primary_img" href="product-details.html?item='+catalogList[i]["productId"]+'"><img src="assets/img/product/product1.jpg" alt=""></a>'
				// }
				catalogHTML += '<a class="secondary_img" ><img src="assets/img/product/product11.jpg" alt=""></a>'
				catalogHTML += '<div class="label_product">'
				catalogHTML += '<span class="label_sale">'+catalogList[i]["productOffPercent"]+'</span>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="action_links">'
				catalogHTML += '<ul>'
				// catalogHTML += '<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box" title="quick view"> <span class="lnr lnr-magnifier"></span></a></li>'
				catalogHTML += '</ul>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				// catalogHTML += '<div class="product_content grid_content">'
				// catalogHTML += '<div class="content_inner">'
				// catalogHTML += '<div class="product_footer d-flex align-items-center">'
				// catalogHTML += '<div class="price_box">'
				// catalogHTML += '<span class="current_price">'+catalogList[i]["productOfferPrice"]+'</span>'
				// catalogHTML += '<span class="old_price">'+catalogList[i]["productActualPrice"]+'</span>'
				// catalogHTML += '</div>'
				// catalogHTML += '<div class="add_to_cart">'
				// catalogHTML += '<a onclick="addToCart()" title="add to cart"><span class="lnr lnr-cart"></span></a>'
				// catalogHTML += '</div>'
				// catalogHTML += '</div>'
				// catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += ''
				catalogHTML += '<div class="product_content list_content">'
				catalogHTML += '<div class="left_caption">'
				catalogHTML += '<div class="product_name">'
				catalogHTML += '<h3><a>'+catalogList[i]["productName"]+'</a></h3>'
				catalogHTML += '</div>'
				catalogHTML += ''
				catalogHTML += '<div class="product_desc">'
				catalogHTML += '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad, iure incidunt. Ab consequatur temporibus non eveniet inventore doloremque necessitatibus sed, ducimus quisquam, ad asperiores </p>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="right_caption">'	
				// catalogHTML += '<div class="price_box">'
				// catalogHTML += '<span class="current_price">'+catalogList[i]["productOfferPrice"]+'</span>'
				// catalogHTML += '<span class="old_price">'+catalogList[i]["productActualPrice"]+'</span>'
				// catalogHTML += '</div>'
				// catalogHTML += '<div class="cart_links_btn">'
				// catalogHTML += '<a title="add to cart">add to cart</a>'
				// catalogHTML += '</div>'
				// catalogHTML += '<div class="action_links_btn">'
				// catalogHTML += '<ul>'
				// catalogHTML += '<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box" title="quick view"> <span class="lnr lnr-magnifier"></span></a></li>'
				// catalogHTML += '<li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><span class="lnr lnr-heart"></span></a></li>'
				// catalogHTML += '<li class="compare"><a href="compare.html" title="compare"><span class="lnr lnr-sync"></span></a></li>'
				// catalogHTML += '</ul>'
				// catalogHTML += '</div>'
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


var machineResultController = (function () {
	 var obj = {};
	 var itemsPerPage =20;
	 var currentPage=1;
	 var mainItemId;

    obj.loadResults =  function (id) {
    	if(id){
    		mainItemId = id;
    	}
    	 var loadingNotification = notifyInfo("Loading results");
		  	var onResponse = function(response){
		  	dismiss(loadingNotification);
		  	var results = [];
		    for(var i=0; i< response.data.item_parent_images.data.length; i++){
		      const item = response.data.item_parent_images.data[i].item;
		      const element = {
								"productId" : item.id,
								"href": "product-details.html?item="+item["id"],
								"productCode" : item.code,
								"productName" : item.name,
								"productFamily" : safeAccess(["parent","name"],item),
								"productActualPrice" : "$1199.00",
								"productOfferPrice" : "$999.00",
								"productOffPercent" : "-20%",
								"productQuantityInStock" : "50"
							};
			  results.push(element);
		    }


		     if(currentPage==1){
		      $('#pagination-container').pagination({
			        items: response.data.item_parent_images.total,
			        itemsOnPage: itemsPerPage,
			        cssStyle: 'dark-theme',
			        onPageClick: function(pageNo){
			        	currentPage = pageNo;
			        	obj.loadResults();
			        }
			    });
			}

		    obj.showResult(results); 
		  };
		  getItemParentImagesForMachineDropdown(currentPage,itemsPerPage, mainItemId,onResponse);

    	 }

    obj.showResult =  function (catalogList) {
    
	    var catalogHTML = ""

		for(i=0; i<catalogList.length; i++){

				catalogHTML += '<div class="col-lg-4 col-md-4 col-12 ">'
				catalogHTML += '<div class="single_product">'
				catalogHTML += '<div class="product_name grid_name">'
				catalogHTML += '<h3><strong><a href="' +catalogList[i]["href"] +'" style="text-transform: lowercase;">'+catalogList[i]["productName"]+'</a></strong></h3>'
				catalogHTML += '<p class="manufacture_product"><a href="#">Accessories</a></p>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="product_thumb">'
				catalogHTML += '<img src="'+catalogList[i]["image"]+'" onerror="this.onerror=null;this.src=`assets/img/product/product1.jpg`;"/>';

				catalogHTML += '<a class="secondary_img" href="product-details.html?item='+catalogList[i]["productId"]+'"><img src="assets/img/product/product11.jpg" alt=""></a>'
				catalogHTML += '<div class="label_product">'
				catalogHTML += '<span class="label_sale">'+catalogList[i]["productOffPercent"]+'</span>'
				catalogHTML += '</div>'
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
				catalogHTML += '<span class="current_price">'+catalogList[i]["productOfferPrice"]+'</span>'
				catalogHTML += '<span class="old_price">'+catalogList[i]["productActualPrice"]+'</span>'
				catalogHTML += '</div>'
				// catalogHTML += '<div class="add_to_cart">'
				// catalogHTML += '<a onclick="addToCart()" title="add to cart"><span class="lnr lnr-cart"></span></a>'
				// catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += ''
				catalogHTML += '<div class="product_content list_content">'
				catalogHTML += '<div class="left_caption">'
				catalogHTML += '<div class="product_name">'
				catalogHTML += '<h3><a href="product-details.html">'+catalogList[i]["productName"]+'</a></h3>'
				catalogHTML += '</div>'
				catalogHTML += ''
				catalogHTML += '<div class="product_desc">'
				catalogHTML += '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad, iure incidunt. Ab consequatur temporibus non eveniet inventore doloremque necessitatibus sed, ducimus quisquam, ad asperiores </p>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="right_caption">'	
				catalogHTML += '<div class="price_box">'
				catalogHTML += '<span class="current_price">'+catalogList[i]["productOfferPrice"]+'</span>'
				catalogHTML += '<span class="old_price">'+catalogList[i]["productActualPrice"]+'</span>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="cart_links_btn">'
				catalogHTML += '<a href="#" title="add to cart">add to cart</a>'
				catalogHTML += '</div>'
				catalogHTML += '<div class="action_links_btn">'
				catalogHTML += '<ul>'
				catalogHTML += '<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box" title="quick view"> <span class="lnr lnr-magnifier"></span></a></li>'
				catalogHTML += '<li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><span class="lnr lnr-heart"></span></a></li>'
				catalogHTML += '<li class="compare"><a href="compare.html" title="compare"><span class="lnr lnr-sync"></span></a></li>'
				catalogHTML += '</ul>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
				catalogHTML += '</div>'
			}
			$("#resultsGrid").html("")
			$("#resultsGrid").html(catalogHTML);

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
	 // $("#pagination_current").text(response.data.machine_parent.current_page);
  //   if(response.data.machine_parent.prev_page_url!=null){
  //   	$("#pagination_prev").show();
  //   	$("#pagination_prev").text(response.data.machine_parent.current_page-1);
  //   	    	$('#pagination_prev').unbind();

  //   	$('#pagination_prev').click(function () {
		// 		showSearchResults(response.data.machine_parent.prev_page_url)
		// 	});
  //   }else{
  //   	$("#pagination_prev").hide();
  //   }
  //   if(response.data.machine_parent.next_page_url!=null){
  //   	$("#pagination_next").show();
  //   	$("#pagination_next").text(response.data.machine_parent.current_page+1);
  //   	$('#pagination_next').unbind();
  //   	$('#pagination_next').click(function () {
		// 		showSearchResults(response.data.machine_parent.next_page_url)
		// 	});
  //   }else{
  //   	$("#pagination_next").hide();
  //   }
  //   if(response.data.machine_parent.last_page_url!=null){
  //   	$("#pagination_last").show();
  //   	$("#pagination_last").text(response.data.machine_parent.last_page+" >>");
  //   	$('#pagination_last').unbind();
  //   	$('#pagination_last').click(function () {
		// 		showSearchResults(response.data.machine_parent.last_page_url);
		// 	});
  //   }else{
  //   	$("#pagination_last").hide();
  //   }
});









































/////////////////////


// async function showCatalog(catalogList){
// 	// alert(JSON.stringify(catalogList,null,2))

// 	var catalogHTML = ""

// 	for(i=0; i<catalogList.length; i++){

// 		// catalogHTML += '<table>'
// 		catalogHTML += '<div class="col-lg-4 col-md-4 col-12 ">'
// 		catalogHTML += '<div class="single_product">'
// 		catalogHTML += '<div class="product_name grid_name">'
// 		catalogHTML += '<h3><strong><a href="' +catalogList[i]["href"] +'" style="text-transform: lowercase;">'+catalogList[i]["productName"]+'</a></strong></h3>'
// 		catalogHTML += '<p class="manufacture_product"><a href="#">Accessories</a></p>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '<div class="product_thumb">'
// 		if(catalogList[i]["image"]){
// 			catalogHTML += '<a class="primary_img" href="product-details.html?item='+catalogList[i]["productId"]+'"><img src="'+catalogList[i]["image"]+'" alt=""></a>'
// 		}else{
// 			catalogHTML += '<a class="primary_img" href="product-details.html?item='+catalogList[i]["productId"]+'"><img src="assets/img/product/product1.jpg" alt=""></a>'
// 		}
// 		catalogHTML += '<a class="secondary_img" href="product-details.html?item='+catalogList[i]["productId"]+'"><img src="assets/img/product/product11.jpg" alt=""></a>'
// 		catalogHTML += '<div class="label_product">'
// 		catalogHTML += '<span class="label_sale">'+catalogList[i]["productOffPercent"]+'</span>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '<div class="action_links">'
// 		catalogHTML += '<ul>'
// 		catalogHTML += '<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box" title="quick view"> <span class="lnr lnr-magnifier"></span></a></li>'
// 		// catalogHTML += '<li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><span class="lnr lnr-heart"></span></a></li>'
// 		// catalogHTML += '<li class="compare"><a href="compare.html" title="compare"><span class="lnr lnr-sync"></span></a></li>'
// 		catalogHTML += '</ul>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '<div class="product_content grid_content">'
// 		catalogHTML += '<div class="content_inner">'
// 		// catalogHTML += '<div class="product_ratings">'
// 		// catalogHTML += '<ul>'
// 		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
// 		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
// 		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
// 		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
// 		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
// 		// catalogHTML += '</ul>'
// 		// catalogHTML += '</div>'
// 		catalogHTML += '<div class="product_footer d-flex align-items-center">'
// 		catalogHTML += '<div class="price_box">'
// 		catalogHTML += '<span class="current_price">'+catalogList[i]["productOfferPrice"]+'</span>'
// 		catalogHTML += '<span class="old_price">'+catalogList[i]["productActualPrice"]+'</span>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '<div class="add_to_cart">'
// 		catalogHTML += '<a onclick="addToCart()" title="add to cart"><span class="lnr lnr-cart"></span></a>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '</div>'
// 		catalogHTML += ''
// 		catalogHTML += '<div class="product_content list_content">'
// 		catalogHTML += '<div class="left_caption">'
// 		catalogHTML += '<div class="product_name">'
// 		catalogHTML += '<h3><a href="product-details.html">'+catalogList[i]["productName"]+'</a></h3>'
// 		catalogHTML += '</div>'
// 		// catalogHTML += '<div class="product_ratings">'
// 		// catalogHTML += '<ul>'
// 		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
// 		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
// 		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
// 		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
// 		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
// 		// catalogHTML += '</ul>'
// 		// catalogHTML += '</div>'
// 		catalogHTML += ''
// 		catalogHTML += '<div class="product_desc">'
// 		catalogHTML += '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad, iure incidunt. Ab consequatur temporibus non eveniet inventore doloremque necessitatibus sed, ducimus quisquam, ad asperiores </p>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '<div class="right_caption">'
// 		// catalogHTML += '<div class="text_available">'
// 		// catalogHTML += '<p>availabe: <span>'+catalogList[i]["productQuantityInStock"]+' in stock</span></p>'
// 		// catalogHTML += '</div>'
// 		catalogHTML += '<div class="price_box">'
// 		catalogHTML += '<span class="current_price">'+catalogList[i]["productOfferPrice"]+'</span>'
// 		catalogHTML += '<span class="old_price">'+catalogList[i]["productActualPrice"]+'</span>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '<div class="cart_links_btn">'
// 		catalogHTML += '<a href="#" title="add to cart">add to cart</a>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '<div class="action_links_btn">'
// 		catalogHTML += '<ul>'
// 		catalogHTML += '<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box" title="quick view"> <span class="lnr lnr-magnifier"></span></a></li>'
// 		catalogHTML += '<li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><span class="lnr lnr-heart"></span></a></li>'
// 		catalogHTML += '<li class="compare"><a href="compare.html" title="compare"><span class="lnr lnr-sync"></span></a></li>'
// 		catalogHTML += '</ul>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '</div>'
// 		catalogHTML += '</div>'
// 		// catalogHTML += '</table>'

// 	}

// 	$("#resultsGrid").html("")
// 	$("#resultsGrid").html(catalogHTML)
// }