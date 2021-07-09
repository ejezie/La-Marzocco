var favouriteItemList = []

$(document).ready(function() {
    getFavItemList()
    shoppingCart.sync();
})

function showRecommendedProducts(items) {
    var getFavouriteItemList = favouriteItemList
    var recommendedProductsHTML = ""
    for (item of items) {
        recommendedProductsHTML += '<div class="single_product">'
        recommendedProductsHTML += '<div class="product_content">'
        recommendedProductsHTML += '<h3><a href="product-details.html?item=' + item.id + '" style="text-transform: lowercase;"><strong>' + item["name"] + '</strong></a></h3>'
        recommendedProductsHTML += '<h5><a>' + safeAccess(["code"], item) + '</a></h5>'
        recommendedProductsHTML += '<h5><a>' + safeAccess(["item_group", "desc"], item) + '</a></h5>'
        recommendedProductsHTML += '<h5><a>' + safeAccess(["item_parent_images", 0, "parent", "name"], item) + '</a></h5>'
        recommendedProductsHTML += '<h5><a>' + safeAccess(["item_family", 0, "code"], item) + '</a></h5>'
        recommendedProductsHTML += '</div>'
        recommendedProductsHTML += '<div class="product_thumb">'
        if (item.item_images[0] != undefined) {
            recommendedProductsHTML += '<a class="primary_img" href="product-details.html?item=' + item.id + '"><img src="' + item.item_images[0].image.thumbnail + '" alt=""></a>'
        } else if (item.item_parent_images[0] != undefined) {

            recommendedProductsHTML += '<a class="primary_img" href="product-details.html?item=' + item.id + '"><img src="' + item.item_parent_images[0].image.thumbnail + '" alt=""></a>'
        } else {
            recommendedProductsHTML += '<a class="primary_img" href="product-details.html?item=' + item.id + '"><img src="assets/img/lma_catalog_img.png" alt="" onerror="this.src=`assets/img/lma_catalog_img.png`;"></a>'
        }
        if (itemIdExists(Number(item.id), getFavouriteItemList)) {

            recommendedProductsHTML += '<span class="removeRecommendedProducts" class="imgTop" value="' + item.id + '" style="background-color:#fff;float:right" id=' + item.id + '  ><img src="assets/img/Favorite/changed.jpg" style="width:50px;height:50px;text-align:right"></span>'
        } else {
            recommendedProductsHTML += '<span class="recommendedProducts" class="imgTop" value="' + item.id + '" style="background-color:#fff;float:right" id=' + item.id + '  ><img src="assets/img/Favorite/favorite.jpg" title="Favorite" style="width:50px;height:50px;text-align:right"></span>'
        }
        recommendedProductsHTML += '</div>'
        recommendedProductsHTML += '</div>'

    }
    $("#recommendedProducts").append(recommendedProductsHTML)
    $(".recommendedProducts").click(async function() {
        var data = $(this).attr("value");
        var onError = function(error) {
            notifyError("Failed to Added Favourite Item");
        };
        var onResponse = function(response) {
            if (response.data.status == true) {
                notifySuccess("Favourite Item Added Successfully");
                window.location.reload();
            } else {
                notifyError(response.data.message);
            }
        };
        addFavourite(data, onResponse, onError);
    });
    $(".removeRecommendedProducts").click(async function() {
        var data = $(this).attr("value");
        var onError = function(error) {
            notifyError("Failed to Added Removed Item");
        };
        var onResponse = function(response) {
            if (response.data.status == true) {
                notifySuccess("Favourite Item Removed Successfully");
                window.location.reload();
            } else {
                notifyError(response.data.message);
            }
        };
        removeFavourite(data, onResponse, onError);
    });



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
        dots: false,
        navText: ['<i class="ion-ios-arrow-thin-left"></i>', '<i class="ion-ios-arrow-thin-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            200: {
                items: 2,
            },
            992: {
                items: 3,
            },


        }
    });

    $('.product_column3 .owl-stage').css('transform', 'translate3d(-4440px, 0px, 0px)');
}

async function showTopSellingProducts(items) {

    var getFavouriteItemList = favouriteItemList
    var topSellingProductsHTML = ""
    $("#topSellingProducts").empty(topSellingProductsHTML)
    for (item of items) {

        topSellingProductsHTML += '<div class="single_product">'
        topSellingProductsHTML += '<div class="product_content">'
        topSellingProductsHTML += '<h3><a href="product-details.html?item=' + item.id + '" style="text-transform: lowercase;"><strong>' + item["name"] + '</strong></a></h3>'
        topSellingProductsHTML += '<h5><a>' + safeAccess(["code"], item) + '</a></h5>'
        topSellingProductsHTML += '<h5><a href="product-details.html">' + safeAccess(["item_group", "desc"], item) + '</a></h5>'
        topSellingProductsHTML += '<h5><a href="product-details.html">' + safeAccess(["item_parent_images", 0, "parent", "name"], item) + '</a></h5>'
        topSellingProductsHTML += '<h5><a href="product-details.html">' + safeAccess(["item_family", 0, "code"], item) + '</a></h5>'
        topSellingProductsHTML += '</div>'
        topSellingProductsHTML += '<div class="product_thumb">'
        if (item.item_images[0] != undefined) {

            topSellingProductsHTML += '<a class="primary_img" href="product-details.html?item=' + item.id + '"><img src="' + item.item_images[0].image.thumbnail + '" alt=""></a>'
        } else if (item.item_parent_images[0] != undefined) {

            topSellingProductsHTML += '<a class="primary_img" href="product-details.html?item=' + item.id + '"><img src="' + item.item_parent_images[0].image.thumbnail + '" alt=""></a>'
        } else {
            topSellingProductsHTML += '<a class="primary_img" href="product-details.html?item=' + item.id + '"><img src="assets/img/lma_catalog_img.png" alt="" onerror="this.src=`assets/img/lma_catalog_img.png`;"></a>'
        }
        if (itemIdExists(Number(item.id), getFavouriteItemList)) {
            topSellingProductsHTML += '<span class="imageChanged"  value="' + item.id + '" style="background-color:#fff;float:right" id=' + item.id + '  ><img src="assets/img/Favorite/changed.jpg" style="width:50px;height:50px;text-align:right"></span>'
        } else {
            topSellingProductsHTML += '<span class="topSellingProducts"  value="' + item.id + '" style="background-color:#fff;float:right" id=' + item.id + '  ><img src="assets/img/Favorite/favorite.jpg" title="Favorite" style="width:50px;height:50px;text-align:right"></span>'


        }
        topSellingProductsHTML += '</div>'
        topSellingProductsHTML += '</div>'
    }


    $("#topSellingProducts").append(topSellingProductsHTML)

    $(".topSellingProducts").click(async function() {
        var data = $(this).attr("value");
        var onError = function(error) {
            notifyError("Failed to Added Favourite Item");
        };
        var onResponse = function(response) {
            if (response.data.status == true) {
                notifySuccess("Favourite Item Added Successfully");
                window.location.reload();
            } else {
                notifyError(response.data.message);
            }
        };
        addFavourite(data, onResponse, onError);
    });
    $(".imageChanged").click(async function() {
        var data = $(this).attr("value");
        var onError = function(error) {
            notifyError("Failed to Added Removed Item");
        };
        var onResponse = function(response) {
            if (response.data.status == true) {
                notifySuccess("Favourite Item Removed Successfully");
                window.location.reload();
            } else {
                notifyError(response.data.message);
            }
        };
        removeFavourite(data, onResponse, onError);
    });

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
        dots: false,
        navText: ['<i class="ion-ios-arrow-thin-left"></i>', '<i class="ion-ios-arrow-thin-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            200: {
                items: 2,
            },
            992: {
                items: 3,
            },


        }
    });

    $('.product_column3 .owl-stage').css('transform', 'translate3d(-4440px, 0px, 0px)');
    $('.product_column3 .owl-stage .owl-item .active').css('width', '300px');
}


async function showSpecialOffersProducts(items) {

    var specialOffersProductsHTML = ""
    var getFavouriteItemList = favouriteItemList
    for (item of items) {
        specialOffersProductsHTML += '<div class="single_product">'
        specialOffersProductsHTML += '<div class="product_content">'
        specialOffersProductsHTML += '<h3><a href="product-details.html?item=' + item.id + '" style="text-transform: lowercase;"><strong>' + item["name"] + '</strong></a></h3>'
        specialOffersProductsHTML += '<h5><a>' + safeAccess(["code"], item) + '</a></h5>'
        specialOffersProductsHTML += '<h5><a href="product-details.html">' + safeAccess(["item_group", "desc"], item) + '</a></h5>'
        specialOffersProductsHTML += '<h5><a href="product-details.html">' + safeAccess(["item_parent_images", 0, "parent", "name"], item) + '</a></h5>'
        specialOffersProductsHTML += '<h5><a href="product-details.html">' + safeAccess(["item_family", 0, "code"], item) + '</a></h5>'
        specialOffersProductsHTML += '</div>'
        specialOffersProductsHTML += '<div class="product_thumb">'
        if (item.item_images[0] != undefined) {
            specialOffersProductsHTML += '<a class="primary_img" href="product-details.html?item=' + item.id + '"><img src="' + item.item_images[0].image.thumbnail + '" alt="" onerror="this.src=`assets/img/lma_catalog_img.png`;"></a>'
        } else if (item.item_parent_images[0] != undefined) {
            specialOffersProductsHTML += '<a class="primary_img" href="product-details.html?item=' + item.id + '"><img src="' + item.item_parent_images[0].image.thumbnail + '" alt="" onerror="this.src=`assets/img/lma_catalog_img.png`;"></a>'
        } else {
            specialOffersProductsHTML += '<a class="primary_img" href="product-details.html?item=' + item.id + '"><img src="assets/img/lma_catalog_img.png" alt="" onerror="this.src=`assets/img/lma_catalog_img.png`;"></a>'
        }
        if (itemIdExists(Number(item.id), getFavouriteItemList)) {
            specialOffersProductsHTML += '<span class="removeSpecialOffersProducts" class="imgTop" value="' + item.id + '" style="background-color:#fff;float:right" id=' + item.id + '  ><img src="assets/img/Favorite/changed.jpg" style="width:50px;height:50px;text-align:right"></span>'
        } else {
            specialOffersProductsHTML += '<span class="specialOffersProducts" class="imgTop" value="' + item.id + '" style="background-color:#fff;float:right" id=' + item.id + '  ><img src="assets/img/Favorite/favorite.jpg" title="Favorite" style="width:50px;height:50px;text-align:right"></span>'
        }
        specialOffersProductsHTML += '<span class="results" class="imgTop" value="' + item.id + '" style="background-color:#fff;" id=fa' + item.id + '  ></span>'
        specialOffersProductsHTML += '</div>'
        specialOffersProductsHTML += '</div>'
    }
    $("#specialOffersProducts").append(specialOffersProductsHTML)

    $(".specialOffersProducts").click(async function() {
        var data = $(this).attr("value");
        var onError = function(error) {
            notifyError("Failed to Added Favourite Item");
        };
        var onResponse = function(response) {
            if (response.data.status == true) {
                notifySuccess("Favourite Item Added Successfully");
                window.location.reload();
            } else {
                notifyError(response.data.message);
            }
        };
        addFavourite(data, onResponse, onError);
    });


    $(".removeSpecialOffersProducts").click(async function() {
        var data = $(this).attr("value");
        var onError = function(error) {
            notifyError("Failed to Added Removed Item");
        };
        var onResponse = function(response) {
            if (response.data.status == true) {
                notifySuccess("Favourite Item Removed Successfully");
                window.location.reload();
            } else {
                notifyError(response.data.message);
            }
        };
        removeFavourite(data, onResponse, onError);
    });


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
        dots: false,
        navText: ['<i class="ion-ios-arrow-thin-left"></i>', '<i class="ion-ios-arrow-thin-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            200: {
                items: 2,
            },
            992: {
                items: 3,
            },


        }
    });
    $('.product_column3 .owl-stage').css('transform', 'translate3d(-4440px, 0px, 0px)');
}

async function showPromotion(promotionData) {


    var promotionImages = promotionData.images.data

    var promotionHTML = ''

    for (i = 0; i < promotionImages.length; i++) {
        promotionHTML += '<div class="item">'
        promotionHTML += '<a href="shop.html"><img class="owl-lazy" data-src="' + promotionImages[i]["image"]["name"] + '" alt=""></a>'
        promotionHTML += '</div>'
    }
    $("#carousel").append(promotionHTML)

    $("#carousel").owlCarousel({
        autoplay: true,
        lazyLoad: true,
        rewind: true,
        margin: 20,
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
        }
    });

}
async function carouselLib() {
    // body...
    var owl1 = $('.product_column3');
    owl1.trigger('destroy.owl.carousel');
    $('.product_column3').data('owlCarousel').reinit();


    $('.product_column3').owlCarousel({
        autoplay: true,
        loop: true,
        nav: true,
        autoplay: false,
        autoplayTimeout: 8000,
        // items: 5,
        // margin:20,
        dots: false,
        navText: ['<i class="ion-ios-arrow-thin-left"></i>', '<i class="ion-ios-arrow-thin-right"></i>'],
        responsiveClass: true,
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

$(document).ready(function() {
    var user_profile = JSON.parse(localStorage.getItem("user_profile"))
    var role = user_profile["user_role"]
    if (role != 1) {
        logout()
    }
    var onError = function(error) {
        // notifyError("Failed to");
    };
    getRecommendedProducts(function(res) {
        showRecommendedProducts(safeAccess(["data", "items", "data"], res));
    }, onError)
    getTopSellingProducts(function(res) {
        showTopSellingProducts(safeAccess(["data", "items", "data"], res));
    }, onError)
    getMostViewedProducts(function(res) {
        showSpecialOffersProducts(safeAccess(["data", "items", "data"], res));
    }, onError)


    getPromotion(function(response) {
        showPromotion(response.data)
    }, onError);

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
        e.stopPropagation(); // do not need pop in multi level mode
    });
});
// for hover
$('.dropdown-hover').on('mouseenter', function() {
    if (!$(this).hasClass('show')) {
        $('>[data-toggle="dropdown"]', this).dropdown('toggle');
    }
});
$('.dropdown-hover').on('mouseleave', function() {
    if ($(this).hasClass('show')) {
        $('>[data-toggle="dropdown"]', this).dropdown('toggle');
    }
});
$('.dropdown-hover-all').on('mouseenter', '.dropdown', function() {
    if (!$(this).hasClass('show')) {
        $('>[data-toggle="dropdown"]', this).dropdown('toggle');
    }
});
$('.dropdown-hover-all').on('mouseleave', '.dropdown', function() {
    if ($(this).hasClass('show')) {
        $('>[data-toggle="dropdown"]', this).dropdown('toggle');
    }
});