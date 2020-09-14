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
		var cart = shoppingCart.listCart();
		showMiniCart(cart,cartSubtotal);
}

async function showMiniCart(cartItems,cartSubtotal){
	var miniCartHTML = ''



	for(i=0; i<cartItems.length;i++){

		miniCartHTML += '<div class="cart_item">'
		miniCartHTML += '<div class="cart_img">'
		miniCartHTML += '<a href="#"><img src="assets/img/s-product/product2.jpg" alt=""></a>'
		miniCartHTML += '</div>'
		miniCartHTML += '<div class="cart_info">'
		miniCartHTML += '<a href="#">'+cartItems[i]["name"]+'</a>'
		miniCartHTML += '<span class="quantity">Qty: '+cartItems[i]["count"]+'</span>'
		miniCartHTML += '<span class="price_cart"> $'+cartItems[i]["price"]+'</span>'
		miniCartHTML += '</div>'
		miniCartHTML += '<div class="cart_remove">'
		miniCartHTML += '<a onclick="removeItem('+cartItems[i]["id"]+')" ><i class="ion-android-close"></i></a>'
		miniCartHTML += '</div>'
		miniCartHTML += '</div>'
	}

	miniCartHTML += '<div class="mini_cart_table">'
	miniCartHTML += '<div class="cart_total">'
	miniCartHTML += '<span>Sub total:</span>'
	miniCartHTML += '<span class="price">'+cartSubtotal["subTotal"]+'</span>'
	miniCartHTML += '</div>'
	miniCartHTML += '<div class="cart_total mt-10">'
	miniCartHTML += '<span>total:</span>'
	miniCartHTML += '<span class="price">'+cartSubtotal["total"]+'</span>'
	miniCartHTML += '</div>'
	miniCartHTML += '</div>'

	miniCartHTML += '<div class="mini_cart_footer">'
	miniCartHTML += '<div class="cart_button">'
	miniCartHTML += '<a href="cart.html">View cart</a>'
	miniCartHTML += '</div>'
	miniCartHTML += '<div class="cart_button">'
	miniCartHTML += '<a class="active" href="checkout.html">Checkout</a>'
	miniCartHTML += '</div>'
	miniCartHTML += ''
	miniCartHTML += '</div>'



	$("#miniCart").append(miniCartHTML)
}

function removeItem(id){
	if(confirm("Remove this item "+ id +" ?")){
		shoppingCart.removeItemFromCart(id);
		reloadMiniCart();
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