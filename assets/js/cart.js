// var cartItem = [
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

// var cartSubTotals = {
// 						"subTotal" : "$1980",
// 						"total" : "$2000",
// 						"shipping" : "$20"
// 					}



async function showCart(cartItems){

	var cartHTML = ""


	cartHTML += '<table>'
	cartHTML += '<thead>'
	cartHTML += '<tr>'
	cartHTML += '<th class="product_name">Product</th>'
	cartHTML += '<th class="product_thumb">Name</th>'
	cartHTML += '<th class="product-price">Price</th>'
	cartHTML += '<th class="product_quantity">Quantity</th>'
	// cartHTML += '<th class="product_remove">Delete</th>'
	cartHTML += '<th class="product_total">Total</th>'
	cartHTML += '</tr>'
	cartHTML += '</thead>'
	cartHTML += '<tbody>'

	for(i=0;i<cartItems.length;i++){
		// alert(JSON.stringify(cartItems[i],null,2);
		// console.log(cartItems[i]);
		cartHTML += '<tr>'
		cartHTML += '<td class="product_thumb"><a href="#"><img src="assets/img/s-product/product.jpg" alt=""></a></td>'
		cartHTML += '<td class="product_name"><a href="#">'+cartItems[i]["productName"]+'</a></td>'
		cartHTML += '<td class="product-price">'+cartItems[i]["productPrice"]+'</td>'
		cartHTML += '<td class="product_quantity"><label>Quantity</label> <input onchange="editQuantity('+cartItems[i]["productId"]+',this)" min="1" max="100" value="'+cartItems[i]["productQuantity"]+'" type="number"><a ><i onclick="deleteItem('+cartItems[i]["productId"]+')" class="fa fa-trash-o" style="width: 30px;font-size:17px"></i></a></td>'
		// cartHTML += '<td class="product_remove"><a href="#"><i class="fa fa-trash-o"></i></a></td>'
		cartHTML += '<td class="product_total">'+cartItems[i]["productPrice"]+'</td>'
		cartHTML += '</tr>'
	}

	cartHTML += '</tbody>'
	cartHTML += '</table>'

	$("#cart").append(cartHTML)
}


function deleteItem(itemid){
	if(confirm("Remove this item from cart?")){
		shoppingCart.removeItemFromCart(itemid);
	}
}

function editQuantity(itemid,e){
	shoppingCart.setCountForItem(itemid,e.value);
}

async function showSubTotal(cartSubTotal){

	var subTotalHTML = ''


	subTotalHTML += '<div class="col-lg-6 col-md-6">'
	subTotalHTML += '<div class="coupon_code right">'
	subTotalHTML += '<h3>Cart Totals</h3>'
	subTotalHTML += '<div class="coupon_inner">'
	subTotalHTML += '<div class="cart_subtotal">'
	subTotalHTML += '<p>Subtotal</p>'
	subTotalHTML += '<p class="cart_amount">'+cartSubTotal["subTotal"]+'</p>'
	subTotalHTML += '</div>'
	subTotalHTML += '<div class="cart_subtotal ">'
	subTotalHTML += '<p>Shipping</p>'
	subTotalHTML += '<p class="cart_amount"> '+cartSubTotal["shipping"]+'</p>'
	subTotalHTML += '</div>'
	// subTotalHTML += '<a href="#">Calculate shipping</a>'
	subTotalHTML += '<a href="#"></a>'
	subTotalHTML += ''
	subTotalHTML += '<div class="cart_subtotal">'
	subTotalHTML += '<p>Total</p>'
	subTotalHTML += '<p class="cart_amount">'+cartSubTotal["total"]+'</p>'
	subTotalHTML += '</div>'
	subTotalHTML += '<div class="checkout_btn">'
	subTotalHTML += '<a href="#">Proceed to Checkout</a>'
	subTotalHTML += '</div>'
	subTotalHTML += '</div>'
	subTotalHTML += '</div>'
	subTotalHTML += '</div>'


    $("#subTotal").append(subTotalHTML)


}

$(document).ready(function(){
	

	// shoppingCart.addItemToCart(22,"name", 80, 2)

	var cart = shoppingCart.listCart();

	var cartItems = [];
	for(cartItem of cart){
		var element = {
						"productId" : cartItem.id,
						"productName" : cartItem.name,
						"productQuantity" : cartItem.count,
						"productPrice" : cartItem.price
					}

		cartItems.push(element);
	}
	showCart(cartItems);
	var cartSubTotals = {
						"subTotal" : "$"+ shoppingCart.totalCart(),
						"total" :  "$"+shoppingCart.totalCart()+20,
						"shipping" : "$20"
					}
	showSubTotal(cartSubTotals);
	// console.log(cart);
});
