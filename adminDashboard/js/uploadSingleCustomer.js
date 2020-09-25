function populateIndustry(){

	var industryDropdown = $("#inputIndustry");
	var onResponse = function(response){
		for(var i=0; i< response.data.industries.data.length; i++){
		const industry = response.data.industries.data[i];
         industryDropdown.append($("<option>").text(industry.name +"   "+((industry.short_code != null)? industry.short_code : "")).val(industry.id));
    	}
	};
	var onError =function(error){
		notifyError("Failed to load industry");
	};
	getIndustryList(onResponse,onError);
}

function uploadCustomer(){
	var short_code = $("#inputShortCode").val();
	var industry_id = $("#inputIndustry").val();
	var first_name = $("#inputFirstName").val();
	var middle_name = $("#inputMiddleName").val();
	var last_name = $("#inputLastName").val();
	var company_name = $("#inputCompanyName").val();
	var deposit_required = $("#inputDepositRequired").val();

	var onResponse = function(response){
		notifySuccess("sucess");
		window.location.href = 'customerMaster.html';
	};
	var onError =function(error){
		
	};

	createCustomer(
		industry_id,
		short_code,
		first_name,
		middle_name,
		last_name,
		company_name,
		deposit_required,
		onResponse,
		onError
		);
}


$(document).ready(function(){

         $('#wizard').smartWizard({
			 onFinish:uploadCustomer,
			 enableFinishButton:true
		 });

	    $('.buttonNext').addClass('btn btn-success');
	    $('.buttonPrevious').addClass('btn btn-primary');
	    $('.buttonFinish').addClass('btn btn-default');
	    $('.buttonFinish').click(function () {
              uploadCustomer();
            });


	    populateIndustry();
	  
    });

