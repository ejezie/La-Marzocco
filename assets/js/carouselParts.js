var parts = ["STEAM WAND BODY", "ASSEMBLY COPPER WASHER", "SHAFT GASKET", "STEAM SHAFT WITH GASKET", "STEAM SHAFT SPRING",
    "SHAFT BUSHING", "SHAFT VITON O-RING", "LARGE PITCH VALVE SHAFT"
]


function toitemdetailpage(itemId) {
    const newUrl = 'product-details.html?item=' + itemId;
    window.location = newUrl, true;
}


// https://d1ekp87k3th824.cloudfront.net/media/wysiwyg/Diagrams/la-marzocco-linea-steam-valve.jpg


function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

async function showCarrouselParts(imageUrl) {
    console.log("onlyCOntent------------>", imageUrl)
    var carouselHTML = ""

    carouselHTML += '<input type="text" value="' + imageUrl + '" hidden>'

    $("#carouselParts").append(carouselHTML);
}

async function mainParts(imageCOntent) {
    var contentOnly = imageCOntent.split('<?xml version="1.0" encoding="UTF-8" standalone="no"?>');



    $("#Parts").html(contentOnly[1]);
}




var specialOffersItemList = [{
        "productCode": "HSO567",
        "productName": "Part1",
        "productFamily": "Espresso Machines",
        "productActualPrice": "$1199.00",
        "productOfferPrice": "$999.00",
        "productOffPercent": "-20%",
        "productParent": "Machines - LINEA",
        "productGroup": "Commercial Machine"


    },
    {
        "productCode": "HSO567",
        "productName": "Part2",
        "productFamily": "Espresso Machines",
        "productActualPrice": "$1199.00",
        "productOfferPrice": "$999.00",
        "productOffPercent": "-20%",
        "productParent": "Machines - Espresso",
        "productGroup": "Commercial Machine"

    },
    {
        "productCode": "HSO567",
        "productName": "Part3",
        "productFamily": "Espresso Machines",
        "productActualPrice": "$1199.00",
        "productOfferPrice": "$999.00",
        "productOffPercent": "-20%",
        "productParent": "Machines - Espresso",
        "productGroup": "Commercial Machine"

    },
    {
        "productCode": "HSO567",
        "productName": "Part4",
        "productFamily": "Espresso Machines",
        "productActualPrice": "$1199.00",
        "productOfferPrice": "$999.00",
        "productOffPercent": "-20%",
        "productParent": "Machines - LINEA",
        "productGroup": "Commercial Machine"

    },
    {
        "productCode": "HSO567",
        "productName": "Part5",
        "productFamily": "Espresso Machines",
        "productActualPrice": "$1199.00",
        "productOfferPrice": "$999.00",
        "productOffPercent": "-20%",
        "productParent": "Machines - Espresso",
        "productGroup": "Commercial Machine"

    },
    {
        "productCode": "HSO567",
        "productName": "Part6",
        "productFamily": "Espresso Machines",
        "productActualPrice": "$1199.00",
        "productOfferPrice": "$999.00",
        "productOffPercent": "-20%",
        "productParent": "Machines - Espresso",
        "productGroup": "Commercial Machine"


    }
]
function itemIdExists(id, arr) {
    return arr.some(function(el) {
        return el.item_id === id;
    });
}


function removeFunction(id){
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
        removeFavourite(id, onResponse, onError);
}
function addFunction(id){
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
        addFavourite(id, onResponse, onError);
}  


async function showCarouselPartsProducts(parts, cart) {
    var favouriteItemList = []
    var onError = function(error) {
        notifyError("Failed to Added Favourite Item");
    };
    var onResponse = function(response) {
        if (response.data.status == true) {
            Array.prototype.push.apply(favouriteItemList, response.data.favorite.data)
        } else {
            notifyError(response.data.message);
        }
    };
    listFavourite(onResponse, onError);
     var getFavouriteItemList = favouriteItemList
    console.log("carousel parts : ", parts)

    console.log("cart : ", cart)

    var recommendedProductsHTMLS = ""

    for (i = 0; i < parts.length; i++) {



        recommendedProductsHTMLS += '<div class="single_product" style="height:auto">'
        recommendedProductsHTMLS += '<div class="product_content">'
        recommendedProductsHTMLS += '<h5><a style="font-size:small"> Part ' + parseInt(parts[i].part_ref_number) + '</a></h5>'
        recommendedProductsHTMLS += '<h3 style="height:10px"><a href="product-details.html?item=' + parts[i].item_id + '" style="text-transform: lowercase;"><i>' + parts[i]["item"]["code"] + '</i></a></h3>'
        recommendedProductsHTMLS += '<h3 style="height:40px"><a href="product-details.html?item=' + parts[i].item_id + '" style="text-transform: lowercase;"><strong>' + parts[i]["item"]["name"] + '</strong></a></h3>'
        if (cart.length > 0) {
            var cartItem = cart.filter(function(cartItem) { return cartItem.item_id == parts[i].item_id; });

            console.log("cartItem : ", cartItem)
            if (cartItem.length > 0) {
                recommendedProductsHTMLS += '<div class="quantity"><label>quantity </label><input id="inputQuantity_' + parts[i]["item_id"] + '" style="height:30px; width:100%" onchange="changeQuantity(' + parts[i].item_id + ',this.value)" min="1" max="100" value="' + cartItem[0].qty + '" type="number"><button class="button" id="btnAddToCart_' + parts[i]["item_id"] + '" onclick="funcAddToCart(' + parts[i]["item_id"] + ')" type="button" style="width:100%">added to cart</button></div>'
            } else {
                recommendedProductsHTMLS += '<div class="quantity"><label>quantity </label><input id="inputQuantity_' + parts[i]["item_id"] + '" style="height:30px; width:100%" onchange="changeQuantity(' + parts[i].item_id + ',this.value)" min="1" max="100" value="1" type="number"><button class="button" id="btnAddToCart_' + parts[i]["item_id"] + '" onclick="funcAddToCart(' + parts[i]["item_id"] + ')" type="button" style="width:100%">add to cart</button></div>'
            }
        } else {
            recommendedProductsHTMLS += '<div class="quantity"><label>quantity </label><input id="inputQuantity_' + parts[i]["item_id"] + '" style="height:30px; width:100%" onchange="changeQuantity(' + parts[i].item_id + ',this.value)" min="1" max="100" value="1" type="number"><button class="button" id="btnAddToCart_' + parts[i]["item_id"] + '" onclick="funcAddToCart(' + parts[i]["item_id"] + ')" type="button" style="width:100%">add to cart</button></div>'
        }
        recommendedProductsHTMLS += '</div>'
        recommendedProductsHTMLS += '<div class="product_thumb">'
        if (parts[i]["image"]["thumbnail"] != undefined) {

            recommendedProductsHTMLS += '<a class="primary_img" href="product-details.html?item=' + parts[i]["item_id"] + '"><img src="' + parts[i]["image"]["image"] + '" alt=""></a>'
        } else {
            recommendedProductsHTMLS += '<a class="primary_img" href="product-details.html?item=' + parts[i]["item_id"] + '"><img src="assets/img/lma_catalog_img.png" alt="" onerror="this.src=`assets/img/lma_catalog_img.png`;"></a>'
        } 
        var id = parts[i]["item_id"]
        console.log("id >>>>>>>>>>>>>>>>>>>>", Number(id))
        console.log("check if item exists : ",itemIdExists(Number(id), getFavouriteItemList) )
        if(Number(id)==375){

            console.log("getFavouriteItemList-------------------------------->>>>>>>",getFavouriteItemList)
        }
         if (itemIdExists(Number(id), getFavouriteItemList)) {
            recommendedProductsHTMLS += '<span  onclick=removeFunction("'+id+'")  value="' + parts[i]["item_id"] + '" id=' + parts[i]["item_id"] + '  ><img src="assets/img/Favorite/changed.jpg" style="width:50px;height:50px;"></span>'
        } else {
            recommendedProductsHTMLS += '<span   onclick=addFunction("'+id+'") value="' + parts[i]["item_id"] + '"  id=' + parts[i]["item_id"] + '  ><img src="assets/img/Favorite/favorite.jpg" style="width:50px;height:50px;"></span>'
        }

        recommendedProductsHTMLS += ''
        recommendedProductsHTMLS += '</div>'





        recommendedProductsHTMLS += '</div>'
    }

    $("#specialOffersProductsd").append(recommendedProductsHTMLS)



    var owl1 = $('.product_column3');
    owl1.trigger('destroy.owl.carousel');



    $('.product_column3').owlCarousel({
        autoplay: false,
        loop: false,
        nav: true,
        // autoplay: false,
        autoplayTimeout: 8000,
        items: 3,
        // margin:0,
        margin: 20,
        dots: false,
        navText: ['<i class="ion-ios-arrow-thin-left"></i>', '<i class="ion-ios-arrow-thin-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 2,
            },
            992: {
                items: 3,
            },


        }
    });

    // $('.owl-stage-outer .owl-stage').css('transform','translate3d(-375px, 0px, 0px)');
    $('.owl-stage-outer .owl-stage').css('transform', 'translate3d(-11%, 0px, 0px)');


    $('#Parts').click(function (e){
        var elm = $(this);
        var xPos = e.pageX - elm.offset().left;
        var yPos = e.pageY - elm.offset().top;

        console.log(">>>>>>>>>>>>>>>>>>",xPos, yPos);
        var clickedPart = sessionStorage.getItem("svg_path");
        console.log("you have clicked : ",clickedPart)
        // carousel.trigger('to.owl.carousel', index);

        var counter = 0

        for(m=0;m<parts.length;m++){
            if(clickedPart == parseInt(parts[m].part_ref_number)){

                var carousel = $("#specialOffersProductsd")
                carousel.trigger('to.owl.carousel', m+1);
                counter += 1
                $('#inputQuantity_' + parts[m]["item_id"]).css("background-color", "#fcfaad");
                break
            }
        }

        if(counter==0){
            alert("Not in stock")
        }

    });



}



function funcAddToCart(itemId) {

    const newQty = $("#inputQuantity_" + itemId).val();
    if (newQty > 0) {
        $("#btnAddToCart_" + itemId).html("Added to Cart");
        // if(!shoppingCart.itemExists(itemId)){
        //  shoppingCart.addItemToCart(itemId,i.name,999,newQty);
        // }else{
        //  shoppingCart.setCountForItem(itemId,newQty);
        // }

        shoppingCart.modify(itemId, newQty, function() { reloadMiniCart(); });
        // reloadMiniCart();
    } else {
        notifyError("Amount not valid!");
    }
}


function changeQuantity(itemId, quantity) {
    // if(shoppingCart.getItemFromCart(id)!=null){
    $("#btnAddToCart_" + itemId).html("Update")
    // }else{
    //  $("#btAddToCart").html("Update")
    // }
}







function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

var parentId;
var mainitemid;
// window.setTimeout( showSpecialOffersProducts(specialOffersItemList), 5000 )
// setTimeout(function(){

// },5000); 

// showSpecialOffersProducts(specialOffersItemList)
$(document).ready(function() {
    parentId = findGetParameter("parent");
    mainitemid = findGetParameter("mainitem");
    if (!parentId || !mainitemid) {
        notifyError("This item is not available");
    } else {
        // getMachineParentMapping(parentId,function(response1){
        getItemParentImages(parentId, mainitemid, function(response2) {
            const imageUrl = safeAccess(["data", "item_parent_images", "data", 0, "image", "image"], response2);
            const imageId = safeAccess(["data", "item_parent_images", "data", 0, "id"], response2);

            var onResponse = function(response) {

                var imageCOntent = response.data.item_parent_images.image.content;
                mainParts(imageCOntent);

                // return imageCOntent
                // Array.prototype.push.apply(favouriteItemList, imageCOntent)
                // showCarrouselParts(imageCOntent)
            }
            var onError = function(error) {}
            getSvgContent(imageId, onResponse, onError)

            showCarrouselParts(imageUrl, safeAccess(["data", "item_parent_images", "data"], response2));

            var onResp = function(resp) {
                // var cart = shoppingCart.listCart();
                var cart = safeAccess(['data', 'carts', 'data'], resp);
                showCarouselPartsProducts(safeAccess(["data", "item_parent_images", "data"], response2), cart)

            }
            cartList(onResp);


            $('.video-playlist-wrap.two-col .scroll-wrap').perfectScrollbar();

            $('.video-playlist-wrap').not('.two-col').find('.scroll-wrap').slick({
                slidesToShow: 6,
                responsive: [{
                        breakpoint: 980,
                        settings: {
                            slidesToShow: 4
                        }
                    },


                    {
                        breakpoint: 720,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });
        });
        // });

    }

    // $('#Parts').click(function (e){
    //     var elm = $(this);
    //     var xPos = e.pageX - elm.offset().left;
    //     var yPos = e.pageY - elm.offset().top;

    //     console.log(">>>>>>>>>>>>>>>>>>",xPos, yPos);
    //     var clickedPart = sessionStorage.getItem("svg_path");
    //     console.log("you have clicked : ",clickedPart)
    //     // carousel.trigger('to.owl.carousel', index);
    //     var carousel = $("#specialOffersProducts")
    //     carousel.trigger('to.owl.carousel', 3);

    //  });
    $(".add_Product").click(async function() {
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
    $(".remove_Product").click(async function() {
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

});

// $(document).ready(function() {
//     console.log(">>>>> : ", $('#mainItemImage').children('svg').children('g').children('g').children('g'))
//     $('#mainItemImage').children('svg').children('g').children('g').children('g').each(function(item) {
//         console.log("item : ", item)
//         // alert( $(this).attr('fill') );
//     })
//     // $('#mainItemImage').children('svg').children('path').each(function () {
//     //     alert( $(this).attr('fill') );
//     // });
//     console.log(document.querySelector('svg').querySelector('text').textContent)
// });



// window.addEventListener("load", findSVGElements, false);

// fetches the document for the given embedding_element
// function getSubDocument(embedding_element) {
//     if (embedding_element.contentDocument) {
//         return embedding_element.contentDocument;
//     } else {
//         var subdoc = null;
//         try {
//             subdoc = embedding_element.getSVGDocument();
//         } catch (e) {}
//         return subdoc;
//     }
// }

// $(window).load(function () {

//     //alert("Document loaded, including graphics and embedded documents (like SVG)");
//     var a = document.getElementById("alphasvg");

//     //get the inner DOM of alpha.svg
//     var svgDoc = a.contentDocument;

//     //get the inner element by id
//     var delta = svgDoc.getElementById("delta");
//     delta.addEventListener("mousedown", function(){ alert('hello world!')}, false);
// });



// function findSVGElements() {
//     var elms = document.querySelectorAll(".emb");
//     for (var i = 0; i < elms.length; i++) {
//         var subdoc = getSubDocument(elms[i])
//         if (subdoc)
//             subdoc.getElementById("svgbar").setAttribute("fill", "lime");
//     }
// }