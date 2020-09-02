var catalogList = [{
						"productCode" : "HSO567",
						"productName" : "Vulcano1",
						"productFamily" : "Espresso Machines",
						"productActualPrice" : "$1199.00",
						"productOfferPrice" : "$999.00",
						"productOffPercent" : "-20%",
						"productQuantityInStock" : "50"
					},
					{
						"productCode" : "HSO567",
						"productName" : "Vulcano2",
						"productFamily" : "Espresso Machines",
						"productActualPrice" : "$1199.00",
						"productOfferPrice" : "$999.00",
						"productOffPercent" : "-20%",
						"productQuantityInStock" : "50"
					},
					{
						"productCode" : "HSO567",
						"productName" : "Vulcano3",
						"productFamily" : "Espresso Machines",
						"productActualPrice" : "$1199.00",
						"productOfferPrice" : "$999.00",
						"productOffPercent" : "-20%",
						"productQuantityInStock" : "50"
					},
					{
						"productCode" : "HSO567",
						"productName" : "Vulcano4",
						"productFamily" : "Espresso Machines",
						"productActualPrice" : "$1199.00",
						"productOfferPrice" : "$999.00",
						"productOffPercent" : "-20%",
						"productQuantityInStock" : "50"
					},
					{
						"productCode" : "HSO567",
						"productName" : "Vulcano5",
						"productFamily" : "Espresso Machines",
						"productActualPrice" : "$1199.00",
						"productOfferPrice" : "$999.00",
						"productOffPercent" : "-20%",
						"productQuantityInStock" : "50"
					},
					{
						"productCode" : "HSO567",
						"productName" : "Vulcano6",
						"productFamily" : "Espresso Machines",
						"productActualPrice" : "$1199.00",
						"productOfferPrice" : "$999.00",
						"productOffPercent" : "-20%",
						"productQuantityInStock" : "50"
					},
					{
						"productCode" : "HSO567",
						"productName" : "Vulcano7",
						"productFamily" : "Espresso Machines",
						"productActualPrice" : "$1199.00",
						"productOfferPrice" : "$999.00",
						"productOffPercent" : "-20%",
						"productQuantityInStock" : "50"
					},
					{
						"productCode" : "HSO567",
						"productName" : "Vulcano8",
						"productFamily" : "Espresso Machines",
						"productActualPrice" : "$1199.00",
						"productOfferPrice" : "$999.00",
						"productOffPercent" : "-20%",
						"productQuantityInStock" : "50"
					},
					{
						"productCode" : "HSO567",
						"productName" : "Vulcano9",
						"productFamily" : "Espresso Machines",
						"productActualPrice" : "$1199.00",
						"productOfferPrice" : "$999.00",
						"productOffPercent" : "-20%",
						"productQuantityInStock" : "50"
					},
					{
						"productCode" : "HSO567",
						"productName" : "Vulcano10",
						"productFamily" : "Espresso Machines",
						"productActualPrice" : "$1199.00",
						"productOfferPrice" : "$999.00",
						"productOffPercent" : "-20%",
						"productQuantityInStock" : "50"
					}
				]


async function showCatalog(catalogList){
	var catalogHTML = ""

	for(i=0; i<catalogList.length; i++){

		catalogHTML += '<table>'
		catalogHTML += '<div class="col-lg-4 col-md-4 col-12 ">'
		catalogHTML += '<div class="single_product">'
		catalogHTML += '<div class="product_name grid_name">'
		catalogHTML += '<h3><a href="product-details.html">'+catalogList[i]["productName"]+'</a></h3>'
		catalogHTML += '<p class="manufacture_product"><a href="#">Accessories</a></p>'
		catalogHTML += '</div>'
		catalogHTML += '<div class="product_thumb">'
		catalogHTML += '<a class="primary_img" href="product-details.html"><img src="assets/img/product/product10.jpg" alt=""></a>'
		catalogHTML += '<a class="secondary_img" href="product-details.html"><img src="assets/img/product/product11.jpg" alt=""></a>'
		catalogHTML += '<div class="label_product">'
		catalogHTML += '<span class="label_sale">'+catalogList[i]["productOffPercent"]+'</span>'
		catalogHTML += '</div>'
		catalogHTML += '<div class="action_links">'
		catalogHTML += '<ul>'
		catalogHTML += '<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box" title="quick view"> <span class="lnr lnr-magnifier"></span></a></li>'
		catalogHTML += '<li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><span class="lnr lnr-heart"></span></a></li>'
		catalogHTML += '<li class="compare"><a href="compare.html" title="compare"><span class="lnr lnr-sync"></span></a></li>'
		catalogHTML += '</ul>'
		catalogHTML += '</div>'
		catalogHTML += '</div>'
		catalogHTML += '<div class="product_content grid_content">'
		catalogHTML += '<div class="content_inner">'
		// catalogHTML += '<div class="product_ratings">'
		// catalogHTML += '<ul>'
		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// catalogHTML += '</ul>'
		// catalogHTML += '</div>'
		catalogHTML += '<div class="product_footer d-flex align-items-center">'
		catalogHTML += '<div class="price_box">'
		catalogHTML += '<span class="current_price">'+catalogList[i]["productOfferPrice"]+'</span>'
		catalogHTML += '<span class="old_price">'+catalogList[i]["productActualPrice"]+'</span>'
		catalogHTML += '</div>'
		catalogHTML += '<div class="add_to_cart">'
		catalogHTML += '<a href="cart.html" title="add to cart"><span class="lnr lnr-cart"></span></a>'
		catalogHTML += '</div>'
		catalogHTML += '</div>'
		catalogHTML += '</div>'
		catalogHTML += '</div>'
		catalogHTML += ''
		catalogHTML += '<div class="product_content list_content">'
		catalogHTML += '<div class="left_caption">'
		catalogHTML += '<div class="product_name">'
		catalogHTML += '<h3><a href="product-details.html">'+catalogList[i]["productName"]+'</a></h3>'
		catalogHTML += '</div>'
		// catalogHTML += '<div class="product_ratings">'
		// catalogHTML += '<ul>'
		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// catalogHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// catalogHTML += '</ul>'
		// catalogHTML += '</div>'
		catalogHTML += ''
		catalogHTML += '<div class="product_desc">'
		catalogHTML += '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad, iure incidunt. Ab consequatur temporibus non eveniet inventore doloremque necessitatibus sed, ducimus quisquam, ad asperiores </p>'
		catalogHTML += '</div>'
		catalogHTML += '</div>'
		catalogHTML += '<div class="right_caption">'
		// catalogHTML += '<div class="text_available">'
		// catalogHTML += '<p>availabe: <span>'+catalogList[i]["productQuantityInStock"]+' in stock</span></p>'
		// catalogHTML += '</div>'
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
		catalogHTML += '</table>'

	}


	$("#catalog").append(catalogHTML)
}
getSearchResults


function showSearchResults(){

  var onResponse = function(response){
  	var results = [];
    for(var i=0; i< response.data.items.length; i++){
      const item = response.data.items[i];
      const element = {
						"productCode" : item.code,
						"productName" : item.name,
						"productFamily" : item.family.code,
						"productActualPrice" : "$1199.00",
						"productOfferPrice" : "$999.00",
						"productOffPercent" : "-20%",
						"productQuantityInStock" : "50"
					};
	  results.add(element);
    }

    showCatalog(results);
    // initPagination(response.data.items);
  };

  var onError =function(error){
    notifyError("Failed to load results");
  };
  getSearchResults(onResponse,onError,null);
}

function initPagination(data){
	// var paginationHtml = "<ul>";
	// 	paginationHtml += (data.prev_page_url==null)?"":" <li><a href="#">2</a></li>";
 //                                <li class=\"current\">"+data.current_page+"</li>\
 //                                <li><a href="#">2</a></li>\
 //                                <li><a href="#">3</a></li>\
 //                                <li class="next"><a href="#">next</a></li>\
 //                                <li><a href="#">>></a></li>\
 //                            </ul>";
	// $("#catalog").append(catalogHTML)
}

$(document).ready(function(){
	showSearchResults();
// showCatalog(catalogList)
});
