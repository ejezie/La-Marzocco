
var parts = ["STEAM WAND BODY","ASSEMBLY COPPER WASHER","SHAFT GASKET","STEAM SHAFT WITH GASKET","STEAM SHAFT SPRING",
                "SHAFT BUSHING","SHAFT VITON O-RING","LARGE PITCH VALVE SHAFT"]



function toitemdetailpage(itemId){
    const newUrl = 'product-details.html?item='+itemId;
    window.location = newUrl, true;
}


// https://d1ekp87k3th824.cloudfront.net/media/wysiwyg/Diagrams/la-marzocco-linea-steam-valve.jpg

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
        const part = parts[i];
        carouselHTML += '<li class="playlist-item" onclick="toitemdetailpage('+safeAccess(["id"],part)+')">'
        carouselHTML += '<div class="thumb">'
        carouselHTML += '<span class="label_sale">'+part.part_ref_number+'</span>'
        // carouselHTML += '<img class="img-responsive" src="https://d1ekp87k3th824.cloudfront.net/media/wysiwyg/Diagrams/la-marzocco-linea-steam-valve.jpg">'

        carouselHTML += '<div class="fluid-ratio-wrap">'
        carouselHTML += '<div class="fluid-ratio-inner"></div>'
        carouselHTML += '</div>'
        carouselHTML += '</div>'
        carouselHTML += '<div class="details">'+part.part_ref_number+" " +safeAccess(["item","name"],part)+'</div>'
        carouselHTML += '</li>'
    }
    carouselHTML += ' <li class="playlist-item more">'
    // carouselHTML += ' <a href="#">See More</a>'
    carouselHTML += ' </li>'


    carouselHTML += '</ul>'
    carouselHTML += '</div>'

    $("#carouselParts").append(carouselHTML);
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


