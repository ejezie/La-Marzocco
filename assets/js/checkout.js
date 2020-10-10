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

		addSliderHTML += '<div class="optionsecoptions" style="border:1px solid #ccc; ; width: initial;;font-size: 14px;width: 100%;">'
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
	$("payment_method").hide();
	quoteId = findGetParameter("quote")
		if(quoteId==null || quoteId == undefined ){
			notifyError("Something went wrong");
			// window.location = "cart.html";
		}else{
			initProductDetails();
		}

	$("#btConfirmOrder").click(function(){
		confirmOrder();
	});
	initAddresses();
	initAddAddress();
});

function initAddresses(){
	getAddressesList(function(response){
			showAddressSlider(safeAccess(["data","addresses","data"],response));
	});
}

function initAddAddress(){
	
  $("#submitAddAddress").click(function(){
  	  var type = $("#addressType").val();
  	  var name = $("#inputName").val();
	  var zip_code= $("#inputZipCode").val();
	  var address = $("#inputAddress").val() + $("#inputAddress2").val();
	  var landmark = $("#inputLandmark").val();
	  var phone = $("#inputPhone").val();
	  var area_code_id = $("#inputArea").val();
	  var city_id = $("#inputCity").val();
	  var state_id = $("#inputState").val();
	  var country_id = $("#inputCountry").val();

	  var onResponse = function(response){
	    notifySuccess("Updated");
	    location.reload(true);
	    // window.location.href = 'productMaster.html';
	  };
	  createAddress(
	  	type,
	    name,
	    zip_code,
	    address,
	    landmark,
	    phone,
	    area_code_id,
	    city_id,
	    state_id,
	    country_id,
	    onResponse);
  });
  populateCountry();
}

function initProductDetails(){
	//need html work
	getQuoteDetails(quoteId,function(response){
		showCheckoutOrderSummary(response.data.quote.quote_line,response.data.quote );
	});
}

function confirmOrder(){
	const orderNotes = $("#inputOrderNotes").val();
	const po = document.querySelector('#pofile').files[0];
	const billingAddressId = getBillingAddressId();
	const shippingAddressId = getShippingAddressId();
	if(!billingAddressId || !shippingAddressId){
		notifyError("Please select shipping and billing address")
		return;
	}
	notifyInfo("Please wait");

	createOrder(quoteId,po,shippingAddressId,billingAddressId,orderNotes,function(response){
			// notifySuccess("Proceed to payment");
			if(!response.data.payment){ //tofixkey
				$("#btConfirmOrder").hide();
				$("#payment_method").css("display", "unset");

				const partialPayment = safeAccess(["data","order","payment","partial"],response,0);
				const fullPayment = safeAccess(["data","order","payment","full"],response,0);
				const paymentTypeDropdown =  $("#inputPaymentType");
				paymentTypeDropdown.html("");
		         paymentTypeDropdown.append($("<option>").text("Partial Payment $"+partialPayment).val(partialPayment));
		         paymentTypeDropdown.append($("<option>").text("Full Payment $"+fullPayment).val(fullPayment));
				$("#btProceedToPayment").click(function(){
				confirmPayment(response);
			});
			}else{
				notifyOrderSuccess();
			}
			
	});
}



function notifyOrderSuccess(orderId){
			notifySuccess("Payment Successful");
			shoppingCart.clearCart();
			if(orderId){
			alert("Order #"+orderId+" is placed successfully");
		}else{
			alert("Order  is placed successfully");
		}
			window.location.href = "index.html";
}

function confirmPayment(response){

	const amount = $("#inputPaymentType").val();
	const orderId = response.data.order[0].id;
	// const amount = response.data.order[0].total;
	const inputCardNumber = $("#inputCardNumber").val();
	const inputExpireyMonth = $("#inputExpireyMonth").val();
	const inputExpireyYear = $("#inputExpireyYear").val();
	const inputCvc = $("#inputCvc").val();

	notifyInfo("Please wait");
	createPayment(orderId,amount,inputCardNumber,inputExpireyMonth,inputExpireyYear,inputCvc,function(response){
			notifyOrderSuccess(orderId);
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





async function showCheckoutOrderSummary(orderSummary, orderDetails){

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
		orderSummaryHTML += '<td> '+ orderSummary[i]["item"]["name"]+' <strong> × '+ orderSummary[i]["qty"]+'</strong></td>'
		orderSummaryHTML += '<td> $'+ orderSummary[i]["total"].toLocaleString("en-AU")+'</td>'
		orderSummaryHTML += '</tr>'
	}
	console.log("orderDetails -------", orderDetails)
	orderSummaryHTML += '</tbody>'
	orderSummaryHTML += '<tfoot>'
	orderSummaryHTML += '<tr>'
	orderSummaryHTML += '<th>Cart Subtotal</th>'
	orderSummaryHTML += '<td>$'+orderDetails["sub_total"].toLocaleString("en-AU")+'</td>'
	orderSummaryHTML += '</tr>'
	orderSummaryHTML += '<tr>'
	orderSummaryHTML += '<th>Shipping</th>'
	orderSummaryHTML += '<td><strong>$'+orderDetails["shipping_cost"].toLocaleString("en-AU")+'</strong></td>'
	orderSummaryHTML += '</tr>'
	orderSummaryHTML += '<tr>'
	orderSummaryHTML += '<th>Tax</th>'
	orderSummaryHTML += '<td><strong>$'+orderDetails["total_tax"].toLocaleString("en-AU")+'</strong></td>'
	orderSummaryHTML += '</tr>'
	orderSummaryHTML += '<tr class="order_total">'
	orderSummaryHTML += '<th>Order Total</th>'
	orderSummaryHTML += '<td><strong>$'+orderDetails["total"].toLocaleString("en-AU")+'</strong></td>'
	orderSummaryHTML += '</tr>'
	orderSummaryHTML += '</tfoot>'
	orderSummaryHTML += '</table>'


	$("#checkoutOrderSummary").append(orderSummaryHTML)


}



function populateCountry(){

  var dropdown = $("#inputCountry");

  var onResponse = function(response){
    for(var i=0; i< response.data.countries.length; i++){
    	const item = response.data.countries[i];
         dropdown.append($("<option>").text(item.name).val(item.id));
      }

      $('#inputCountry').change( function() {
		  populateState(this.value);
	  });
	   dropdown.prop("selectedIndex", -1);


  };
  getCountries(onResponse);
  $('#inputZipCode').on("change paste keyup", function() {
		  populateAreas($(this).val());
   });
}

function populateState(keyId){

  var dropdown = $("#inputState");
  dropdown.html("");
  var onResponse = function(response){
    for(var i=0; i< response.data.states.length; i++){
    const item = response.data.states[i];
         dropdown.append($("<option>").text(item.name).val(item.id));
      }

      $('#inputState').change( function() {
		  populateCities(keyId);
	  });
  };
  getStates(keyId,onResponse);
}

function populateCities(keyId){

  var dropdown = $("#inputCity");
  dropdown.html("");
  var onResponse = function(response){
    for(var i=0; i< response.data.cities.length; i++){
    const item = response.data.cities[i];
         dropdown.append($("<option>").text(item.name).val(item.id));
      }
  };
  getCities(keyId,onResponse);
}


function populateAreas(postcode){

  var dropdown = $("#inputArea");
  dropdown.html("");
  var onResponse = function(response){
    for(var i=0; i< response.data.area_codes.data.length; i++){
    const item = response.data.area_codes.data[i];
         dropdown.append($("<option>").text(item.name).val(item.id));
      }
  };
  getAreas(postcode,onResponse);
}

