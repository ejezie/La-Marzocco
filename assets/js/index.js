$(document).ready(function(){

	shoppingCart.sync();
})

 function showRecommendedProducts(items){



	var recommendedProductsHTML = ""

	for(item of items){
 	console.log("items  <>>>>  >>>>>> : ", item)

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
		recommendedProductsHTML += '<h5><a>'+safeAccess(["item_group","desc"],item)+'</a></h5>'
		recommendedProductsHTML += '<h5><a>'+safeAccess(["item_parent_images",0,"parent","name"],item)+'</a></h5>'
		recommendedProductsHTML += '<h5><a>'+safeAccess(["item_family",0,"code"],item)+'</a></h5>'

		// recommendedProductsHTML += '<div class="price_box">'
		// recommendedProductsHTML += '<span class="regular_price">'+recommendedProductsArray[i]["productPrice"]+'</span>'
		// recommendedProductsHTML += '</div>'
		recommendedProductsHTML += '</div>'
		recommendedProductsHTML += '<div class="product_thumb">'
		recommendedProductsHTML += '<a class="primary_img" href="product-details.html?item='+item.id+'"><img src="'+item.item_parent_images[0].image.thumbnail+'" alt=""></a>'
		recommendedProductsHTML += '</div>'
		recommendedProductsHTML += '</div>'
		// recommendedProductsHTML += '</a>'
	}


	// 	var owl1 = $('.product_column3');
	// owl1.trigger('destroy.owl.carousel');
	// owl.owlCarousel({
	//    items: 5,
	// });


	// carouselLib()
	$("#recommendedProducts").append(recommendedProductsHTML)

	var owl1 = $('.product_column3');
	owl1.trigger('destroy.owl.carousel');



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

    $('.product_column3 .owl-stage').css('transform','translate3d(-4440px, 0px, 0px)');



}


 function showTopSellingProducts(items){


	var topSellingProductsHTML = ""

	// for(i=0 ; i<topSellingItemList.length; i++){
	for(item of items){

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
		topSellingProductsHTML += '<h5><a href="product-details.html">'+safeAccess(["item_group","desc"],item)+'</a></h5>'
		topSellingProductsHTML += '<h5><a href="product-details.html">'+safeAccess(["item_parent_images",0,"parent","name"],item)+'</a></h5>'
		topSellingProductsHTML += '<h5><a href="product-details.html">'+safeAccess(["item_family",0,"code"],item)+'</a></h5>'
		topSellingProductsHTML += '</div>'
		topSellingProductsHTML += '<div class="product_thumb">'
		topSellingProductsHTML += '<a class="primary_img" href="product-details.html?item='+item.id+'"><img src="'+item.item_parent_images[0].image.thumbnail+'" alt=""></a>'
		topSellingProductsHTML += '</div>'
		topSellingProductsHTML += '</div>'
	}


	$("#topSellingProducts").append(topSellingProductsHTML)



	var owl2 = $('.product_column3');
	owl2.trigger('destroy.owl.carousel');


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

    $('.product_column3 .owl-stage').css('transform','translate3d(-4440px, 0px, 0px)');
    $('.product_column3 .owl-stage .owl-item .active').css('width','300px');
}





async function showSpecialOffersProducts(items){


	var specialOffersProductsHTML = ""

	for(item of items){


		specialOffersProductsHTML += '<div class="single_product">'
		specialOffersProductsHTML += '<div class="product_content">'
		specialOffersProductsHTML += '<h3><a href="product-details.html?item='+item.id+'" style="text-transform: lowercase;"><strong>'+item["name"]+'</strong></a></h3>'
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
		specialOffersProductsHTML += '<h5><a href="product-details.html">'+safeAccess(["item_group","desc"],item)+'</a></h5>'
		specialOffersProductsHTML += '<h5><a href="product-details.html">'+safeAccess(["item_parent_images",0,"parent","name"],item)+'</a></h5>'
		specialOffersProductsHTML += '<h5><a href="product-details.html">'+safeAccess(["item_family",0,"code"],item)+'</a></h5>'
		specialOffersProductsHTML += '</div>'
		specialOffersProductsHTML += '<div class="product_thumb">'
		specialOffersProductsHTML += '<a class="primary_img" href="product-details.html?item='+item.id+'"><img src="'+item.item_parent_images[0].image.thumbnail+'" alt=""></a>'
		specialOffersProductsHTML += '</div>'
		specialOffersProductsHTML += '</div>'
	}







	$("#specialOffersProducts").append(specialOffersProductsHTML)


	var owl3 = $('.product_column3');
	owl3.trigger('destroy.owl.carousel');


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


	$('.product_column3 .owl-stage').css('transform','translate3d(-4440px, 0px, 0px)');

}



// carouselLib()




async function showPromotion(promotionData) {

	console.log("promotionData :   >>> ", promotionData)

	var promotionImages = promotionData.images.data

	var promotionHTML = ''

	for(i=0; i<promotionImages.length;i++){


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


// promotionHTML += '<div class="item">'
// promotionHTML += '<img class="owl-lazy" data-src="https://i.pinimg.com/originals/84/67/26/846726299dc5abbeb5d60016f0fb32e9.jpg" alt="">'
// promotionHTML += '</div>'
// promotionHTML += '<div class="item">'
// promotionHTML += '<img class="owl-lazy" data-src="http://desktop-backgrounds-org.s3.amazonaws.com/400x300/twitter-nature-high-definition.jpg" alt="">'
// promotionHTML += '</div>'
// promotionHTML += '<div class="item">'
// promotionHTML += '<img class="owl-lazy" data-src="https://i.pinimg.com/originals/84/67/26/846726299dc5abbeb5d60016f0fb32e9.jpg" alt="">'
// promotionHTML += '</div>'
// promotionHTML += '<div class="item">'
// promotionHTML += '<img class="owl-lazy" data-src="http://desktop-backgrounds-org.s3.amazonaws.com/400x300/twitter-nature-high-definition.jpg" alt="">'
// promotionHTML += '</div>'
// promotionHTML += '<div class="item">'
// promotionHTML += '<img class="owl-lazy" data-src="https://i.pinimg.com/originals/84/67/26/846726299dc5abbeb5d60016f0fb32e9.jpg" alt="">'
// promotionHTML += '</div>'
// promotionHTML += '<div class="item">'
// promotionHTML += '<img class="owl-lazy" data-src="http://desktop-backgrounds-org.s3.amazonaws.com/400x300/twitter-nature-high-definition.jpg" alt="">'
// promotionHTML += '</div>'
// promotionHTML += '<div class="item">'
// promotionHTML += '<img class="owl-lazy" data-src="https://i.pinimg.com/originals/84/67/26/846726299dc5abbeb5d60016f0fb32e9.jpg" alt="">'
// promotionHTML += '</div>'
// promotionHTML += '<div class="item">'
// promotionHTML += '<img class="owl-lazy" data-src="http://desktop-backgrounds-org.s3.amazonaws.com/400x300/twitter-nature-high-definition.jpg" alt="">'
// promotionHTML += '</div>'
// promotionHTML += '<div class="item">'
// promotionHTML += '<img class="owl-lazy" data-src="https://i.pinimg.com/originals/84/67/26/846726299dc5abbeb5d60016f0fb32e9.jpg" alt="">'
// promotionHTML += '</div>'
		promotionHTML += '<div class="item">'
		promotionHTML += '<a href="shop.html"><img class="owl-lazy" data-src="'+promotionImages[i]["image"]["name"]+'" alt=""></a>'
		promotionHTML += '</div>'


	}


	// $("#promotion").append(promotionHTML)
	$("#carousel").append(promotionHTML)

	$("#carousel").owlCarousel({
  autoplay: true,
  lazyLoad: true,
  rewind: true,
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  responsiveClass: true,
  navText: [],
  autoHeight: true,
  autoplayTimeout: 7000,
  smartSpeed: 800,
  nav: true,
  responsive: {
    0: {
      items: 1
    },

    992: {
      items: 3
    },

    // 1024: {
    //   items: 4
    // },

    // 1366: {
    //   items: 4
    // }
  }
});

}

async function carouselLib() {
	// body...


		var owl1 = $('.product_column3');
	owl1.trigger('destroy.owl.carousel');
	// owl.owlCarousel({
	//    items: 5,
	// });

$('.product_column3').data('owlCarousel').reinit();


	$('.product_column3').owlCarousel({
        autoplay: true,
		loop: true,
        nav: true,
        autoplay: false,
        autoplayTimeout: 8000,
        // items: 5,
        // margin:20,
        dots:false,
        navText: ['<i class="ion-ios-arrow-thin-left"></i>','<i class="ion-ios-arrow-thin-right"></i>'],
        responsiveClass:true,
		responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },

    1024: {
      items: 4
    },

    1366: {
      items: 4
    }
  }
    });
}


$(document).ready(function(){


	var user_profile = JSON.parse(localStorage.getItem("user_profile"))
	var role = user_profile["user_role"]
	if (role != 1){
		logout()
	}

	var onError =function(error){
		// notifyError("Failed to");
	};



	getRecommendedProducts(function(res){
		showRecommendedProducts(safeAccess(["data","items","data"],res));
	},onError)
	getTopSellingProducts(function(res){
		showTopSellingProducts(safeAccess(["data","items","data"],res));
	},onError)
	getMostViewedProducts(function(res){
		showSpecialOffersProducts(safeAccess(["data","items","data"],res));
	},onError)


	getPromotion(function(response){
		showPromotion(response.data)
	},onError);
	
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






