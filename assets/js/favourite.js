
$(document).ready(function() {

    var onError = function(error) {
        notifyError("Failed to Added Favourite Item");
    };
    var onResponse = function(response) {
        if (response.data.status == true) {
            var data = response.data.favorite.data;
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> vbnm,.", data)
            favoriteDisplay(data)
            //    $('#pagination-container').pagination({
            //         items: response.data.mapping.total,
            //         itemsOnPage: itemsPerPage,
            //         cssStyle: 'dark-theme',
            //         onPageClick: function(pageNo){
            //             currentPage = pageNo;
            //             obj.loadResults();
            //     }
            // });
        } else {
            notifyError(response.data.message);
        }
    };
    listFavourite(onResponse, onError);
});
async function favoriteDisplay(data) {
    if (data.length === 0) {
        console.log("Empty***")
          $("#resultsGrid").html("Favourite Item Not Found");
    } else {
    var catalogHTML = ""
        for(i=0; i<data.length; i++){

                catalogHTML += '<div class="col-lg-4 col-md-4 col-12 ">'
                catalogHTML += '<div class="single_product">'
                catalogHTML += '<div class="product_name grid_name">'
                catalogHTML += '<h3><strong><a  style="text-transform: lowercase;">'+data[i]["item"]["name"]+'</a></strong></h3>'
                catalogHTML += '<p style="opacity:1;">'+data[i]["item"]["code"]+'</p>'
                catalogHTML += '</div>'
                catalogHTML += '<div class="product_thumb">'
                catalogHTML += '<img src="assets/img/lma_catalog_img.png" />';
                catalogHTML += '<div class="label_product">'
                catalogHTML += '</div>'
                catalogHTML += '<div class="action_links">'
                catalogHTML += '<ul>'
                catalogHTML += '</ul>'
                catalogHTML += '</div>'
                catalogHTML += '</div>'
                catalogHTML += '<div class="product_content grid_content">'
                catalogHTML += '<div class="content_inner">'
                catalogHTML += '<div class="product_footer d-flex align-items-center">'
                catalogHTML += '<div class="price_box">'
                catalogHTML += '<span class="current_price">'+data[i]["item"]["price"]+'</span>'
                var id =data[i]["item_id"]
                catalogHTML += '<span class="deleteFavorite" onclick="myFunction(' +id+ ')" value="' +id+ '" style="float:right"  ><img src="assets/img/Favorite/changed.jpg" style="width:25px;height:25px;float:right"></span>'
                catalogHTML += '</div>'
                catalogHTML += '</div>'
                catalogHTML += '</div>'
                catalogHTML += '</div>'
                catalogHTML += ''
                catalogHTML += '<div class="product_content list_content">'
                catalogHTML += '<div class="left_caption" style="width:300px">'
                catalogHTML += '<div class="product_name">'
                catalogHTML += '<h3><a href="product-details.html">'+data[i]["item"]["name"]+'</a></h3>'
                catalogHTML += '<h3><a href="product-details.html">'+data[i]["item"]["code"]+'</a></h3>'
                catalogHTML += '</div>'
                catalogHTML += ''
                catalogHTML += '<div class="product_desc">'
                catalogHTML += '</div>'
                catalogHTML += '</div>'
                catalogHTML += '<div class="right_caption">'    
                catalogHTML += '<div class="price_box">'
                catalogHTML += '<span class="current_price">'+data[i]["item"]["price"]+'</span>'
                catalogHTML += '<span class="deleteFavorite" onclick="myFunction("+id+")" value="' +data[i]["item_id"]+ '" style="float:right"  ><img src="assets/img/Favorite/changed.jpg" style="width:25px;height:25px;float:right"></span>'
                catalogHTML += '</div>'
                catalogHTML += '<div class="action_links_btn">'
                catalogHTML += '<ul>'
                catalogHTML += '</ul>'
                catalogHTML += '</div>'
                catalogHTML += '</div>'
                catalogHTML += '</div>'
                catalogHTML += '</div>'
                catalogHTML += '</div>'
            }
            $("#resultsGrid").html("")
            $("#resultsGrid").html(catalogHTML);
    }

}
   

 function myFunction(id){
    
    var onError = function(error) {
            notifyError("Failed to Added Removed Item");
    };
    var onResponse = function(response) {
        if (response.data.status == true) {
                notifySuccess("Favourite Item Removed Successfully");
                window.location.reload();
        }else{
            notifyError(response.data.message);
        }
        };
    removeFavourite(id, onResponse, onError);
 }  