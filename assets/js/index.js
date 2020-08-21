
var recommendedItemList = [{
								"productCode" : "HSO567",
								"productName" : "Linea Mini1",
								"productPrice" : "$999.00",
								"productGroup" : "Commercial Machines",
								"productFamily" : "Linea",
								"productParent" : "Machines - LINEA"

							},
							{
								"productCode" : "HSO567",
								"productName" : "Linea Mini2",
								"productPrice" : "$999.00",
								"productGroup" : "Commercial Machines",
								"productFamily" : "Linea",
								"productParent" : "Machines - LINEA"								

							},
							{
								"productCode" : "HSO567",
								"productName" : "Linea Mini3",
								"productPrice" : "$999.00",
								"productGroup" : "Commercial Machines",
								"productFamily" : "Linea",
								"productParent" : "Machines - LINEA"

							},
							{
								"productCode" : "HSO567",
								"productName" : "Linea Mini4",
								"productPrice" : "$999.00",
								"productGroup" : "Commercial Machines",
								"productFamily" : "Linea",
								"productParent" : "Machines - LINEA"

							}
						]


var topSellingItemList = [{
								"productCode" : "HSO567",
								"productName" : "Stada ep",
								"productPrice" : "$999.00",
								"productGroup" : "Commercial Machines",
								"productFamily" : "Espresso",
								"productParent" : "Machines - Espresso"

							},
							{
								"productCode" : "HSO567",
								"productName" : "Vulcano",
								"productPrice" : "$999.00",
								"productGroup" : "Commercial Machines",
								"productFamily" : "Espresso",
								"productParent" : "Machines - Espresso"

							},
							{
								"productCode" : "HSO567",
								"productName" : "Linea Mini",
								"productPrice" : "$999.00",
								"productGroup" : "Commercial Machines",
								"productFamily" : "Espresso",
								"productParent" : "Machines - Espresso"

							},
							{
								"productCode" : "HSO567",
								"productName" : "Leva x",
								"productPrice" : "$999.00",
								"productGroup" : "Commercial Machines",
								"productFamily" : "Espresso",
								"productParent" : "Machines - Espresso"

							}
						]


var specialOffersItemList = [{
								"productCode" : "HSO567",
								"productName" : "Stada ep",
								"productFamily" : "Espresso Machines",
								"productActualPrice" : "$1199.00",
								"productOfferPrice" : "$999.00",
								"productOffPercent" : "-20%",
								"productParent" : "Machines - LINEA",
								"productGroup" : "Commercial Machine"


							},
							{
								"productCode" : "HSO567",
								"productName" : "Vulcano",
								"productFamily" : "Espresso Machines",
								"productActualPrice" : "$1199.00",
								"productOfferPrice" : "$999.00",
								"productOffPercent" : "-20%",
								"productParent" : "Machines - Espresso",
								"productGroup" : "Commercial Machine"

							},
							{
								"productCode" : "HSO567",
								"productName" : "Linea Mini",
								"productFamily" : "Espresso Machines",
								"productActualPrice" : "$1199.00",
								"productOfferPrice" : "$999.00",
								"productOffPercent" : "-20%",
								"productParent" : "Machines - Espresso",
								"productGroup" : "Commercial Machine"

							},
							{
								"productCode" : "HSO567",
								"productName" : "Leva s",
								"productFamily" : "Espresso Machines",
								"productActualPrice" : "$1199.00",
								"productOfferPrice" : "$999.00",
								"productOffPercent" : "-20%",
								"productParent" : "Machines - LINEA",
								"productGroup" : "Commercial Machine"

							},
							{
								"productCode" : "HSO567",
								"productName" : "Leva x",
								"productFamily" : "Espresso Machines",
								"productActualPrice" : "$1199.00",
								"productOfferPrice" : "$999.00",
								"productOffPercent" : "-20%",
								"productParent" : "Machines - Espresso",
								"productGroup" : "Commercial Machine"

							},
							{
								"productCode" : "HSO567",
								"productName" : "Leva j",
								"productFamily" : "Espresso Machines",
								"productActualPrice" : "$1199.00",
								"productOfferPrice" : "$999.00",
								"productOffPercent" : "-20%",
								"productParent" : "Machines - Espresso",
								"productGroup" : "Commercial Machine"


							}
						]


async function showRecommendedProducts(recommendedProductsArray){

	var recommendedProductsHTML = ""

	for(i=0 ; i<recommendedProductsArray.length; i++){

		recommendedProductsHTML += '<div class="single_product">'
		recommendedProductsHTML += '<div class="product_content">'
		recommendedProductsHTML += '<h3><a href="product-details.html"><strong>'+recommendedProductsArray[i]["productName"]+'</strong></a></h3>'
		// recommendedProductsHTML += '<div class="product_ratings">'
		// recommendedProductsHTML += '<ul>'
		// recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// recommendedProductsHTML += '</ul>'
		// recommendedProductsHTML += '</div>'
		recommendedProductsHTML += '<h5><a href="product-details.html">'+recommendedProductsArray[i]["productGroup"]+'</a></h5>'
		recommendedProductsHTML += '<h5><a href="product-details.html">'+recommendedProductsArray[i]["productParent"]+'</a></h5>'
		recommendedProductsHTML += '<h5><a href="product-details.html">'+recommendedProductsArray[i]["productFamily"]+'</a></h5>'

		// recommendedProductsHTML += '<div class="price_box">'
		// recommendedProductsHTML += '<span class="regular_price">'+recommendedProductsArray[i]["productPrice"]+'</span>'
		// recommendedProductsHTML += '</div>'
		recommendedProductsHTML += '</div>'
		recommendedProductsHTML += '<div class="product_thumb">'
		recommendedProductsHTML += '<a class="primary_img" href="product-details.html"><img src="assets/img/product/product2.jpg" alt=""></a>'
		recommendedProductsHTML += '</div>'
		recommendedProductsHTML += '</div>'
	}


	$("#recommendedProducts").append(recommendedProductsHTML)
}


async function showTopSellingProducts(topSellingItemList){

	var topSellingProductsHTML = ""

	for(i=0 ; i<topSellingItemList.length; i++){

		topSellingProductsHTML += '<div class="single_product">'
		topSellingProductsHTML += '<div class="product_content">'
		topSellingProductsHTML += '<h3><a href="product-details.html"><strong>'+topSellingItemList[i]["productName"]+'</strong></a></h3>'
		// topSellingProductsHTML += '<div class="product_ratings">'
		// topSellingProductsHTML += '<ul>'
		// topSellingProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// topSellingProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// topSellingProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// topSellingProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// topSellingProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// topSellingProductsHTML += '</ul>'
		// topSellingProductsHTML += '</div>'
		// topSellingProductsHTML += '<div class="price_box">'
		// topSellingProductsHTML += '<span class="regular_price">'+topSellingItemList[i]["productPrice"]+'</span>'
		// topSellingProductsHTML += '</div>'
		topSellingProductsHTML += '<h5><a href="product-details.html">'+topSellingItemList[i]["productGroup"]+'</a></h5>'
		topSellingProductsHTML += '<h5><a href="product-details.html">'+topSellingItemList[i]["productParent"]+'</a></h5>'
		topSellingProductsHTML += '<h5><a href="product-details.html">'+topSellingItemList[i]["productFamily"]+'</a></h5>'
		topSellingProductsHTML += '</div>'
		topSellingProductsHTML += '<div class="product_thumb">'
		topSellingProductsHTML += '<a class="primary_img" href="product-details.html"><img src="assets/img/product/product2.jpg" alt=""></a>'
		topSellingProductsHTML += '</div>'
		topSellingProductsHTML += '</div>'
	}


	$("#topSellingProducts").append(topSellingProductsHTML)
}



async function showSpecialOffersProducts(specialOffersItemList){

	var specialOffersProductsHTML = ""

	for(i=0 ; i<specialOffersItemList.length ;i++){

		specialOffersProductsHTML += '<div class="single_product">'
		specialOffersProductsHTML += '<div class="product_name">'
		specialOffersProductsHTML += '<h3><a href="product-details.html"><strong>'+specialOffersItemList[i]["productName"]+'</strong></a></h3>'
		specialOffersProductsHTML += '<p class="manufacture_product"><a href="#">'+specialOffersItemList[i]["productGroup"]+'</a></p>'
		specialOffersProductsHTML += '<p class="manufacture_product"><a href="#">'+specialOffersItemList[i]["productParent"]+'</a></p>'
		specialOffersProductsHTML += '<p class="manufacture_product"><a href="#">'+specialOffersItemList[i]["productFamily"]+'</a></p>'
		specialOffersProductsHTML += '</div>'
		specialOffersProductsHTML += '<div class="product_thumb">'
		specialOffersProductsHTML += '<a class="primary_img" href="product-details.html"><img src="assets/img/product/product19.jpg" alt=""></a>'
		specialOffersProductsHTML += '<a class="secondary_img" href="product-details.html"><img src="assets/img/product/product11.jpg" alt=""></a>'
		specialOffersProductsHTML += '<div class="label_product">'
		specialOffersProductsHTML += '<span class="label_sale">'+specialOffersItemList[i]["productOffPercent"]+'</span>'
		specialOffersProductsHTML += '</div>'
		specialOffersProductsHTML += ''
		specialOffersProductsHTML += '<div class="action_links">'
		specialOffersProductsHTML += '<ul>'
		// specialOffersProductsHTML += '<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box" title="quick view"> <span class="lnr lnr-magnifier"></span></a></li>'
		// specialOffersProductsHTML += '<li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><span class="lnr lnr-heart"></span></a></li>'
		// specialOffersProductsHTML += '<li class="compare"><a href="compare.html" title="compare"><span class="lnr lnr-sync"></span></a></li>'
		specialOffersProductsHTML += '</ul>'
		specialOffersProductsHTML += '</div>'
		specialOffersProductsHTML += '</div>'
		specialOffersProductsHTML += '<div class="product_content">'
		// specialOffersProductsHTML += '<div class="product_ratings">'
		// specialOffersProductsHTML += '<ul>'
		// specialOffersProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// specialOffersProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// specialOffersProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// specialOffersProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// specialOffersProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// specialOffersProductsHTML += '</ul>'
		// specialOffersProductsHTML += '</div>'
		specialOffersProductsHTML += '<div class="product_footer d-flex align-items-center">'
		// specialOffersProductsHTML += '<div class="price_box">'
		// specialOffersProductsHTML += '<span class="current_price">'+specialOffersItemList[i]["productOfferPrice"]+'</span>'
	 //    specialOffersProductsHTML += '<span class="old_price">'+specialOffersItemList[i]["productActualPrice"]+'</span>'
		// specialOffersProductsHTML += '</div>'
		// specialOffersProductsHTML += '<div class="add_to_cart">'
		// specialOffersProductsHTML += '<a href="cart.html" title="add to cart"><span class="lnr lnr-cart"></span></a>'
		// specialOffersProductsHTML += '</div>'
		specialOffersProductsHTML += '</div>'
		specialOffersProductsHTML += '</div>'
		specialOffersProductsHTML += '</div>'
	}

	$("#specialOffersProducts").append(specialOffersProductsHTML)

}


showRecommendedProducts(recommendedItemList)
showTopSellingProducts(topSellingItemList)
showSpecialOffersProducts(specialOffersItemList)