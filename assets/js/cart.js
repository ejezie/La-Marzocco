
async function showCart(cartItems){

	var cartHTML = ""


	cartHTML += '<table>'
	cartHTML += '<thead>'
	cartHTML += '<tr>'
	cartHTML += '<th class="product_name">Product</th>'
	cartHTML += '<th class="product_thumb">Name</th>'
	cartHTML += '<th class="product_thumb">Specs</th>'
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
		cartHTML += '<td >'


		console.log("cartItems >>>>>>>>> : ", cartItems)
		if(cartItems[i]["documentUrl"]){
			var url = cartItems[i]["documentUrl"]+"";
			cartHTML += '<input type="button" class="btn btn-success" style="color:white; background:#414141" value="Download"  onClick="downloadFile(`'+url+'`)"  >'
			cartHTML += '<input type="file" class="btn upload-spec"  id="excelfile"/>'
			cartHTML += '<input type="button" class="btn upload-spec" value="Update">'
		}else{
			// cartHTML += '<div style="white-space:nowrap">'
			cartHTML += '<input type="file" id="fileUpload'+cartItems[i]["productId"]+'" class="btn upload-file"  id="excelfile"/>'
			cartHTML += '<input type="button" class="btn upload-spec" style="color:white" value="Upload Spec" id="'+cartItems[i]["productId"]+'" onclick="uploadExcel('+cartItems[i]["productId"]+","+cartItems[i]["productQuantity"]+')">'
			// cartHTML += '</div>'
		}
		cartHTML += '</td>'
		cartHTML += '<td class="product-price">'+cartItems[i]["productPrice"]+'</td>'
		cartHTML += '<td class="product_quantity"><label>Quantity</label> <input onchange="editQuantity('+cartItems[i]["productId"]+',this)" min="1" max="100" value="'+cartItems[i]["productQuantity"]+'" type="number"><a ><i onclick="deleteItem('+cartItems[i]["productId"]+')" class="fa fa-trash-o" style="width: 30px;font-size:17px"></i></a></td>'
		// cartHTML += '<td class="product_remove"><a href="#"><i class="fa fa-trash-o"></i></a></td>'
		cartHTML += '<td class="product_total">'+cartItems[i]["productPrice"]+'</td>'
		cartHTML += '</tr>'
	}

	cartHTML += '</tbody>'
	cartHTML += '</table>'

	$("#cart").html("");

	$("#cart").append(cartHTML)
}


function downloadFile(uri){
	// var link=document.createElement('a');
	// document.body.appendChild(link);
	// link.href=url ;
	// link.click();
	var link = document.createElement("a");
    link.setAttribute('download', name);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
}

async function showCartFromQuote(quoteItems){

	if(!quoteItems){
		notifyError("Failed to get quote");
		return;
	}
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

	for(i=0;i<quoteItems.length;i++){

		var quoteItemProduct = quoteItems[i].item;
		var quoteItem = quoteItems[i];
 
		cartHTML += '<tr>'
		cartHTML += '<td class="product_thumb"><a href="#"><img src="assets/img/s-product/product.jpg" alt=""></a></td>'
		cartHTML += '<td class="product_name"><a href="#">'+quoteItemProduct["name"]+'</a></td>'
		cartHTML += '<td class="product-price">'+quoteItem["price"]+'</td>'
		cartHTML += '<td class="product_quantity"><a>'+quoteItem["qty"]+'</a></td>'
		// cartHTML += '<td class="product_remove"><a href="#"><i class="fa fa-trash-o"></i></a></td>'
		cartHTML += '<td class="product_total">'+quoteItem["total"]+'</td>'
		cartHTML += '</tr>'
	}

	cartHTML += '</tbody>'
	cartHTML += '</table>'

		$("#cart").html("");

	$("#cart").append(cartHTML)
}


function deleteItem(itemid){
	if(confirm("Remove this item from cart?")){
		shoppingCart.modify(itemid,0,function(){
			reloadMiniCart();
			refreshCart();
		});
	}

}

function editQuantity(itemid,e){
	shoppingCart.modify(itemid,e.value,function(){
		reloadMiniCart();
		notifyInfo("Updated");
	});
}

async function showSubTotal(cartSubTotal,quoteId){

	var subTotalHTML = '';
	var checkoutLink = "checkout.html?quote="+quoteId;
	subTotalHTML += '<div class="col-lg-6 col-md-6">'
	subTotalHTML += '<div class="coupon_code left">'
	subTotalHTML += '<h3>Purchase Orders</h3>'
	subTotalHTML += '<div class="coupon_inner">'
	// subTotalHTML += '<input placeholder="Upload" type="text">'
	// subTotalHTML += '<button type="submit">Upload Purchase orders</button>'
	subTotalHTML += '<div style="white-space:nowrap">'
	subTotalHTML += '<input type="file" class="btn upload-po" style="background:#ccc; color:#333" id="po_excelfile"/>'
	subTotalHTML += '<input type="button" class="btn upload-po"  value="Upload PO">'
	subTotalHTML += '</div>'
	subTotalHTML += '</div>'
	subTotalHTML += ''
	subTotalHTML += '</div>'
	subTotalHTML += '</div>'

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
	// 	subTotalHTML += '<div>'

	// subTotalHTML += '<input type="file" class="btn btn-info" accept=".xls, .xlsx" id="excelfile"/>'
	// 	subTotalHTML += '</div>'

	subTotalHTML += '<a style="color:white" id="btCheckout" >Proceed to Checkout</a>'
	subTotalHTML += '</div>'
	subTotalHTML += '</div>'
	subTotalHTML += '</div>'
	subTotalHTML += '</div>'


    $("#subTotal").html("");
    $("#subTotal").append(subTotalHTML);
    $("#btCheckout").click(function(){
    	window.location.href = checkoutLink;
    });



}

var quoteId;
$(document).ready(function(){
		refreshCart();
		$("#showQuote").click(function(){
			notifyInfo("Requesting quote")
			getQuote(null,null,function(response){
					showCartFromQuote(safeAccess(["data","quote","quote_line"],response));
					$("#showQuote").hide();
					var cartSubTotals = {
										"subTotal" : "$"+ safeAccess(["data","quote","sub_total"],response),
										"total" :  "$"+ safeAccess(["data","quote","total"],response),
										"shipping" : "$"+safeAccess(["data","quote","shipping_cost"],response)
									}
					showSubTotal(cartSubTotals,safeAccess(["data","quote","id"],response));
			});
		});
	});

function refreshCart(){
		$("#cart").html("");

	var onResponse = function(response){
				// var cart = shoppingCart.listCart();
				console.log(JSON.stringify(response.data,null,2));
				var cart = safeAccess(['data','carts','data'],response);
				var cartItems = [];
					for(cartItem of cart){
						var element = {
										"productId" : cartItem.id,
										"productName" : cartItem.item.name,
										"productQuantity" : cartItem.qty,
										"documentUrl" : safeAccess(["document","document"],cartItem),
										"productPrice" : safeAccess(["price"],cartItem,"-")
									}

						cartItems.push(element);
					}
					showCart(cartItems);
					// var cartSubTotals = {
					// 					"subTotal" : "$"+ shoppingCart.totalCart(),
					// 					"total" :  "$"+shoppingCart.totalCart()+20,
					// 					"shipping" : "$20"
					// 				}
					// showSubTotal(cartSubTotals);
			}
			cartList(onResponse);

	var cart = shoppingCart.listCart();

}




async function uploadExcel(id,qty){
	const element = "#fileUpload"+id;
	var file = $(element).prop('files')[0];
	updateCartItemSpec(id,qty,file,function(){
		notifySuccess("Done");
		refreshCart();
	})
}
