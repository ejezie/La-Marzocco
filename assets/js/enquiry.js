

$(document).ready(function(){
	// getUserProfile(function(res){
	// 		if(res.status == 200){
	// 			 $("#firstName").val(safeAccess(["data","user","first_name"],res,"")); 
	// 			 $("#lastName").val(safeAccess(["data","user","last_name"],res,"")); 
	// 			 $("#email").val(safeAccess(["data","user","email"],res,"")); 
	// 		}
	// })


	getAddressesList(function(response){
			showAddressesList(safeAccess(["data","addresses","data"],response));
	});


})




async function showAddressesList(addressList){


	// Traing Enquiry Address
	var trainingEnqAdd = await  $("#trainingEnqAdd").val();
    $('#trainingEnqAdd').empty().append('<option>Select Address</option>');
    // Add drop down list dynamically
  	var x = document.getElementById("trainingEnqAdd");
    x.add(new Option("Add new address"));
    for (var j = 0; j < addressList.length; j++) {

      // var option = document.createElement("option");
      if(addressList[j]["is_shippable"] == 1){

	      name = addressList[j]["address"];
	      id = addressList[j]["id"]
	      x.add(new Option(name , id));
      }
    }


    // After Sales  Enquiry Address
	var aftersalesEnqAdd = await  $("#aftersalesEnqAdd").val();
    $('#aftersalesEnqAdd').empty().append('<option>Select Address</option>');
    // Add drop down list dynamically
    var x = document.getElementById("aftersalesEnqAdd");
    x.add(new Option("Add new address"));
    for (var j = 0; j < addressList.length; j++) {

      // var option = document.createElement("option");
      if(addressList[j]["is_shippable"] == 1){

	      name = addressList[j]["address"];
	      id = addressList[j]["id"]
	      x.add(new Option(name , id));
      }
    }
}



async function addNewAddress(){
	selectedTrainingOption = $("#trainingEnqAdd").val();
  selectedAftersalesOption = $("#aftersalesEnqAdd").val();
	if(selectedTrainingOption == "Add new address"){
		$('#createAddressModal').modal('show'); 
		// alert(selectedOption)
		initAddAddress()
	}else if(selectedAftersalesOption == "Add new address"){
    $('#createAddressModal').modal('show'); 
    // alert(selectedOption)
    initAddAddress()
  }
}



$( "#submitTrainingEnquiry" ).click(function() {

	var request_type = 1

  	var selectedTraingAdd = $("#trainingEnqAdd").val();
  	if(selectedTraingAdd > 0){

  		var trainingEnquiryDetail = $("#trainingEnquiryDetails").val();

  		console.log("trainingEnquiryDetails : ", trainingEnquiryDetail)
	    if(trainingEnquiryDetail.trim() != ''){
	    	sendTrainingAftersalesEnquiry(request_type,trainingEnquiryDetail,selectedTraingAdd,function(res){

               	if(res.data.status == true){
                	notifySuccess("Enquiry Sent")
                	$('#trainingEnquiryDetails').val('');
               }else{
                	notifyError("Something went wrong")
               }
            })
    	}else{
			notifyError("Input an enquiry message");
    	}
	}else{
		notifyError("No Address Selected");
	}
});


$( "#submitAftersalesEnquiry" ).click(function() {

	var request_type = 2

  	var selectedTraingAdd = $("#aftersalesEnqAdd").val();
  	if(selectedTraingAdd > 0){

  		var aftersalesEnquiryDetail = $("#aftersalesEnquiryDetails").val();

	    if(aftersalesEnquiryDetail.trim() != ''){
	    	sendTrainingAftersalesEnquiry(request_type,aftersalesEnquiryDetail,selectedTraingAdd,function(res){

               	if(res.data.status == true){
                	notifySuccess("Enquiry Sent")
                	$('#aftersalesEnquiryDetails').val('');
               }else{
                	notifyError("Something went wrong")
               }
            })
    	}else{
			notifyError("Input an enquiry message");
    	}
	}else{
		notifyError("No Address Selected");
	}
});



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