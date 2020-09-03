var orderArr = [
					{
						"date" : "10th Jan 2020",
						"totalQuantity" : "2",
						"totalPrice" : "$1900",
						"status" : "Delivered",
						"orderDetails" : [
											{
												"productId" : "levas123",
												"productImage" : "",
												"productName" : "Leva s",
												"productQuantity" : "1",
												"productPrice" : "$900.00",
												"totalProductPrice" : "$900.00",

											},
											{
												"productId" : "levar123",
												"productImage" : "",
												"productName" : "Leva r",
												"productQuantity" : "1",
												"productPrice" : "$1000.00",
												"totalProductPrice" : "$1000.00",

											}
										]
					},
					{
						"date" : "20th Mar 2020",
						"totalQuantity" : "2",
						"totalPrice" : "$1700",
						"status" : "In Transit",
						"orderDetails" : [
											{
												"productId" : "lineamini123",
												"productImage" : "",
												"productName" : "Linea Mini",
												"productQuantity" : "1",
												"productPrice" : "$900.00",
												"totalProductPrice" : "$900.00",

											},
											{
												"productId" : "modbar123",
												"productImage" : "",
												"productName" : "Modbar",
												"productQuantity" : "1",
												"productPrice" : "$800.00",
												"totalProductPrice" : "$800.00",

											}
										]
					},
				]




async function showCart(cartItems){

	var cartHTML = ""


	cartHTML += '<table>'
	cartHTML += '<thead>'
	cartHTML += '<tr>'
	cartHTML += '<th class="product_name">Date</th>'
	cartHTML += '<th >Items</th>'
	cartHTML += '<th class="product_quantity">Quantity</th>'
	cartHTML += '<th class="product-price">Price</th>'
	// cartHTML += '<th class="product_remove">Delete</th>'
	cartHTML += '<th >Status</th>'
	cartHTML += '</tr>'
	cartHTML += '</thead>'
	cartHTML += '<tbody>'

	for(i=0;i<orderArr.length;i++){

		cartHTML += '<tr>'
		cartHTML += '<td >'+orderArr[i]["date"]+'</td>'
		// cartHTML += '<td<a href="#">'+cartItems[i]["productName"]+'</a></td>'
		cartHTML += '<td><a class="primary" data-toggle="modal" data-target="#modal_box">View Details</a></td>'
		// cartHTML += '<td class="product_remove"><a href="#"><i class="fa fa-trash-o"></i></a></td>'
		cartHTML += '<td>1</td>'
		cartHTML += '<td class="product_total">'+orderArr[i]["totalPrice"]+'</td>'
		cartHTML += '<td>'+orderArr[i]["status"]+'</td>'
		cartHTML += '</tr>'


	}

	cartHTML += '</tbody>'
	cartHTML += '</table>'

	$("#cart").append(cartHTML)
}





showCart(cartItems)
