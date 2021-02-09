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

	var billing_add_count = 0
	if($('#deliveryOption').val()==2){
		var addSliderHTML = ""
		$("#addressSlider").empty(addSliderHTML)
		for(i=0; i<addArr.length;i++){

			const address = addArr[i];

				addSliderHTML += '<div class="optionsecoptions" style="border:1px solid #ccc; ; width: initial;;font-size: 14px;width: 100%;">'
				addSliderHTML += ''+ address.address+''
					addSliderHTML += '<br>'
				if(address.is_billable != 0 && billing_add_count==0){
					addSliderHTML += '<input id="billingAddrCheckbox" type="checkbox" checked="checked" class="billingChk" value="'+address.id+'" ><label style="font-size:13px">Billing Address</label>'
					billing_add_count += 1
				}else if(address.is_billable != 0 && billing_add_count > 0){
					addSliderHTML += '<input id="billingAddrCheckbox" type="checkbox" class="billingChk" value="'+address.id+'" ><label style="font-size:13px">Billing Address</label>'
				}
				addSliderHTML += '<br>'
				if(address.is_shippable != 0){
					addSliderHTML += '<input id="shippingAddrCheckbox" type="checkbox" class="shippingChk" value="'+address.id+'"  ><label style="font-size:13px">Shipping Address</label>'
				}
				addSliderHTML += '</div>'

		}
		$("#addressSlider").append(addSliderHTML)
		$("#toggleModalAddAddress").show()
	}else if($('#deliveryOption').val()==3){
		var onResponse = function(response){
			var addSliderHTML = ""
			$("#addressSlider").empty(addSliderHTML)
		    // location.reload(true);
		    // window.location.href = 'productMaster.html';
		    console.log("Pickup addr : ",response)
		    var pickupAddrList = response.data.addresses



			for(j=0; j<pickupAddrList.length;j++){

				// const address = addArr[i];
				console.log(">>>>>>>>>>>>>>>>>>>>>>")
				if(pickupAddrList[j]["id"]==3){

					addSliderHTML += '<div class="optionsecoptions" style="border:1px solid #ccc; ; width: initial;;font-size: 14px;width: 100%;">'
					addSliderHTML += ''+ pickupAddrList[j]["address"]+', '+pickupAddrList[j]["area_code"]["sa4_name"]+', '+pickupAddrList[j]["state"]["name"]+''
						addSliderHTML += '<br>'
					// if(address.is_billable != 0){
						addSliderHTML += '<input id="shippingAddrCheckbox" type="checkbox" checked="checked" class="billingChk" value="'+pickupAddrList[j]["id"]+'" ><label style="font-size:13px">Pickup Address</label>'
						// break;
					// }
					
					addSliderHTML += '</div>'
				}

			};
			for(i=0; i<addArr.length;i++){

				const address = addArr[i];
				console.log(">>>>>>>>>>>>>>>>>>>>>>")


				if(address.is_billable != 0 && billing_add_count==0){
					addSliderHTML += '<div class="optionsecoptions" style="border:1px solid #ccc; ; width: initial;;font-size: 14px;width: 100%;">'
					addSliderHTML += ''+ address.address+''
					addSliderHTML += '<br>'
					addSliderHTML += '<input id="billingAddrCheckbox" type="checkbox" checked="checked" class="billingChk" value="'+address.id+'" ><label style="font-size:13px">Billing Address</label>'
					// break;
					billing_add_count += 1
					addSliderHTML += '</div>'
					addSliderHTML += '<br>'
				}
				

			};
			$("#addressSlider").append(addSliderHTML)
			$("#toggleModalAddAddress").hide()

		}
		getPickupAddressesList(onResponse)
	}




	$(".billingChk").change(function()
      	{
          	$(".billingChk").prop('checked',false);
          	$(this).prop('checked',true);
      	}
    );


    $(".shippingChk").change(function()
      	{
          	$(".shippingChk").prop('checked',false);
          	$(this).prop('checked',true);
      	}
    );
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

		if($('#agreeTerms').is(':checked') && $("#inputPoName").val().length>0) {
			$("#btConfirmOrder").prop('disabled', true);
			confirmOrder();
		} else if(!($('#agreeTerms').is(':checked'))){

			notifyInfo("Agree Terms and Condition");
		} else if($("#inputPoName").val().length==0){
			notifyError("Please enter valid PO Number")
			// $("#btConfirmOrder").prop('disabled', false);
		}
		// }

		// if($("#inputPoName").val().length=0){
		// 	$("#btConfirmOrder").prop('disabled', false);
		// }
	});

	
	initAddresses();
	initAddAddress();


	if($('#deliveryOption').val()==2){
		// alert("Del")
	}

	$('#deliveryOption').change( function() {
		  // if($('#deliveryType').val()!=3){
		  // 	$('#deliveryDate').hide();
		  // }else{}
		initAddresses();
		initAddAddress();

		getQuoteDetails(quoteId,function(response){
			showCheckoutOrderSummary(response.data.quote.quote_line,response.data.quote );
		})
	})
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
	  // var city_id = $("#inputCity").val();
	  var state_id = $("#inputState").val();
	  var country_id = $("#inputCountry").val();
	  var address_type = $("input[name='radioName']:checked").val();

	  if(!address_type){
	      notifyError("Select Address Type")
	      return false
	   }

	  var onResponse = function(response){
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
	    // city_id,
	    state_id,
	    country_id,
	    address_type,
	    onResponse);
  });
  populateCountry();
}

function initProductDetails(){
	//need html work
	getQuoteDetails(quoteId,function(response){
		showCheckoutOrderSummary(response.data.quote.quote_line,response.data.quote );
		$('#deliveryType').change( function() {
		  if($('#deliveryType').val()!=3){
		  	$('#deliveryDate').hide();
		  }else{
		 //  	var dtToday = new Date();
			// var month = dtToday.getMonth() + 1;     // getMonth() is zero-based
			// var day = dtToday.getDate();
			// var year = dtToday.getFullYear();
			// if(month < 10)
			//    month = '0' + month.toString();
			// if(day < 10)
			//    day = '0' + day.toString();

			// var maxDate = year + '-' + month + '-' + day;
			var someDate = new Date();

				var sparePartOnly = true;

				for(quoteItem of response.data.quote.quote_line){
						if(quoteItem.type_id!=1){
							sparePartOnly = false;
							break;
						}
				}

				var numberOfDaysToAdd = sparePartOnly?2:8;
				//spare art only > 1 day
				//if machine included > 7 days
				//Machine + kit > 21 days
				someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
				var dd = someDate.getDate();
				var mm = someDate.getMonth() + 1;
				var y = someDate.getFullYear();

				var someFormattedDate = y + '-'+ mm + '-'+dd; 
			$('#deliveryDateInput').attr('min', someFormattedDate);
		  	$('#deliveryDate').show();
		  }
	  });
	});
}

function confirmOrder(){
	const orderNotes = $("#inputOrderNotes").val().length>0 ? $("#inputOrderNotes").val() : null;
	const poNumber = $("#inputPoName").val().length>0 ? $("#inputPoName").val() : null;
	const po = document.querySelector('#pofile').files[0];
	if(!poNumber){
		notifyError("Please enter valid PO Number")
		return;
	}
	const billingAddressId = getBillingAddressId();
	const shippingAddressId = getShippingAddressId();
	const sched_delivery_date = ($('#deliveryType').val()==3)? $("#deliveryDateInput").val() : null;

	if(!billingAddressId || !shippingAddressId){
		notifyError("Please select shipping and billing address")
		return;
	}

	if($('#deliveryOption').val()==2){
		var is_pickup = 0
	}else if ($('#deliveryOption').val()==3){
		var is_pickup = 1
	}
	notifyInfo("Please wait");

	createOrder(quoteId,po,poNumber,shippingAddressId,billingAddressId,orderNotes,sched_delivery_date,is_pickup,function(response){
			// notifySuccess("Proceed to payment");
			if(!response.data.status){
				return;
			}
			if(response.data.data.payment){ 
				$("#btConfirmOrder").hide();
				$("#payment_method").show();
				const partialPayment = safeAccess(["data","data","payment","partial"],response,0);
						const fullPayment = safeAccess(["data","data","payment","full"],response,0);
						const paymentTypeDropdown =  $("#inputPaymentType");
						paymentTypeDropdown.html("");
				        paymentTypeDropdown.append($("<option>").text("Full Payment $"+fullPayment).val(fullPayment));
				        if(partialPayment!=fullPayment){
				        	paymentTypeDropdown.append($("<option>").text("Partial Payment $"+partialPayment).val(partialPayment));
						}
						$("#inputPaymentMode").change(function(){
					if($("#inputPaymentMode").val()==2){
						$("#creditCardPayment").css("display", "unset");
					}else{
						$("#creditCardPayment").css("display", "none");
					}
				});
				$("#btProceedToPayment").click(function(){
					$("#btProceedToPayment").prop('disabled', true);
					if($("#inputPaymentMode").val()==2){
							confirmPayment(response);
						}else{
							notifyOrderSuccess(safeAccess(["data","data","order"],response,null));
						}
						});
				
			}else{
				var orderId =  safeAccess(["data","data","order","payment","order_id"],response,null);
				if(!orderId){
					orderId = safeAccess(["data","data","order",0,"id"],response,-1);
				}
				notifyOrderSuccess(safeAccess(["data","data","order"],response,null));
			}
			
	});
}



function notifyOrderSuccess(orders){

		// 	notifySuccess("Payment Successful");
		//	shoppingCart.clearCart();
		// 	if(orderId){
		// 	alert("Order #"+orderId+" is placed successfully");
		// }else{
		// 	alert("Order  is placed successfully");
		// }
		// 	window.location.href = "index.html";

		var confirmedOrders = [];

		for(o of orders){
			confirmedOrders.push(
					{
						sapid : o.sap_order_id ,
						itemCount : o.order_line.length ,
						subTotal : o.sub_total,
						shipping : o.shipping_cost,
						tax : o.total_tax,
						total : o.total
					}
				);
		}
		var onResponse = function(response){
		    
				// alert(JSON.stringify(confirmedOrders));
			localStorage.setItem("confirmedOrders",JSON.stringify(confirmedOrders));
			window.location.href = "orderConfirmation.html";
		};
		clearCart(onResponse)
}

function confirmPayment(response,isEFT){
	var orderId =  safeAccess(["data","data","order","payment","order_id"],response,null);
	if(!orderId){
		orderId = safeAccess(["data","data","order",0,"id"],response,-1);
	}
	notifyInfo("Please wait");
	if(isEFT){
		createPayment(orderId,true,function(response2){
				notifyOrderSuccess(safeAccess(["data","data","order"],response,null));
		});
		return;
	}
	const amount = $("#inputPaymentType").val();
	// const amount = response.data.order[0].total;
	const inputCardName = $("#inputCardName").val();
	const inputCardNumber = $("#inputCardNumber").val();
	const inputExpireyMonth = $("#inputExpireyMonth").val();
	const inputExpireyYear = $("#inputExpireyYear").val();
	const inputCvc = $("#inputCvc").val();

	createPayment(orderId,false,function(response2){
				notifyOrderSuccess(safeAccess(["data","data","order"],response,null));
	},null,amount,inputCardName, inputCardNumber,inputExpireyMonth,inputExpireyYear,inputCvc);
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
	$("#checkoutOrderSummary").empty(orderSummaryHTML)

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
	orderSummaryHTML += '</tbody>'
	orderSummaryHTML += '<tfoot>'
	orderSummaryHTML += '<tr>'
	orderSummaryHTML += '<th>Cart Subtotal</th>'
	orderSummaryHTML += '<td>$'+orderDetails["sub_total"].toLocaleString("en-AU")+'</td>'
	orderSummaryHTML += '</tr>'
	orderSummaryHTML += '<tr>'
	orderSummaryHTML += '<th>Shipping (+)</th>'
	if($('#deliveryOption').val()==2){
		orderSummaryHTML += '<td><strong>$'+orderDetails["shipping_cost"].toLocaleString("en-AU")+'</strong></td>'
	} else if($('#deliveryOption').val()==3){
		orderSummaryHTML += '<td><strong>$0</strong></td>'
	}
	orderSummaryHTML += '</tr>'
	orderSummaryHTML += '<tr>'
	orderSummaryHTML += '<th>Tax (+)</th>'
	orderSummaryHTML += '<td><strong>$'+orderDetails["total_tax"].toLocaleString("en-AU")+'</strong></td>'
	orderSummaryHTML += '</tr>'
	orderSummaryHTML += '<tr class="order_total">'
	orderSummaryHTML += '<th>Order Total</th>'
	if($('#deliveryOption').val()==2){

		orderSummaryHTML += '<td><strong>$'+orderDetails["total"].toLocaleString("en-AU")+'</strong></td>'
	} else if($('#deliveryOption').val()==3){
		orderSummaryHTML += '<td><strong>$'+(orderDetails["total"]-orderDetails["shipping_cost"]).toLocaleString("en-AU")+'</strong></td>'

	}
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
	  $("#inputCountry")
	    .append('<option disabled selected value>Select Country</option>');
      $("#inputState")
	    .append('<option disabled selected value>Select State</option>');
	   // $("#inputCity")
	   //  .append('<option disabled selected value>Select City</option>');
	  $("#inputArea")
	    .append('<option disabled selected value>Select Area</option>');


  };
  getCountries(onResponse);
  $("#searchAreas").click(function(){
  	var querytext= $('#inputZipCode').val();
	if( querytext && querytext.length>=3){
  		  notifyInfo("Getting areas")
		  populateAreas(querytext);
		}
  });
  // $('#inputZipCode').on("change ", function() {
  	
}

function populateState(keyId){

  var dropdown = $("#inputState");
  dropdown.html("");
  var onResponse = function(response){
    for(var i=0; i< response.data.states.length; i++){
    const item = response.data.states[i];
         dropdown.append($("<option>").text(item.name).val(item.id));
      }

      $("#inputState")
	    .append('<option disabled selected value>Select State</option>');

   //    $('#inputState').change( function() {
		 //  populateCities(keyId);
	  // });
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

      $("#inputCity")
	    .append('<option disabled selected value>Select City</option>');
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

      $("#inputArea").append('<option disabled selected value>Select Area</option>');
  };
  getAreas(postcode,onResponse);
}




$('#createAddressModal').on('hidden.bs.modal', async function (){
	document.getElementById('inputName').value=''
	document.getElementById('inputAddress').value=''
	document.getElementById('inputAddress2').value=''
	document.getElementById('inputPhone').value=''
	document.getElementById('inputArea').value=''
	$('input[name="radioName"]').attr('checked', false);
})



// async function viewTermsCond(){
// 	$("#test").modal('show');
// }