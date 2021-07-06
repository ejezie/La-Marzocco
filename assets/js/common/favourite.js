// <script src="https://unpkg.com/cart-localstorage@1.1.2/dist/cart-localstorage.min.js" type="text/javascript"></script>


//https://raw.githubusercontent.com/soggybag/Shopping-Cart-js/master/js/shoppingCart.js
// ***************************************************
// Item Favourite functions

var favourites = (function () {
    // Private methods and properties


    var obj = {};


    obj.addItemToFavourite = async function (id) {

        var onResponse = function(response){ 
            console.log(response)
      };
      var onError =function(error){
        notifyError("Failed to add item");
      };
       await addFavourite(id,onResponse,onError)
    };



    obj.removeItemFromFavourite = function (id) { 
        var onResponse = function(response){ 
          
            console.log(response)
         };
      var onError =function(error){
        // notifyError("Failed to up item");
      };
        removeFavourite(id,onResponse,onError);
    };
        

    obj.listFavouriteItems = async function () { 
         var onError =function(error){
            notifyError("Failed to Added Favourite Item");
        };
        var onResponse = function(response){
          // if(response.data.status == true){
          //   notifySuccess("Favourite Item Added Successfully");
          //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> vbnm,.", response.data.favorite.data)
          //   return response.data.favorite.data
          // }else{
          //   notifyError(response.data.message);
          // }
        };
        await listFavourite(onResponse,onError);
    };


    return obj;

})();





