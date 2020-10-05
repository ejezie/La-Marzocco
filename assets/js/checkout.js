var addArr = [{ 
				"user_id" : "A1",
				"add_id" : "A1AD1",
				"add_line_1" : "A1 Aaron Tower",
				"add_line_2" : "Aundh Road",
				"area_code" : "45267",
				"state" : "Maharashtra",
				"country" : "India",
				},
				{ 
				"user_id" : "A1",
				"add_id" : "A1AD2",
				"add_line_1" : "B1 Blooming Dale",
				"add_line_2" : "Balewadi",
				"area_code" : "45267",
				"state" : "Maharashtra",
				"country" : "India",
				},
				{ 
				"user_id" : "A1",
				"add_id" : "A1AD3",
				"add_line_1" : "C1 Citadel",
				"add_line_2" : "Chinchwad",
				"area_code" : "45267",
				"state" : "Maharashtra",
				"country" : "India",
				}]

var orderSummary = [{
						"product" : "Linea Mini",
						"quantity" : "3",
						"price" : "$1600.00"
					},
					{
						"product" : "Vulcano",
						"quantity" : "3",
						"price" : "$400.00"
					},
					{
						"product" : "Modbar",
						"quantity" : "2",
						"price" : "$1000.00"
					},
					{
						"product" : "Strada S",
						"quantity" : "1",
						"price" : "$1000.00"
					}
				]		



async function showAddressSlider(addArr){

	var addSliderHTML = ""

	for(i=0; i<addArr.length;i++){

		const address = addArr[i];

		addSliderHTML += '<div class="optionsecoptions" style="border-style: solid ; width: initial;font-family: trade gothic;font-size: 14px;width: 100%;">'
		addSliderHTML += ''+ address.address+''
			addSliderHTML += '<br>'
		if(address.is_billable != 0){
			addSliderHTML += '<input id="billingAddrCheckbox" type="checkbox" value="'+address.id+'" ><label style="font-size:13px">Billing Address</label>'
		}
			addSliderHTML += '<br>'
		if(address.is_shippable != 0){
			addSliderHTML += '<input id="shippingAddrCheckbox" type="checkbox" value="'+address.id+'"  ><label style="font-size:13px">Shipping Address</label>'
		}
		addSliderHTML += '</div>'
	}

	$("#addressSlider").append(addSliderHTML)
}

$(".select_add").click(function() {

	alert(this.id);
    $("button").each(function() {
           $(this).css("background-color", "#414141"); 
    });
   $(this).css("background-color", "#ae0000"); 
});

function findGetParameter(parameterName) {
		var result = null,
		tmp = [];
		location.search
		.substr(1)
		.split("&")
		.forEach(function (item) {
			tmp = item.split("=");
			if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
		});
		return result;
	}


var quoteId;
$(document).ready(function(){
	quoteId = findGetParameter("quote")
		if(quoteId==null || quoteId == undefined ){
			notifyError("Something went wrong");
			// window.location = "cart.html";
		}else{
			initProductDetails();
		}

	$("#btProceedToPayment").click(function(){
		confirmOrder();
	});
	initAddresses();
});

function initAddresses(){
	getAddressesList(function(response){
			showAddressSlider(safeAccess(["data","addresses","data"],response));
	});
}

function initProductDetails(){
	//need html work
}

function confirmOrder(){
	const orderNotes = $("#inputOrderNotes").val();
	const billingAddressId = getBillingAddressId();
	const shippingAddressId = getShippingAddressId();
	createOrder(quoteId,billingAddressId,shippingAddressId,orderNotes,function(response){
			notifySuccess("Order Successful");
	});
}

function getBillingAddressId(){
	var returnValue=null;
	    // $('#addressSlider #billingAddrCheckbox input:checked').each(function(){
	    $('input:checkbox[id^="billingAddrCheckbox"]:checked').each(function(){
	        returnValue = this.value;
	    });        
	return returnValue;
}

function getShippingAddressId(){
	var returnValue=null;
	    // $('#addressSlider  #shippingAddrCheckbox input:checked').each(function(){
	    $('input:checkbox[id^="shippingAddrCheckbox"]:checked').each(function(){
	    	console.log("xxxx")
	        returnValue = this.value;
	    });        
	return returnValue;
}





async function showCheckoutOrderSummary(orderSummary){

	var orderSummaryHTML = ''



	orderSummaryHTML += '<table>'
	orderSummaryHTML += '<thead>'
	orderSummaryHTML += '<tr>'
	orderSummaryHTML += '<th>Product</th>'
	orderSummaryHTML += '<th>Total</th>'
	orderSummaryHTML += '</tr>'
	orderSummaryHTML += '</thead>'
	orderSummaryHTML += '<tbody>'

	for(i=0;i<orderSummary.length;i++){

		orderSummaryHTML += '<tr>'
		orderSummaryHTML += '<td> '+ orderSummary[i]["product"]+' <strong> × '+ orderSummary[i]["quantity"]+'</strong></td>'
		orderSummaryHTML += '<td> '+ orderSummary[i]["price"]+'</td>'
		orderSummaryHTML += '</tr>'
	}


	orderSummaryHTML += '</tbody>'
	orderSummaryHTML += '<tfoot>'
	orderSummaryHTML += '<tr>'
	orderSummaryHTML += '<th>Cart Subtotal</th>'
	orderSummaryHTML += '<td>$4000.00</td>'
	orderSummaryHTML += '</tr>'
	orderSummaryHTML += '<tr>'
	orderSummaryHTML += '<th>Shipping</th>'
	orderSummaryHTML += '<td><strong>$20.00</strong></td>'
	orderSummaryHTML += '</tr>'
	orderSummaryHTML += '<tr>'
	orderSummaryHTML += '<th>Tax</th>'
	orderSummaryHTML += '<td><strong>$20.00</strong></td>'
	orderSummaryHTML += '</tr>'
	orderSummaryHTML += '<tr class="order_total">'
	orderSummaryHTML += '<th>Order Total</th>'
	orderSummaryHTML += '<td><strong>$4040.00</strong></td>'
	orderSummaryHTML += '</tr>'
	orderSummaryHTML += '</tfoot>'
	orderSummaryHTML += '</table>'


	$("#checkoutOrderSummary").append(orderSummaryHTML)


}


showCheckoutOrderSummary(orderSummary)