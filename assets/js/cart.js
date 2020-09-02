var cartItems = [
					{
						"productName" : "Leva s",
						"productQuantity" : "1",
						"productPrice" : "$1000"
					},
					{
						"productName" : "Linea Mini",
						"productQuantity" : "1",
						"productPrice" : "$980"
					}
				]

var cartSubTotal = {
						"subTotal" : "$1980",
						"total" : "$2000",
						"shipping" : "$20"
					}



async function showCart(cartItems){

	var cartHTML = ""


	cartHTML += '<table>'
	cartHTML += '<thead>'
	cartHTML += '<tr>'
	cartHTML += '<th class="product_remove">Delete</th>'
	cartHTML += '<th class="product_thumb">Image</th>'
	cartHTML += '<th class="product_name">Product</th>'
	cartHTML += '<th class="product-price">Price</th>'
	cartHTML += '<th class="product_quantity">Quantity</th>'
	cartHTML += '<th class="product_total">Total</th>'
	cartHTML += '</tr>'
	cartHTML += '</thead>'
	cartHTML += '<tbody>'

	for(i=0;i<cartItems.length;i++){

		cartHTML += '<tr>'
		cartHTML += '<td class="product_remove"><a href="#"><i class="fa fa-trash-o"></i></a></td>'
		cartHTML += '<td class="product_thumb"><a href="#"><img src="assets/img/s-product/product.jpg" alt=""></a></td>'
		cartHTML += '<td class="product_name"><a href="#">'+cartItems[i]["productName"]+'</a></td>'
		cartHTML += '<td class="product-price">'+cartItems[i]["productPrice"]+'</td>'
		cartHTML += '<td class="product_quantity"><label>Quantity</label> <input min="1" max="100" value="'+cartItems[i]["productQuantity"]+'" type="number"></td>'
		cartHTML += '<td class="product_total">'+cartItems[i]["productPrice"]+'</td>'
		cartHTML += '</tr>'


	}

	cartHTML += '</tbody>'
	cartHTML += '</table>'

	$("#cart").append(cartHTML)
}



async function showSubTotal(){

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


showCart(cartItems)
showSubTotal(cartSubTotal)