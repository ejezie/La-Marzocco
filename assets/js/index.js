$(document).ready(function(){
	shoppingCart.sync();
})

async function showRecommendedProducts(items){

	var recommendedProductsHTML = ""

	for(item of items){

		// recommendedProductsHTML += '<a >'
		recommendedProductsHTML += '<div class="single_product">'
		recommendedProductsHTML += '<div class="product_content">'
		recommendedProductsHTML += '<h3><a href="product-details.html?item='+item.id+'" style="text-transform: lowercase;"><strong>'+item["name"]+'</strong></a></h3>'
		// recommendedProductsHTML += '<div class="product_ratings">'
		// recommendedProductsHTML += '<ul>'
		// recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
		// recommendedProductsHTML += '</ul>'
		// recommendedProductsHTML += '</div>'
		recommendedProductsHTML += '<h5><a>'+safeAccess(["item_group","name"],item)+'</a></h5>'
		recommendedProductsHTML += '<h5><a>'+safeAccess(["item_parent_images",0,"parent","name"],item)+'</a></h5>'
		recommendedProductsHTML += '<h5><a>'+safeAccess(["item_family",0,"code"],item)+'</a></h5>'

		// recommendedProductsHTML += '<div class="price_box">'
		// recommendedProductsHTML += '<span class="regular_price">'+recommendedProductsArray[i]["productPrice"]+'</span>'
		// recommendedProductsHTML += '</div>'
		recommendedProductsHTML += '</div>'
		recommendedProductsHTML += '<div class="product_thumb">'
		recommendedProductsHTML += '<a class="primary_img" href="product-details.html?id='+item.id+'"><img src="assets/img/product/product2.jpg" alt=""></a>'
		recommendedProductsHTML += '</div>'
		recommendedProductsHTML += '</div>'
		// recommendedProductsHTML += '</a>'
	}


	$("#recommendedProducts").append(recommendedProductsHTML)
}


async function showTopSellingProducts(topSellingItemList){

	var topSellingProductsHTML = ""

	for(i=0 ; i<topSellingItemList.length; i++){

		topSellingProductsHTML += '<div class="single_product">'
		topSellingProductsHTML += '<div class="product_content">'
		topSellingProductsHTML += '<h3><a href="product-details.html?item='+item.id+'" style="text-transform: lowercase;"><strong>'+item["name"]+'</strong></a></h3>'
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
		topSellingProductsHTML += '<h5><a href="product-details.html">'+safeAccess(["item_group","name"],item)+'</a></h5>'
		topSellingProductsHTML += '<h5><a href="product-details.html">'+safeAccess(["item_parent_images",0,"parent","name"],item)+'</a></h5>'
		topSellingProductsHTML += '<h5><a href="product-details.html">'+safeAccess(["item_family",0,"code"],item)+'</a></h5>'
		topSellingProductsHTML += '</div>'
		topSellingProductsHTML += '<div class="product_thumb">'
		topSellingProductsHTML += '<a class="primary_img" href="product-details.html"><img src="assets/img/product/product2.jpg" alt=""></a>'
		topSellingProductsHTML += '</div>'
		topSellingProductsHTML += '</div>'
	}


	$("#topSellingProducts").append(topSellingProductsHTML)
}



function slickCarousel() {
  $('.owl-carousel').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1
  });
}
function destroyCarousel() {
  if ($('.owl-carousel').hasClass('slick-initialized')) {
    $('.owl-carousel').slick('destroy');
  }      
}


async function showSpecialOffersProducts(items){

	var specialOffersProductsHTML = ""

	for(item of items){

		specialOffersProductsHTML += '<div class="single_product">'
		specialOffersProductsHTML += '<div class="product_name">'
		specialOffersProductsHTML += '<h3><a href="product-details.html" style="text-transform: lowercase;"><strong>'+item["name"]+'</strong></a></h3>'
		specialOffersProductsHTML += '<p class="manufacture_product"><a href="#" >'+safeAccess(["item_group","name"],item)+'</a></h5>'
		specialOffersProductsHTML += '<p class="manufacture_product"><a href="#" >'+safeAccess(["item_parent_images",0,"parent","name"],item)+'</a></h5>'
		specialOffersProductsHTML += '<p class="manufacture_product"><a href="#" >'+safeAccess(["item_family",0,"code"],item)+'</a></h5>'
		specialOffersProductsHTML += '</div>'
		specialOffersProductsHTML += '<div class="product_thumb">'
		specialOffersProductsHTML += '<a class="primary_img" href="product-details.html"><img src="assets/img/product/product19.jpg" alt=""></a>'
		specialOffersProductsHTML += '<a class="secondary_img" href="product-details.html"><img src="assets/img/product/product11.jpg" alt=""></a>'
		specialOffersProductsHTML += '<div class="label_product">'
		// specialOffersProductsHTML += '<span class="label_sale">'+specialOffersItemList[i]["productOffPercent"]+'</span>'
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



	var owl1 = $('.product_column3');
	owl1.trigger('destroy.owl.carousel');
	// owl.owlCarousel({
	//    items: 5,
	// });




	$('.product_column3').owlCarousel({
        autoplay: true,
		loop: true,
        nav: true,
        autoplay: false,
        autoplayTimeout: 8000,
        items: 5,
        // margin:20,
        dots:false,
        navText: ['<i class="ion-ios-arrow-thin-left"></i>','<i class="ion-ios-arrow-thin-right"></i>'],
        responsiveClass:true,
		responsive:{
				0:{
				items:1,
			},
            200:{
				items:2,
			},
            992:{
				items:3,
			},
			

		  }
    });


    $('.product_column5').on('changed.owl.carousel initialized.owl.carousel', function (event) {
        $(event.target).find('.owl-item').removeClass('last').eq(event.item.index + event.page.size - 1).addClass('last')}).owlCarousel({
        autoplay: true,
		loop: true,
        nav: true,
        autoplay: false,
        autoplayTimeout: 8000,
        items: 5,
        margin:20,
        dots:false,
        navText: ['<i class="ion-ios-arrow-thin-left"></i>','<i class="ion-ios-arrow-thin-right"></i>'],
        responsiveClass:true,
		responsive:{
				0:{
				items:1,
			},
            576:{
				items:2,
			},
            768:{
				items:3,
			},
            992:{
				items:4,
			},
            1200:{
				items:5,
			},


		  }
    });

	$("#specialOffersProducts").append(specialOffersProductsHTML)

    // $('.small_product').slick({
    //     centerMode: true,
    //     centerPadding: '0',
    //     slidesToShow: 1,
    //     arrows:false,
    //     rows: 3,
    //     responsive:[
    //         {
    //           breakpoint: 480,
    //           settings: {
    //             slidesToShow: 1,
    //               slidesToScroll: 1,
    //           }
    //         },
    //         {
    //           breakpoint: 768,
    //           settings: {
    //             slidesToShow: 1,
    //               slidesToScroll: 1,
    //           }
    //         },
    //         {
    //           breakpoint: 991,
    //           settings: {
    //             slidesToShow: 2,
    //               slidesToScroll: 2,
    //           }
    //         },
    //     ]
    // });
	// destroyCarousel()
    // slickCarousel();
}








async function showPromotion(promotionData) {

	console.log("promotionData :   >>> ", promotionData)

	var promotionImages = promotionData.images.data

	var promotionHTML = ''

	for(i=0; i<2;i++){


		// promotionHTML += '<div class="single_banner">'
		// promotionHTML += '<div class="banner_thumb">'
		// promotionHTML += '<a href="#"><img src="'+promotionImages[i]["image"]["name"]+'" alt=""></a>'
		// promotionHTML += '<div class="banner_text">'
		// // promotionHTML += '<!-- <h3>Coffee Machine</h3>'
		// // promotionHTML += '<h2>Best in Quality</h2> -->'
		// // promotionHTML += '<!-- <a href="shop.html">Shop Now</a> -->'
		// promotionHTML += '</div>'
		// promotionHTML += '</div>'
		// promotionHTML += '</div>'






promotionHTML += '<div class="single_slider d-flex align-items-center" data-bgimg="https://au.lamarzocco.com/wp-content/uploads/2016/12/linea-mini-1.jpg">'
promotionHTML += '<div class="slider_content">'
promotionHTML += '<!--                 <h2 style="color: white">Linea Mini </h2>'
promotionHTML += '<h1 style="color: white">The Coffee Specialist</h1> -->'
promotionHTML += '<a class="button" href="shop.html">shopping now</a>'
promotionHTML += '</div>'
promotionHTML += ''
promotionHTML += '</div>'
	}


	$("#promotion").append(promotionHTML)


	var owl = $('.owl-carousel');
	owl.trigger('destroy.owl.carousel');
	owl.owlCarousel({
	   items: 1,
	});

}




$(document).ready(function(){

	var onError =function(error){
		// notifyError("Failed to");
	};


	getPromotion(function(response){
		showPromotion(response.data)
	},onError);


	getRecommendedProducts(function(res){
		showRecommendedProducts(safeAccess(["data","items","data"],res));
	})
	getTopSellingProducts(function(res){
		showTopSellingProducts(safeAccess(["data","items","data"],res));
	})
	getMostViewedProducts(function(res){
		showSpecialOffersProducts(safeAccess(["data","items","data"],res));
	})


	
	
});




$.fn.dropdown = (function() {
    var $bsDropdown = $.fn.dropdown;
    return function(config) {
        if (typeof config === 'string' && config === 'toggle') { // dropdown toggle trigged
            $('.has-child-dropdown-show').removeClass('has-child-dropdown-show');
            $(this).closest('.dropdown').parents('.dropdown').addClass('has-child-dropdown-show');
        }
        var ret = $bsDropdown.call($(this), config);
        $(this).off('click.bs.dropdown'); // Turn off dropdown.js click event, it will call 'this.toggle()' internal
        return ret;
    }
})();

$(function() {
    $('.dropdown [data-toggle="dropdown"]').on('click', function(e) {
        $(this).dropdown('toggle');
        e.stopPropagation(); // do not fire dropdown.js click event, it will call 'this.toggle()' internal
    });
    $('.dropdown').on('hide.bs.dropdown', function(e) {
        if ($(this).is('.has-child-dropdown-show')) {
        	$(this).removeClass('has-child-dropdown-show');
            e.preventDefault();
        }
        e.stopPropagation();    // do not need pop in multi level mode
    });
});

// for hover
$('.dropdown-hover').on('mouseenter',function() {
  if(!$(this).hasClass('show')){
    $('>[data-toggle="dropdown"]', this).dropdown('toggle');
  }
});
$('.dropdown-hover').on('mouseleave',function() {
  if($(this).hasClass('show')){
    $('>[data-toggle="dropdown"]', this).dropdown('toggle');
  }
});
$('.dropdown-hover-all').on('mouseenter', '.dropdown', function() {
  if(!$(this).hasClass('show')){
    $('>[data-toggle="dropdown"]', this).dropdown('toggle');
  }
});
$('.dropdown-hover-all').on('mouseleave', '.dropdown', function() {
  if($(this).hasClass('show')){
    $('>[data-toggle="dropdown"]', this).dropdown('toggle');
  }
});



