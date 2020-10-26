
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


    for(i=0; i<parts.length;i++){
        // var parts = sortByKey(parts,part_ref_number)

        console.log("parts : ", parts)
        const part = parts[i];
        // console.log("part >>>>>> : ", part)
        carouselHTML += '<li class="playlist-item" href="#" onclick="toitemdetailpage('+safeAccess(["item_id"],part)+')"><a href="#">'
        carouselHTML += '<div class="thumb">'
        // carouselHTML += '<span style="  padding: 0 10px;border-radius: 2px;text-transform: capitalize;font-size: 16px;font-weight: 500;text-align: center;display: inline-block;" class="label_sale">'+parseInt(part.part_ref_number)+'</span>'
        // carouselHTML += '<img class="img-responsive" src="https://d1ekp87k3th824.cloudfront.net/media/wysiwyg/Diagrams/la-marzocco-linea-steam-valve.jpg">'

        carouselHTML += '<div class="fluid-ratio-wrap">'
        // carouselHTML += '<div class="fluid-ratio-inner"><span style="background-color:#414141; color:#fff; padding:4px; font-weight:bold;">'+parseInt(part.part_ref_number)+'</span></div>'
        // carouselHTML += '<div class="fluid-ratio-inner" style="-webkit-border-radius:100px;"><span style="position:absolute; margin-left:20px; margin-right:10px ;color:#000; padding:4px; font-weight:bold;">'+safeAccess(["item","name"],part)+'</span></div>'
        carouselHTML += '<div class="fluid-ratio-inner" style="background:#414141; border:1px solid #ccc;"><p style=" margin:10px auto ;color:#fff; font-weight:bold;  text-align:center">'+safeAccess(["item","name"],part)+'</p></div>'
        // carouselHTML += '<div class="fluid-ratio-inner"><span >'+safeAccess(["item","name"],part)+'</span></div>'

        console.log("part : ",part)
        console.log("part.part_ref_number : ",part.part_ref_number)
        carouselHTML += '</div>'
        carouselHTML += '</div>'
        // carouselHTML += '<div class="details">'+safeAccess(["item","name"],part)+'</div>'
        carouselHTML += '<div class="details" style="text-align:center">'+parseInt(part.part_ref_number)+'</div>'
        carouselHTML += '</a></li>'
    }
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


async function showSpecialOffersProducts(specialOffersItemList){
    alert("Yes")

    var specialOffersProductsHTML = ""

    for(i=0 ; i<specialOffersItemList.length ;i++){

        specialOffersProductsHTML += '<div class="single_product">'
        specialOffersProductsHTML += '<div class="product_name">'
        specialOffersProductsHTML += '<h3><a href="product-details.html" style="text-transform: lowercase;"><strong>'+specialOffersItemList[i]["productName"]+'</strong></a></h3>'
        specialOffersProductsHTML += '<p class="manufacture_product"><a href="#" >'+specialOffersItemList[i]["productGroup"]+'</a></p>'
        specialOffersProductsHTML += '<p class="manufacture_product"><a href="#" >'+specialOffersItemList[i]["productParent"]+'</a></p>'
        specialOffersProductsHTML += '<p class="manufacture_product"><a href="#" >'+specialOffersItemList[i]["productFamily"]+'</a></p>'
        specialOffersProductsHTML += '</div>'
        specialOffersProductsHTML += '<div class="product_thumb">'
        specialOffersProductsHTML += '<a class="primary_img" href="product-details.html"><img src="assets/img/product/product19.jpg" alt=""></a>'
        specialOffersProductsHTML += '<a class="secondary_img" href="product-details.html"><img src="assets/img/product/product11.jpg" alt=""></a>'
        specialOffersProductsHTML += '<div class="label_product">'
        specialOffersProductsHTML += '<span  class="label_sale">'+specialOffersItemList[i]["productOffPercent"]+'</span>'
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
//     showSpecialOffersProducts(specialOffersItemList)

// },5000); 

                   // showSpecialOffersProducts(specialOffersItemList)
$(document).ready(function(){
   parentId = findGetParameter("parent");
   mainitemid = findGetParameter("mainitem");
        if(!parentId || !mainitemid){
            notifyError("This item is not available");
        }else{
           getMachineParentMapping(parentId,function(response1){
                getItemParentImages(parentId,mainitemid,function(response2){
                   const imageUrl = safeAccess(["data","machine_parent","image","image"],response1);
                   showCarrouselParts(imageUrl,safeAccess(["data","item_parent_images","data"],response2));



                    
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
           });
           
    }
});






