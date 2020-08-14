function populateGroup(){

	var groupDropdown = $("#input_item_group");
	var onResponse = function(response){
		for(var i=0; i< response.data.groups.length; i++){
		const group = response.data.groups[i];
         groupDropdown.append($("<option>").text(group.name +"   "+ group.desc).val(group.id));
    	}
	};
	var onError =function(error){
		notifyError("Failed to load groups");
	};
	getGroups(onResponse,onError);
    
}
function populateFamily(){

	var familyDropdown = $("#input_item_family");
	var onResponse = function(response){
		for(var i=0; i< response.data.groups.length; i++){
		const group = response.data.groups[i];
         familyDropdown.append($("<option>").text(group.code +"   "+ group.desc).val(group.id));
    	}
	};
	var onError =function(error){
		notifyError("Failed to load families");
	};

	getFamilies(onResponse,onError);

}
function populateType(){

	var typeDropdown = $("#input_item_type");
	var onResponse = function(response){
		for(var i=0; i< response.data.groups.length; i++){
		const group = response.data.groups[i];
         typeDropdown.append($("<option>").text(group.name +"   "+ group.desc).val(group.id));
    	}
	};
	var onError =function(error){
		console.log(error)
		notifyError("Failed to load types");
	};

	getTypes(onResponse,onError);

}

function uploadProduct(){

	var item_group_id = $("#input_item_group").val();
	var item_type_id = $("#input_item_type").val();
	var item_family_id = $("#input_item_family").val();
	var parent_item_id = $("#input_parent_item_id").val();


	var code = $("#input_code").val();
	var name = $("#input_name").val();
	var short_code = $("#input_short_code").val();
	var desc = $("#input_desc").val();
	var super_session_item_id = $("#input_super_session_item_id").val();
	var manage_serial_number = $("#input_manage_serial_no").val();


	var length = $("#input_length").val();
	// var length_uom = $("input_length_uom").val();
	var width = $("#input_width").val();
	// var width_uom = $("input_width_uom").val();
	var height = $("#input_height").val();
	// var height_uom = $("input_height_uom").val();
	var weight = $("#input_weight").val();
	// var weight_uom = $("input_weight_uom").val();
	var volume = $("#input_volume").val();
	// var volume_uom = $("#input_volume_uom").val();
	var is_consumable = $("#input_is_consumable").val();
	var is_recommended = $("#input_is_recommended").val();
	var is_slow_moving = $("#input_is_slow_moving").val();
	var is_active = $("#input_is_active").val();
	var onResponse = function(response){
		notifySuccess("sucess");
	};
	var onError =function(error){
		notifyError(error.response.data.message);
	};
	createItem(
		code,
		name,
		short_code,
		desc,
		parent_item_id,
		super_session_item_id,
		manage_serial_number,
		item_group_id,
		item_type_id,
		item_family_id,
		length,
		"cm",
		width,
		"cm",
		height,
		"cm",
		weight,
		"grams",
		volume,
		"ml",
		is_consumable,
		is_recommended,
		is_slow_moving,
		is_active,
		onResponse,
		onError
		);
}


$(document).ready(function(){

        // $("#forgotPassword").click(async function(){
        //     var result = confirm( "Send new password to registered email?" );
        //     if ( result ) {
        //         await forgotPassword($("#email").val());
        //     }
        // });
        // $("#login").click(async function(){
        //     var email = $("#email").val();
        //     var password = $("#password").val();
            
        //         login(email,password,function(response){
        //             notifySuccess('Login Success');
        //             updateAccessToken(response.data.access_token);

        //             //redirect
        //         },
        //         function(error){
        //            notifyError('Login error');
        //         })

        // });

         $('#createItemWizard').smartWizard({
			 onFinish:uploadProduct,
			 enableFinishButton:true,
		 });

	    $('.buttonNext').addClass('btn btn-success');
	    $('.buttonPrevious').addClass('btn btn-primary');
	    $('.buttonFinish').addClass('btn btn-default');

 		// $('#createItemWizard').smartWizard("loader", "show");
	    populateGroup();
	    populateFamily();
	    populateType();

	    // $('#createItemWizard').smartWizard("loader", "hide");

    });

