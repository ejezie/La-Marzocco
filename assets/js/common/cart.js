// <script src="https://unpkg.com/cart-localstorage@1.1.2/dist/cart-localstorage.min.js" type="text/javascript"></script>


//https://raw.githubusercontent.com/soggybag/Shopping-Cart-js/master/js/shoppingCart.js
// ***************************************************
// Shopping Cart functions

var shoppingCart = (function () {
    // Private methods and properties
    var cart = [];

    function Item(id,productId,name, price, count) {
        this.id = id
        this.productId = productId
        this.name = name
        this.price = price
        this.count = count
    }

    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (cart === null) {
            cart = []
        }
    }

    loadCart();


    // Public methods and properties
    var obj = {};



    obj.syncCart =  function (callback) {
        cartList(function(response){
                    // console.log("cart list resp")

        shoppingCart.clearCart();
        // console.log("cart cleared")
        var serverCart = safeAccess(['data','carts','data'],response,[]);
          for(cartItem of serverCart){
            var item  =new Item(
                     cartItem.id,
                    cartItem.item_id,
                   safeAccess(["item","name"],cartItem,"-"),
                    safeAccess(["price"],cartItem,"-"),
                    cartItem.qty
                )

            cart.push(item);
                    // console.log("cart item push "+item.id)

          }
                  // console.log("cart saving")

           saveCart();
                   // console.log("cart saved")

            // reloadMiniCart();
            callback();
  })
    }


    obj.getItem =  function (productId) {
        console.log("getItem "+productId);
           for (var i in cart) {
                if (cart[i].productId == productId) {
                return cart[i];
            }
        }
        console.log("getItem not found");
        return null;
    }

    obj.getCartId =  function (productId) {
        var existing = obj.getItem(productId);

        if(existing){
            return existing.id;
        }else{
            // alert("not exist")
        }
    }

    obj.sync =  function () {
        console.log("Syncing ")

        cartList(function(res){
            var syncCount = 0;

            cart = [];
            saveCart();
            for(cartItem of res.data.carts.data){
                const existing = obj.getItem(cartItem.item_id);
                if(existing){

                }else{
                    var item = new Item(cartItem.id,cartItem.item_id,null, null, cartItem.qty);
                        cart.push(item);
                        syncCount++;
                }
            }
            saveCart();
            reloadMiniCart();
            console.log("Synced "+syncCount)

        })
    }

    obj.modify = function (productId,quantity,callback) {
         var existing = obj.getItem(productId);

         if(!existing && quantity == 0){
            //Wants to delete but saved item not available

         }
        if (existing) {
              if (quantity == 0) {
                notifyInfo("Deleting item");
                //("Deleting "+varient.getId());
                var onResponse = function(response){ 
                  //   for (var i in cart) {
                  //   if (cart[i].id.valueOf() == existing.id.valueOf()) { 
                  //           cart.splice(i, 1);
                            // saveCart();
                            // callback();
                  //           break;
                  //   }

                  // }
                  cart = cart.filter(function(el) { return el != existing });
                            saveCart();
                            if(callback){callback();} 
                $("#cart_quantity").val(cart.length);

              }
                    cartDeleteItem(existing.id,onResponse);
            } else {
                 const cartItemId = existing.id;

                notifyInfo("Updating item");
                //("Updating "+quantity+" to "+varient.getId());
                    var onResponse = function(response){ 
                   
                    // for (var i in cart) {
                    //     if (cart[i].id === id) {
                    //         cart[i].count = count;
                    //         break;
                    //     }
                    // }   
                    //     saveCart();
                        callback();
                        $("#cart_quantity").val(cart.length);

                  };
                    // var onResponse = function(response){
                    //     // var cart = shoppingCart.listCart();
                    //     var cart = safeAccess(['data','carts','data'],response);
                    //     for (i in cart){
                    //         console.log("test : ", cart[i].item_id , cartItemId)
                    //         if(cart[i].id == cartItemId){
                    //             var current_qty = cart[i].qty
                    //             var new_qty = Number(current_qty) + Number(quantity)
                                var onResponse = function(response){ 
                                   
                                    // for (var i in cart) {
                                    //     if (cart[i].id === id) {
                                    //         cart[i].count = count;
                                    //         break;
                                    //     }
                                    // }   
                                    //     saveCart();
                                        callback();
                                        $("#cart_quantity").val(cart.length);

                                  };
                                // cartUpdateItem(cartItemId,new_qty,null,null,onResponse);
                                cartUpdateItem(cartItemId,quantity,null,null,onResponse);
                    //         }
                    //     }

                    // }
                    // cartList(onResponse);


            }  
        } else {
            notifyInfo("Adding item");
                var onResponse = function(response){ 
                    const cartItemId = parseInt(safeAccess(["data","cart","id"],response));
                    if(cartItemId){
                        var item = new Item(parseInt(cartItemId),parseInt(productId),null, null, parseInt(quantity));
                        cart.push(item);
                        saveCart();
                        reloadMiniCart()
                        callback();
                        $("#cart_quantity").val(cart.length);
                    }else{
                        console.log("nocartid")
                    }
              };
                cartAddItem(productId,quantity,null,null,onResponse);    
        }
    }

    obj.getQty = async function (productId) {
        var item = obj.getItem(productId);
        return item === null?0:item.count;
    }





    obj.addItemToCart = async function (id,name, price, count) {

        var onResponse = function(response){ 
            for (var i in cart) {
                if (cart[i].id === id) {
                    cart[i].count += count;
                    saveCart();
                    return;
                }
            }
            var item = new Item(id,name, price, count);
            cart.push(item);
            saveCart();
            reloadMiniCart()
      };
      var onError =function(error){
        notifyError("Failed to add item");
      };
       await cartAddItem(id,count,null,null,onResponse,onError);
    };


	obj.itemExists = function (id) {
			for (var i in cart) {
	            if (cart[i].productId === Number(id)) {
	                alert("true")
                    return true;
	            }
	        }
	        return false;
	};

	obj.getItemFromCart = function (id) {
	        for (var i in cart) {
	            if (cart[i].id === id) {
	                return cart[i];
	            }
	        }
	    };				


	obj.getCountForItem = function (id) {
	        for (var i in cart) {
	            if (cart[i].id === id) {
	                return cart[i].count;
	            }
	        }
	        return 0;
	    };				


    obj.setCountForItem = function (id, count) {
        
        var onResponse = function(response){ 
           for (var i in cart) {
            if (cart[i].id === id) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
        reloadMiniCart()
      };
      var onError =function(error){
        // notifyError("Failed to up item");
      };
        cartUpdateItem(id,count,null,null,onResponse,onError);
    };


    obj.removeItemFromCart = function (id,onSuccess) { 
        var onResponse = function(response){ 
           for (var i in cart) {
            if (cart[i].id.valueOf() == id.valueOf()) { 
                    cart.splice(i, 1);
                break;
            }
        }
        saveCart();
        onSuccess();
      };
      var onError =function(error){
        // notifyError("Failed to up item");
      };
        cartDeleteItem(id,onResponse,onError);
    };
        


    obj.removeItemFromCartAll = function (id) { // removes all item name
        for (var i in cart) {
            if (cart[i].id === id) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };


    obj.clearCart = function () {
        cart = [];
        saveCart();
    }


    obj.countCart = function () { // -> return total count
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count;
        }

        return totalCount;
    };

    obj.totalCart = function () { // -> return total cost
        var totalCost = 0;
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;
        }
        return totalCost.toFixed(2);
    };

    obj.listCart = function () { // -> array of Items
        var cartCopy = [];
        console.log("Listing cart");
        console.log(cart);
        for (var i in cart) {
            console.log(i);
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    // ----------------------------
    return obj;
})();





