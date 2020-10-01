// <script src="https://unpkg.com/cart-localstorage@1.1.2/dist/cart-localstorage.min.js" type="text/javascript"></script>


//https://raw.githubusercontent.com/soggybag/Shopping-Cart-js/master/js/shoppingCart.js
// ***************************************************
// Shopping Cart functions

var shoppingCart = (function () {
    // Private methods and properties
    var cart = [];

    function Item(id,name, price, count) {
        this.id = id
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

    obj.addItemToCart = function (id,name, price, count) {

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
      };
      var onError =function(error){
        notifyError("Failed to add item");
      };
        cartAddItem(id,count,null,null,onResponse,onError);
    };


	obj.itemExists = function (id) {
			for (var i in cart) {
	            if (cart[i].id === id) {
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




