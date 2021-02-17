
var parts = ["STEAM WAND BODY","ASSEMBLY COPPER WASHER","SHAFT GASKET","STEAM SHAFT WITH GASKET","STEAM SHAFT SPRING",
                "SHAFT BUSHING","SHAFT VITON O-RING","LARGE PITCH VALVE SHAFT"]



function toitemdetailpage(itemId){
    const newUrl = 'product-details.html?item='+itemId;
    window.location = newUrl, true;
}


// https://d1ekp87k3th824.cloudfront.net/media/wysiwyg/Diagrams/la-marzocco-linea-steam-valve.jpg


function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

async function showCarrouselParts(imageUrl,parts){
    if(!parts){
        notifyError("Failed to load parts");
        return;
    }
    var carouselHTML = ""

    carouselHTML += '<div class="player-wrap" >'
    carouselHTML += '<div class="fluid-ratio-wrap">'
    carouselHTML += '<div class="fluid-ratio-inner">'
    carouselHTML += '<img class="img-responsive" src="'+imageUrl+'">'
    carouselHTML += '</div>'
    carouselHTML += '</div>'
    carouselHTML += '</div>'

    carouselHTML += '<div class="playlist-wrap" style="padding-top: inherit;">'
    carouselHTML += '<ul class="remove-bullets scroll-wrap">'


    // for(i=0; i<parts.length;i++){
    //     // var parts = sortByKey(parts,part_ref_number)

    //     console.log("parts : ", parts)
    //     const part = parts[i];
    //     // console.log("part >>>>>> : ", part)
    //     carouselHTML += '<li class="playlist-item" href="#" onclick="toitemdetailpage('+safeAccess(["item_id"],part)+')"><a href="#">'
    //     carouselHTML += '<div class="thumb">'
    //     // carouselHTML += '<span style="  padding: 0 10px;border-radius: 2px;text-transform: capitalize;font-size: 16px;font-weight: 500;text-align: center;display: inline-block;" class="label_sale">'+parseInt(part.part_ref_number)+'</span>'
    //     // carouselHTML += '<img class="img-responsive" src="https://d1ekp87k3th824.cloudfront.net/media/wysiwyg/Diagrams/la-marzocco-linea-steam-valve.jpg">'

    //     carouselHTML += '<div class="fluid-ratio-wrap">'
    //     // carouselHTML += '<div class="fluid-ratio-inner"><span style="background-color:#414141; color:#fff; padding:4px; font-weight:bold;">'+parseInt(part.part_ref_number)+'</span></div>'
    //     // carouselHTML += '<div class="fluid-ratio-inner" style="-webkit-border-radius:100px;"><span style="position:absolute; margin-left:20px; margin-right:10px ;color:#000; padding:4px; font-weight:bold;">'+safeAccess(["item","name"],part)+'</span></div>'
    //     carouselHTML += '<div class="fluid-ratio-inner" style="background:#414141; border:1px solid #ccc;"><p style=" margin:10px auto ;color:#fff; font-weight:bold;  text-align:center">'+safeAccess(["item","name"],part)+'</p></div>'
    //     // carouselHTML += '<div class="fluid-ratio-inner"><span >'+safeAccess(["item","name"],part)+'</span></div>'

    //     console.log("part : ",part)
    //     console.log("part.part_ref_number : ",part.part_ref_number)
    //     carouselHTML += '</div>'
    //     carouselHTML += '</div>'
    //     // carouselHTML += '<div class="details">'+safeAccess(["item","name"],part)+'</div>'
    //     carouselHTML += '<div class="details" style="text-align:center">'+parseInt(part.part_ref_number)+'</div>'
    //     carouselHTML += '</a></li>'
    // }
    carouselHTML += ' <li class="playlist-item more">'
    // carouselHTML += ' <a href="#">See More</a>'
    carouselHTML += ' </li>'


    carouselHTML += '</ul>'
    carouselHTML += '</div>'


    $("#carouselParts").append(carouselHTML);
}




var specialOffersItemList = [{
                                "productCode" : "HSO567",
                                "productName" : "Part1",
                                "productFamily" : "Espresso Machines",
                                "productActualPrice" : "$1199.00",
                                "productOfferPrice" : "$999.00",
                                "productOffPercent" : "-20%",
                                "productParent" : "Machines - LINEA",
                                "productGroup" : "Commercial Machine"


                            },
                            {
                                "productCode" : "HSO567",
                                "productName" : "Part2",
                                "productFamily" : "Espresso Machines",
                                "productActualPrice" : "$1199.00",
                                "productOfferPrice" : "$999.00",
                                "productOffPercent" : "-20%",
                                "productParent" : "Machines - Espresso",
                                "productGroup" : "Commercial Machine"

                            },
                            {
                                "productCode" : "HSO567",
                                "productName" : "Part3",
                                "productFamily" : "Espresso Machines",
                                "productActualPrice" : "$1199.00",
                                "productOfferPrice" : "$999.00",
                                "productOffPercent" : "-20%",
                                "productParent" : "Machines - Espresso",
                                "productGroup" : "Commercial Machine"

                            },
                            {
                                "productCode" : "HSO567",
                                "productName" : "Part4",
                                "productFamily" : "Espresso Machines",
                                "productActualPrice" : "$1199.00",
                                "productOfferPrice" : "$999.00",
                                "productOffPercent" : "-20%",
                                "productParent" : "Machines - LINEA",
                                "productGroup" : "Commercial Machine"

                            },
                            {
                                "productCode" : "HSO567",
                                "productName" : "Part5",
                                "productFamily" : "Espresso Machines",
                                "productActualPrice" : "$1199.00",
                                "productOfferPrice" : "$999.00",
                                "productOffPercent" : "-20%",
                                "productParent" : "Machines - Espresso",
                                "productGroup" : "Commercial Machine"

                            },
                            {
                                "productCode" : "HSO567",
                                "productName" : "Part6",
                                "productFamily" : "Espresso Machines",
                                "productActualPrice" : "$1199.00",
                                "productOfferPrice" : "$999.00",
                                "productOffPercent" : "-20%",
                                "productParent" : "Machines - Espresso",
                                "productGroup" : "Commercial Machine"


                            }
                        ]


async function showCarouselPartsProducts(parts, cart){

    console.log("carousel parts : ", parts)
    console.log("cart : ", cart)

    var recommendedProductsHTML = ""

    for(i=0 ; i<parts.length ;i++){

   

        recommendedProductsHTML += '<div class="single_product" style="height:auto">'
        recommendedProductsHTML += '<div class="product_content">'
        recommendedProductsHTML += '<h5><a style="font-size:small"> Part '+parseInt(parts[i].part_ref_number)+'</a></h5>'
        recommendedProductsHTML += '<h3 style="height:10px"><a href="product-details.html?item='+parts[i].item_id+'" style="text-transform: lowercase;"><i>'+parts[i]["item"]["code"]+'</i></a></h3>'
        recommendedProductsHTML += '<h3 style="height:40px"><a href="product-details.html?item='+parts[i].item_id+'" style="text-transform: lowercase;"><strong>'+parts[i]["item"]["name"]+'</strong></a></h3>'
        // recommendedProductsHTML += '<div class="product_ratings">'
        // recommendedProductsHTML += '<ul>'
        // recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
        // recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
        // recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
        // recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
        // recommendedProductsHTML += '<li><a href="#"><i class="ion-star"></i></a></li>'
        // recommendedProductsHTML += '</ul>'
        // recommendedProductsHTML += '</div>'
        // recommendedProductsHTML += '<h5><a>'+safeAccess(["code"],item)+'</a></h5>'
        // recommendedProductsHTML += '<h5><a>'+safeAccess(["item_group","desc"],item)+'</a></h5>'
        // recommendedProductsHTML += '<h5><a>'+safeAccess(["item_family",0,"code"],item)+'</a></h5>'

        // recommendedProductsHTML += '<div class="price_box">'
        // recommendedProductsHTML += '<span class="regular_price">'+recommendedProductsArray[i]["productPrice"]+'</span>'
        // recommendedProductsHTML += '</div>'
        if(cart.length > 0){
            var cartItem = cart.filter(function(cartItem){return cartItem.item_id == parts[i].item_id;});

            console.log("cartItem : ", cartItem)
            if(cartItem.length > 0){
                recommendedProductsHTML += '<div class="quantity"><label>quantity </label><input id="inputQuantity_'+parts[i]["item_id"]+'" style="height:30px; width:100%" onchange="changeQuantity('+parts[i].item_id+',this.value)" min="1" max="100" value="'+cartItem[0].qty+'" type="number"><button class="button" id="btnAddToCart_'+parts[i]["item_id"]+'" onclick="funcAddToCart('+parts[i]["item_id"]+')" type="button" style="width:100%">added to cart</button></div>'
            }else {
                recommendedProductsHTML += '<div class="quantity"><label>quantity </label><input id="inputQuantity_'+parts[i]["item_id"]+'" style="height:30px; width:100%" onchange="changeQuantity('+parts[i].item_id+',this.value)" min="1" max="100" value="1" type="number"><button class="button" id="btnAddToCart_'+parts[i]["item_id"]+'" onclick="funcAddToCart('+parts[i]["item_id"]+')" type="button" style="width:100%">add to cart</button></div>'
            }
        }else{
            recommendedProductsHTML += '<div class="quantity"><label>quantity </label><input id="inputQuantity_'+parts[i]["item_id"]+'" style="height:30px; width:100%" onchange="changeQuantity('+parts[i].item_id+',this.value)" min="1" max="100" value="1" type="number"><button class="button" id="btnAddToCart_'+parts[i]["item_id"]+'" onclick="funcAddToCart('+parts[i]["item_id"]+')" type="button" style="width:100%">add to cart</button></div>'
        }
        recommendedProductsHTML += '</div>'
        recommendedProductsHTML += '<div class="product_thumb">'
        if(parts[i]["image"]["thumbnail"] != undefined){

            recommendedProductsHTML += '<a class="primary_img" href="product-details.html?item='+parts[i]["item_id"]+'"><img src="'+parts[i]["image"]["image"]+'" alt=""></a>'
        }else{
            recommendedProductsHTML += '<a class="primary_img" href="product-details.html?item='+parts[i]["item_id"]+'"><img src="assets/img/lma_catalog_img.png" alt="" onerror="this.src=`assets/img/lma_catalog_img.png`;"></a>'
        }
        recommendedProductsHTML += '</div>'





        recommendedProductsHTML += '</div>'
    }

    $("#specialOffersProducts").append(recommendedProductsHTML)



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
        margin:20,
        dots:false,
        navText: ['<i class="ion-ios-arrow-thin-left"></i>','<i class="ion-ios-arrow-thin-right"></i>'],
        responsiveClass:true,
        responsive:{
                0:{
                items:1,
            },
            500:{
                items:2,
            },
            992:{
                items:3,
            },
            

          }
    });

    $('.owl-stage-outer .owl-stage').css('transform','translate3d(-375px, 0px, 0px)');

}



function funcAddToCart(itemId){

    const newQty = $("#inputQuantity_"+itemId).val();
    if(newQty>0){
        $("#btnAddToCart_"+itemId).html("Added to Cart");
        // if(!shoppingCart.itemExists(itemId)){
        //  shoppingCart.addItemToCart(itemId,i.name,999,newQty);
        // }else{
        //  shoppingCart.setCountForItem(itemId,newQty);
        // }

        shoppingCart.modify(itemId,newQty,function(){reloadMiniCart();});
        // reloadMiniCart();
    }else{
        notifyError("Amount not valid!");
    }
}


function changeQuantity(itemId,quantity){
        // if(shoppingCart.getItemFromCart(id)!=null){
            $("#btnAddToCart_"+itemId).html("Update")
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
        .forEach(function (item) {
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
$(document).ready(function(){
   parentId = findGetParameter("parent");
   mainitemid = findGetParameter("mainitem");
        if(!parentId || !mainitemid){
            notifyError("This item is not available");
        }else{
           // getMachineParentMapping(parentId,function(response1){
                getItemParentImages(parentId,mainitemid,function(response2){
                   const imageUrl = safeAccess(["data","item_parent_images","data",0,"image","image"],response2);
                   showCarrouselParts(imageUrl,safeAccess(["data","item_parent_images","data"],response2));

                 var onResp = function(resp){
                    // var cart = shoppingCart.listCart();
                    var cart = safeAccess(['data','carts','data'],resp);
                    showCarouselPartsProducts(safeAccess(["data","item_parent_images","data"],response2), cart)

                }
                cartList(onResp);

                    
                $('.video-playlist-wrap.two-col .scroll-wrap').perfectScrollbar();

                $('.video-playlist-wrap').not('.two-col').find('.scroll-wrap').slick({
                  slidesToShow: 6,
                  responsive: [
                  {
                    breakpoint: 980,
                    settings: {
                      slidesToShow: 4 } },


                  {
                    breakpoint: 720,
                    settings: {
                      slidesToShow: 2 } }] });
               });
           // });
           
    }
});






