// var cartItems = [
// 					{
// 						"productName" : "Leva s",
// 						"productQuantity" : "1",
// 						"productPrice" : "$1000"
// 					},
// 					{
// 						"productName" : "Linea Mini",
// 						"productQuantity" : "1",
// 						"productPrice" : "$980"
// 					}
// 				]
				


var cartSubtotal = {
						"subTotal" : "$1980",
						"total" : "$1980"
					}


function loadMiniCart(){
			var onResponse = function(response){
				// var cart = shoppingCart.listCart();
				var cart = safeAccess(['data','carts','data'],response);
				showMiniCart(cart,cartSubtotal);
				$("#cart_quantity").html(cart.length);

			}
			cartList(onResponse);
}

async function showMiniCart(cartItems,cartSubtotal){
	var miniCartHTML = ''

	// miniCartHTML += '<div class="mini_cart_footer">'
	// miniCartHTML += '<div class="cart_button">'
	// if(cartItems.length > 0){
	// 	miniCartHTML += '<a class="active" href="cart.html">GO TO CART</a>'
	// }
	// miniCartHTML += '</div>'
	// miniCartHTML += '</div>'

	for(i=0; i<cartItems.length;i++){

		const item  = cartItems[i];

		miniCartHTML += '<div class="cart_item">'
		miniCartHTML += '<div class="cart_img">'
		miniCartHTML += '<a href="#"><img src="assets/img/s-product/product2.jpg" alt=""></a>'
		miniCartHTML += '</div>'
		miniCartHTML += '<div class="cart_info">'
		miniCartHTML += '<a href="#">'+item.item["name"]+'</a>'
		miniCartHTML += '<span class="quantity">Qty: '+item["qty"]+'</span>'
		// miniCartHTML += '<span class="price_cart"> $'+safeAccess(["price"],item,"-")+'</span>'
		miniCartHTML += '</div>'
		miniCartHTML += '<div class="cart_remove">'
		miniCartHTML += '<a onclick="removeItem('+item["item_id"]+')" ><i class="fa fa-trash"></i></a>'
		// miniCartHTML += '<a onclick="removeItem('+item["item_id"]+')" ><i class="ion-android-close"></i></a>'
		miniCartHTML += '</div>'
		miniCartHTML += '</div>'
	}

	// miniCartHTML += '<div class="mini_cart_table">'
	// miniCartHTML += '<div class="cart_total">'
	// miniCartHTML += '<span>Sub total:</span>'
	// miniCartHTML += '<span class="price">'+cartSubtotal["subTotal"]+'</span>'
	// miniCartHTML += '</div>'
	// miniCartHTML += '<div class="cart_total mt-10">'
	// miniCartHTML += '<span>total:</span>'
	// miniCartHTML += '<span class="price">'+cartSubtotal["total"]+'</span>'
	// miniCartHTML += '</div>'
	// miniCartHTML += '</div>'



		// miniCartHTML +='<div class="btn-group">'
		// miniCartHTML += '<a class="active" id="btClearCart">EMPTY CART</a>'
		// if(cartItems.length>0){

		// miniCartHTML += '<div class="mini_cart_footer">'
		// miniCartHTML += '<div class="cart_button">'
		// miniCartHTML += '<a class="active" href="cart.html">GO TO CART</a>'

		// miniCartHTML += '</div>'
		// miniCartHTML += '</div>'
		// }
		// miniCartHTML += '</div>'

	
		miniCartHTML += '<div align="center">';
   		miniCartHTML += '<div class="row">';

	if(cartItems.length>0){

     	miniCartHTML += '<div class="col-md-6">';
		miniCartHTML += '<div class="mini_cart_footer">'
		miniCartHTML += '<div class="cart_button">'
		miniCartHTML += '<a class="active" id="btClearCart">EMPTY CART</a>'
		miniCartHTML += '</div>'
		miniCartHTML += '</div>'
     	miniCartHTML += '</div>';
     }


    	miniCartHTML += '<div class="col-md-6">';


		miniCartHTML += '<div class="mini_cart_footer">'
		miniCartHTML += '<div class="cart_button">'
  		miniCartHTML += '<a class="active" href="cart.html">GO TO CART</a>'
		miniCartHTML += '</div>'
		miniCartHTML += '</div>'

     	miniCartHTML += '</div>';
		miniCartHTML += '</div>';

	// if(cartItems.length>0){
		// miniCartHTML += '<div class="mini_cart_footer">'
		// miniCartHTML += '<div class="cart_button">'
  // 		miniCartHTML += '<a class="active" href="cart.html">GO TO CART</a>'
		// miniCartHTML += '</div>'
		// miniCartHTML += '</div>'
	// }

	// miniCartHTML += '<div class="cart_button">'
	// miniCartHTML += '<a class="active" href="checkout.html">Checkout</a>'
	// miniCartHTML += '</div>'
	miniCartHTML += ''
	miniCartHTML += '</div>'
	$("#miniCart").html("")
	$("#miniCart").append(miniCartHTML);
	$("#btClearCart").click(function(){
		emptyCart(cartItems);
	});

}


function emptyCart(cartItems){
	if(confirm("Delete all items from cart?")){
		var count = 0;
		for(cartitem of cartItems){
			shoppingCart.modify(cartitem.item_id,0,function(){
				count++;
				if(count==cartItems.length){
					location.reload()
				}
				notifySuccess("Item "+cartitem.item.name+" deleted")
			});
		}
		
	}
}


function removeItem(id){
	if(confirm("Remove this item from cart?")){
		shoppingCart.modify(id,0,function(){
			reloadMiniCart();
		});
	}
}

function reloadMiniCart(){
	$("#miniCart").html("");
		loadMiniCart();
}

$(document).ready(function(){
	loadMiniCart();
});
// showMiniCart(cartItems,cartSubtotal)