var quotationItem = [
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





async function showCart(quotationItem){

	var quotationHTML = ""


	quotationHTML += '<table>'
	quotationHTML += '<thead>'
	quotationHTML += '<tr>'
	quotationHTML += '<th class="product_name">Product</th>'
	quotationHTML += '<th class="product_thumb">Name</th>'
	quotationHTML += '<th class="product-price">Price</th>'
	quotationHTML += '<th class="product_quantity">Quantity</th>'
	// quotationHTML += '<th class="product_remove">Delete</th>'
	quotationHTML += '<th class="product_total">Total</th>'
	quotationHTML += '</tr>'
	quotationHTML += '</thead>'
	quotationHTML += '<tbody>'

	for(i=0;i<quotationItem.length;i++){
		// alert(JSON.stringify(cartItems[i],null,2);
		// console.log(cartItems[i]);
		quotationHTML += '<tr>'
		quotationHTML += '<td class="product_thumb"><a href="#"><img src="assets/img/s-product/product.jpg" alt=""></a></td>'
		quotationHTML += '<td class="product_name"><a href="#">'+quotationItem[i]["productName"]+'</a></td>'
		quotationHTML += '<td class="product-price">'+quotationItem[i]["productPrice"]+'</td>'
		quotationHTML += '<td class="product_quantity"><label>Quantity</label> <input onchange="editQuantity('+quotationItem[i]["productId"]+',this)" min="1" max="100" value="'+quotationItem[i]["productQuantity"]+'" type="number"><a ><i onclick="deleteItem('+quotationItem[i]["productId"]+')" class="fa fa-trash-o" style="width: 30px;font-size:17px"></i></a></td>'
		// quotationHTML += '<td class="product_remove"><a href="#"><i class="fa fa-trash-o"></i></a></td>'
		quotationHTML += '<td class="product_total">'+quotationItem[i]["productPrice"]+'</td>'
		quotationHTML += '</tr>'
	}

	quotationHTML += '</tbody>'
	quotationHTML += '</table>'

	$("#quotation").append(quotationHTML)
}

showCart(quotationItem)



