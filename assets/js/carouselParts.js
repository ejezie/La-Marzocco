
var parts = ["STEAM WAND BODY","ASSEMBLY COPPER WASHER","SHAFT GASKET","STEAM SHAFT WITH GASKET","STEAM SHAFT SPRING",
                "SHAFT BUSHING","SHAFT VITON O-RING","LARGE PITCH VALVE SHAFT"]



function toItemDetailsPage(itemId){
    window.location.href ='product-details.html?item='+itemid;
}



async function showCarrouselParts(parts){
    if(!parts){
        notifyError("Failed to load parts");
        return;
    }
    var carouselHTML = ""

    carouselHTML += '<div class="player-wrap" >'
    carouselHTML += '<div class="fluid-ratio-wrap">'
    carouselHTML += '<div class="fluid-ratio-inner">'
    carouselHTML += '<img class="img-responsive" src="https://d1ekp87k3th824.cloudfront.net/media/wysiwyg/Diagrams/la-marzocco-linea-steam-valve.jpg">'
    carouselHTML += '</div>'
    carouselHTML += '</div>'
    carouselHTML += '</div>'

    carouselHTML += '<div class="playlist-wrap" style="padding-top: inherit;">'
    carouselHTML += '<ul class="remove-bullets scroll-wrap">'

    for(i=0; i<parts.length;i++){
        const part = parts[i];
        carouselHTML += '<li class="playlist-item onclick="toItemDetailsPage('+safeAccess(["id"],part)+')">'
        carouselHTML += '<div class="thumb">'
        // carouselHTML += '<img class="img-responsive" src="https://d1ekp87k3th824.cloudfront.net/media/wysiwyg/Diagrams/la-marzocco-linea-steam-valve.jpg">'

        carouselHTML += '<div class="fluid-ratio-wrap">'
        carouselHTML += '<div class="fluid-ratio-inner"></div>'
        carouselHTML += '</div>'
        carouselHTML += '</div>'
        carouselHTML += '<div class="details">'+(i+1)+". " +safeAccess(["name"],part)+'</div>'
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

$(document).ready(function(){
   parentId = findGetParameter("parent")
        if(!parentId){
            notifyError("This item is not available");
        }else{
           getItemParentImages(parentId,function(response){
                   showCarrouselParts(safeAccess(["data","item_parent_images","data"],response));
           });
    }
});



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

